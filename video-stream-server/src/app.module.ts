import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { secret } from './utils/constants';
import { join } from 'path/posix';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from './app.middleware';
import { VideoController } from './video/video.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { VideoService } from './video/video.service';
import { User, UserSchema } from './user/schemas/user.schema';
import { Video, VideoSchema } from './video/schemas/video.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/VideoStreamDB'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),

    // configure Multer to permit the uploading and streaming of videos.
    MulterModule.register({
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) =>{
          const ext = file.mimetype.split('/')[1];
          cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
        }
      })
    }),
    UserModule,
    VideoModule,
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h'},
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    })
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, VideoService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(isAuthenticated)
    .exclude({
      path: '/video//:id',
      method: RequestMethod.GET
    }).
    forRoutes(VideoController)
  }
}

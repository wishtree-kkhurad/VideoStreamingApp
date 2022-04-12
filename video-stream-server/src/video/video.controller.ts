import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
  Put,
  Req,
  Res,
  Query
} from '@nestjs/common';
import { Video } from './schemas/video.schema';
import { VideoService } from './video.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  async createVideo(
    @Res() response,
    @Req() request,
    @Body() video: Video,
    @UploadedFiles()
    files: { video?: Express.Multer.File[]; cover?: Express.Multer.File[] },
  ) {
    const requestBody = {
      createdBy: request.user,
      title: video.title,
      video: files.video[0].filename,
      coverImage: files.cover[0].filename,
    };
    const newVideo = await this.videoService.createVideo(requestBody);
    return response.status(HttpStatus.CREATED).json({
      newVideo,
    });
  }

  @Get()
  async readVideo(@Query() id): Promise<Object> {
    return await this.videoService.readVideo(id);
  }

  @Get('/:id')
  async streamVideo(@Param('id') id, @Res() response, @Req() request) {
    return this.videoService.streamVideo(id, response, request);
  }

  @Put('/:id')
  async updateVideo(@Res() response, @Param('id') id, @Body() video: Video) {
    const updatedVideo = await this.videoService.updateVideo(id, video);
    return response.status(HttpStatus.OK).json(updatedVideo);
  }

  @Delete(':/id')
  async deleteVideo(@Res() response, @Param('id') id) {
    await this.videoService.deleteVideo(id);
    return response.status(HttpStatus.OK).json({
      user: null,
    });
  }
}

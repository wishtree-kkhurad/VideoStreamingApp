import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';

//createReadStream to read files in our file system, and statSync to get the file’s details
import { createReadStream, statSync } from 'fs';

import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
  ) {}

  async createVideo(video: Object): Promise<Video>{
      const newVideo = new this.videoModel(video);
      return newVideo.save();
  }

  async readVideo(id): Promise<any> {
      if(id.id){
        return this.videoModel.findOne({ _id:id.id }).populate('createdBy').exec();
      }
      return this.videoModel.find().populate('createdBy').exec();
  }

  //create the streamVideo function to send a video as a stream to the client
  async streamVideo(id: string, response: Response, request: Request){
      try{
        // database to get the video’s details according to id
          const data = await this.videoModel.findOne({ _id: id})
          if(!data){
            throw new NotFoundException(null, 'VideoNotFound')
          }
        //get the initial range value from the request headers
          const { range } = request.headers;
          if(range){
              const { video } = data;
              //use the video details to get the video from the file system
              const videoPath = statSync(join(process.cwd(), `./public/${video}`));
              
              //break the video into 1mb chunks
              const CHUNK_SIZE = 1 * 1e6;
              const start = Number(range.replace(/\D/g, ''));
              const end = Math.min(start + CHUNK_SIZE, videoPath.size - 1);
              const videoLength = end - start + 1;
              response.status(206);
              response.header({
                  'Content-Range': `bytes ${start}-${end}/${videoPath.size}`,
                  'Accept-Ranges': 'bytes',
                  'Content-length':videoLength
              })
              const videoStream = createReadStream(join(process.cwd(), `./public/${video}`), { start, end });
              videoStream.pipe(response);
          }
          else{
              throw new NotFoundException(null, 'Range not found');
          }
      }
      catch(e) {
          console.error(e);
          throw new ServiceUnavailableException()
      }
  }

  async updateVideo(id, video: Video): Promise<Video> {
    return await this.videoModel.findByIdAndUpdate(id, video, { new: true })
}
async deleteVideo(id): Promise<any> {
    return await this.videoModel.findByIdAndRemove(id);
}
}

/// <reference types="multer" />
import { Video } from './schemas/video.schema';
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    constructor(videoService: VideoService);
    createVideo(response: any, request: any, video: Video, files: {
        video?: Express.Multer.File[];
        cover?: Express.Multer.File[];
    }): Promise<any>;
    readVideo(id: any): Promise<Object>;
    streamVideo(id: any, response: any, request: any): Promise<void>;
    updateVideo(response: any, id: any, video: Video): Promise<any>;
    deleteVideo(response: any, id: any): Promise<any>;
}

import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { Request, Response } from 'express';
export declare class VideoService {
    private videoModel;
    constructor(videoModel: Model<VideoDocument>);
    createVideo(video: Object): Promise<Video>;
    readVideo(id: any): Promise<any>;
    streamVideo(id: string, response: Response, request: Request): Promise<void>;
    updateVideo(id: any, video: Video): Promise<Video>;
    deleteVideo(id: any): Promise<any>;
}

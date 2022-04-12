import * as mongoose from 'mongoose';
import { User } from '../../user/schemas/user.schema';
export declare type VideoDocument = Video & Document;
export declare class Video {
    title: string;
    video: string;
    coverImage: string;
    uploadDate: Date;
    createdBy: User;
}
export declare const VideoSchema: mongoose.Schema<mongoose.Document<Video, any, any>, mongoose.Model<mongoose.Document<Video, any, any>, any, any, any>, {}, {}>;

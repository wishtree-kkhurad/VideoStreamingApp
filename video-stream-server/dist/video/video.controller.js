"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const common_1 = require("@nestjs/common");
const video_schema_1 = require("./schemas/video.schema");
const video_service_1 = require("./video.service");
const platform_express_1 = require("@nestjs/platform-express");
let VideoController = class VideoController {
    constructor(videoService) {
        this.videoService = videoService;
    }
    async createVideo(response, request, video, files) {
        console.log('VideoController at createVideo');
        console.log('video = ', video);
        console.log('files = ', files);
        const requestBody = {
            createdBy: request.user,
            title: video.title,
            video: files.video[0].filename,
            coverImage: files.cover[0].filename,
        };
        const newVideo = await this.videoService.createVideo(requestBody);
        return response.status(common_1.HttpStatus.CREATED).json({
            newVideo,
        });
    }
    async readVideo(id) {
        console.log('VideoController at readVideo');
        return await this.videoService.readVideo(id);
    }
    async streamVideo(id, response, request) {
        console.log('VideoController at streamVideo');
        return this.videoService.streamVideo(id, response, request);
    }
    async updateVideo(response, id, video) {
        const updatedVideo = await this.videoService.updateVideo(id, video);
        return response.status(common_1.HttpStatus.OK).json(updatedVideo);
    }
    async deleteVideo(response, id) {
        await this.videoService.deleteVideo(id);
        return response.status(common_1.HttpStatus.OK).json({
            user: null,
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'video', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, video_schema_1.Video, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "createVideo", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "readVideo", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "streamVideo", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, video_schema_1.Video]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "updateVideo", null);
__decorate([
    (0, common_1.Delete)(':/id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], VideoController.prototype, "deleteVideo", null);
VideoController = __decorate([
    (0, common_1.Controller)('video'),
    __metadata("design:paramtypes", [video_service_1.VideoService])
], VideoController);
exports.VideoController = VideoController;
//# sourceMappingURL=video.controller.js.map
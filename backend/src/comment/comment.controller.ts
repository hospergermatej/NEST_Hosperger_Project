import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {CommentEntity} from "./comment.entity";

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) {
    }

    @Get()
    getComments(): Promise<CommentEntity[]> {
        return this.commentService.getComments();
    }


}
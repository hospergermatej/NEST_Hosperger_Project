import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CommentEntity} from "./comment.entity";

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
        private commentEntityRepository: Repository<CommentEntity>,
    ) {}


    getComments(): Promise<CommentEntity[]> {
        return this.commentEntityRepository.find({});
    }




}
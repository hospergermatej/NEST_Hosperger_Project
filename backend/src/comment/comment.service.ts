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



    // create(dto: CreateStudentDto): Promise<Student> {
    //   const student = new Student();
    //
    //   // TODO
    //
    //   // student.class = dto.classId;
    //
    //   return this.studentsRepository.save(student);
    // }

    // delete(id: number): void {
    //   this.studentsRepository.delete(id);
    // }
}
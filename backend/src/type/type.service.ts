import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TypeEntity} from "./type.entity";

@Injectable()
export class TypeService {

    constructor(
        @InjectRepository(TypeEntity)
        private typeEntityRepository: Repository<TypeEntity>,
    ) {}


    getTypes(): Promise<TypeEntity[]> {
        return this.typeEntityRepository.find({});
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
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Student} from "./model/student.entity";
import {CreateStudentDto} from "./dto/create-student.dto";
import {UpdateStudentDto} from "./model/update-student.dto";

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}


  getStudents(): Promise<Student[]> {
    return this.studentsRepository.find({});
  }

  // getStudent(id: number): Promise<Student> {
  //   return this.studentsRepository.findOneBy({ id });
  // }

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

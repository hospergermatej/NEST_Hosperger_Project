import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {Student} from "./model/student.entity";
import {CreateStudentDto} from "./dto/create-student.dto";
import {UpdateStudentDto} from "./model/update-student.dto";

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService
  ) {}

  @Get()
  getStudents(): Promise<Student[]> {
    return this.studentsService.getStudents();
  }

  // @Get(':id')
  // getStudent(
  //     @Param('id', ParseIntPipe) id: number
  // ): Promise<Student> {
  //   return this.studentsService.getStudent(id);
  // }
  //
  // @Post()
  // createStudent(
  //     @Body() studentDto: CreateStudentDto
  // ): Promise<Student> {
  //   return this.studentsService.create(studentDto);
  // }
  //
  // @Put(':id')
  // updateStudent(
  //   @Param('id') id: number,
  //   @Body() studentDto: UpdateStudentDto
  // ): Promise<Student> {
  //   return this.studentsService.update(id, studentDto);
  // }
  //
  // @Delete(':id')
  // deleteStudent(
  //     @Param('id') id: number
  // ): void {
  //   // TODO
  // }

}

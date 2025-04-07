import { Module } from '@nestjs/common';
import {StudentsModule} from "./students/students.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Student} from "./students/model/student.entity";
import {Class} from "./classes/model/class.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_nest',
      entities: [
        Class,
        Student,
      ],
      synchronize: true,
    }),

    StudentsModule
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule {}

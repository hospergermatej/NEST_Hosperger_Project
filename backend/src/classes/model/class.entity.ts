import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Student} from "../../students/model/student.entity";

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Student,
    student => student.class
  )
  students: Student[];
}

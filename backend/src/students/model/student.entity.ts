
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Class} from "../../classes/model/class.entity";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    default: () => 'NOW()'
  })
  createdAt: Date;

  @ManyToOne(
    type => Class,
    c => c.students,
    {
      nullable: false,
      eager: true
    }
  )
  class: Class|number;
}

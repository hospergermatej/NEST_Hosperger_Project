
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';


@Entity()
export class PlaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;


    @Column({
        default: () => 'NOW()'
    })
    createdAt: Date;
}
/*   @ManyToOne(
       type => Class,
       c => c.students,
       {
           nullable: false,
           eager: true
       }
   )
   class: Class|number;
}
*/
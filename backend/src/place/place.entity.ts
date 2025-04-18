
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {CityEntity} from "../city/city.entity";
import {CommentEntity} from "../comment/comment.entity";
import {TypeEntity} from "../type/type.entity";
import {CityService} from "../city/city.service";

import {TypeService} from "../type/type.service";



@Entity()
export class PlaceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default:() => 0})
    rating: number;

    @Column({default:() => 0})
    ratingCount: number;


    @ManyToOne(
        type => CityEntity, c => c.Places,
        {
            nullable: false,
            eager: true
        }
    )   City:CityEntity

    @OneToMany(
        type => CommentEntity, c => c.Place,

    ) Comments: CommentEntity[]

    @ManyToOne(
        type => TypeEntity, t => t.Places,
        {
            nullable: true,
            eager: true
        }
    ) Type : TypeEntity


    constructor(name:string,description:string,city:CityEntity,type:TypeEntity) {
        this.name = name
        this.description = description
        this.Type = type
        this.City = city
    }

}

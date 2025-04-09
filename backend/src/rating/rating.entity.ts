
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {PlaceEntity} from "../place/place.entity";
import {Max} from "class-validator";


@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Max(5)
    score: number;

    @ManyToOne(
        type => PlaceEntity, p => p.Rating

    ) Places : PlaceEntity


    constructor(score:number,place:PlaceEntity){
        this.score = score
        this.Places = place
    }
}

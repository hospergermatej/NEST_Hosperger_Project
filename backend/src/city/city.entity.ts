
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {PlaceEntity} from "../place/place.entity";


@Entity()
export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;




    @OneToMany(
        type => PlaceEntity, p => p.City
    ) Places : PlaceEntity[];

    constructor(name:string) {
        this.name = name
    }

}





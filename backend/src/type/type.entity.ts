
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {PlaceEntity} from "../place/place.entity";


@Entity()
export class TypeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(
        type => PlaceEntity, p => p.Type

    ) Places : PlaceEntity[]

}

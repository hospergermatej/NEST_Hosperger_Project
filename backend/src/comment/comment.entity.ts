
import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {PlaceEntity} from "../place/place.entity";
import {PlaceService} from "../place/place.service";


@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    username:string;

    @Column({
        default: () => 'NOW()'
    })
    createdAt: Date;

    @ManyToOne(
        type => PlaceEntity, p=> p.Comments,
        {
            nullable: false,
            eager: true
        }
    ) Place: PlaceEntity


    constructor(content:string,username:string,place:PlaceEntity) {
        this.content = content
        this.username = username
        this.Place = place
    }


}





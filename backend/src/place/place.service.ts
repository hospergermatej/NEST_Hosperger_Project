import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PlaceEntity} from "./place.entity";
import {CommentEntity} from "../comment/comment.entity";



@Injectable()
export class PlaceService {

    constructor(
         @InjectRepository(PlaceEntity)
        private placeEntityRepository: Repository<PlaceEntity>,
         @InjectRepository(CommentEntity)
         private commentEntityRepository: Repository<CommentEntity>,

    ) {}


    getPlaces(): Promise<PlaceEntity[]> {
        return this.placeEntityRepository.find({});
    }

    getPlacesByID(id: number): Promise<PlaceEntity> {
      return this.placeEntityRepository.findOneBy({ id });
    }

    async getCommentsByPlace(id:number): Promise<CommentEntity[]>{
        const place = await this.placeEntityRepository.findOne({where:{id:id}, relations:['Comments']})
        return place.Comments
    }

    async createComment(id:number,comment:CommentEntity) : Promise<CommentEntity>{
        const place = await this.placeEntityRepository.findOne({where:{id:id}, relations:['Comments']})
        const newComment = new CommentEntity(comment.content,comment.username,place)
        return this.commentEntityRepository.save(newComment)
    }



    async deletePlace(id:number){
        const place = await this.placeEntityRepository.findOneBy({id})
        const comments = await this.commentEntityRepository.find({where:{Place:place}})
        comments.forEach(comment => {
            this.commentEntityRepository.remove(comment)
        })
        return this.placeEntityRepository.remove(place)
    }

    async deleteComments(id:number,commentID: number){
        const comment = await this.commentEntityRepository.findOneBy({id:commentID})
        return this.commentEntityRepository.remove(comment)
    }

    async updatePlace(id:number, places:PlaceEntity){
        const place = await this.placeEntityRepository.findOneBy({id})
        place.name = places.name
        place.description = places.description
        return this.placeEntityRepository.save(place)
    }

    async createRating(id:number,ratings:number){
        const place = await this.placeEntityRepository.findOneBy({id})
        place.rating = place.rating + ratings
        place.ratingCount = place.ratingCount + 1
        return this.placeEntityRepository.save(place)
    }

}
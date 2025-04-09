import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PlaceEntity} from "./place.entity";
import {CommentEntity} from "../comment/comment.entity";
import {RatingEntity} from "../rating/rating.entity";


@Injectable()
export class PlaceService {

    constructor(
         @InjectRepository(PlaceEntity)
        private placeEntityRepository: Repository<PlaceEntity>,
         @InjectRepository(CommentEntity)
         private commentEntityRepository: Repository<CommentEntity>,
         @InjectRepository(RatingEntity)
         private ratingEntityRepository: Repository<RatingEntity>
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

    async getRatingsByPlace(id:number): Promise <RatingEntity[]>{
        const place = await this.placeEntityRepository.findOne({where:{id:id}, relations:['Rating']})
        return place.Rating
    }

    async createRating(id:number,rating:RatingEntity) : Promise <RatingEntity>{
        const place = await this.placeEntityRepository.findOne({where:{id:id}, relations:['Rating']})
        const newPlace = new RatingEntity(rating.score,place)
        return this.ratingEntityRepository.save(newPlace)
    }

}
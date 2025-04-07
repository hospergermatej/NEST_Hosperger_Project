import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PlaceEntity} from "./place.entity";

@Injectable()
export class PlaceService {

    constructor(
         @InjectRepository(PlaceEntity)
        private placeEntityRepository: Repository<PlaceEntity>,
    ) {}


    getPlaces(): Promise<PlaceEntity[]> {
        return this.placeEntityRepository.find({});
    }

    getPlacesByID(id: number): Promise<PlaceEntity> {
      return this.placeEntityRepository.findOneBy({ id });
    }

    // create(dto: CreateStudentDto): Promise<Student> {
    //   const student = new Student();
    //
    //   // TODO
    //
    //   // student.class = dto.classId;
    //
    //   return this.studentsRepository.save(student);
    // }

    // delete(id: number): void {
    //   this.studentsRepository.delete(id);
    // }
}
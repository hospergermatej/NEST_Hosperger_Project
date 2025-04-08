import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TypeService} from "./type.service";
import {TypeController} from "./type.controller";
import {TypeEntity} from "./type.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            TypeEntity
        ])
    ],
    controllers: [
        TypeController,
    ],
    providers: [
        TypeService,
    ],
})
export class TypeModule {}
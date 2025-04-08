import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {TypeService} from "./type.service";
import {TypeEntity} from "./type.entity";

@Controller('type')
export class TypeController {
    constructor(
        private readonly typeService: TypeService
    ) {
    }

    @Get()
    getTypes(): Promise<TypeEntity[]> {
        return this.typeService.getTypes();
    }

}
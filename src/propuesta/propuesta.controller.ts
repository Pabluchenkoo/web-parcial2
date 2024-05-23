/* eslint-disable prettier/prettier */


import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { PropuestaService } from "./propuesta.service";
import { PropuestaEntity } from "./propuesta.entity";

@Controller('propuestas')
export class PropuestaController{
  constructor(private readonly propuestaService:PropuestaService){}

  @Get()
  async findAllPropuesta(){
    return this.propuestaService.findAllPropuesta();
  }

  @Get(':id')
  async findPropuestaById(id: number){
    return this.propuestaService.findPropuestaById(id);
  }

  @Post()
  async createPropuesta(@Body() propuesta: PropuestaEntity){
    return this.propuestaService.createPropuesta(propuesta);
  }

  @Delete(':id')
  async deletePropuesta(id: number){
    return this.propuestaService.deletePropuesta(id);
  }



}

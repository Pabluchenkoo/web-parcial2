/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ProyectoEntity } from "./proyecto.entity";

@Injectable()
export class ProyectoService{
  constructor(
  @InjectRepository(ProyectoEntity)
  private proyectoRespository: Repository<ProyectoEntity>,
  ){}

  //CreateProyecto() FecchaFin must be later than fechaInicio
  async createProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity>{
    if(proyecto.fechaFin < proyecto.fechaInicio){
      throw new BadRequestException('La fecha de fin debe ser mayor a la fecha de inicio')
    }
    return this.proyectoRespository.save(proyecto);
  }


}
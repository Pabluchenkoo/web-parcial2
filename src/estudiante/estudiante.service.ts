/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { NotFoundError } from "rxjs";

@Injectable()
export class EstudianteService{
  constructor(
  @InjectRepository(EstudianteEntity)
  private estudianteRespository: Repository<EstudianteEntity>,
  ){}

  createEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity>{
    if(estudiante.codigo.length !== 10){
      throw new BadRequestException('El codigo debe tener 10 caracteres')
    }
    return this.estudianteRespository.save(estudiante);
  }

  async findOne(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRespository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundError(`Estudiante with ID ${id} not found`);
    }
    return estudiante;
  }






}

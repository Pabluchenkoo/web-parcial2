/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private estudianteRepository: Repository<EstudianteEntity>,
  ) {}

  createEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
    if (estudiante.codigo.length !== 10) {
      throw new BadRequestException('El codigo debe tener 10 caracteres');
    }
    return this.estudianteRepository.save(estudiante);
  }

  async findOne(id: number): Promise<EstudianteEntity> {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante with ID ${id} not found`);
    }
    return estudiante;
  }
}

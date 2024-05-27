/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PropuestaEntity } from "./propuesta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PropuestaService {
  constructor(
    @InjectRepository(PropuestaEntity)
    private propuestaRepository: Repository<PropuestaEntity>,
  ) {}

  async createPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if (propuesta.titulo  == "") {
      throw new BadRequestException('El titulo no debe estar vacío');
    }
    return this.propuestaRepository.save(propuesta);
  }

  async findPropuestaById(id: number): Promise<PropuestaEntity> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta) {
      throw new NotFoundException(`Propuesta with ID ${id} not found`);
    }
    return propuesta;
  }

  async findAllPropuesta(): Promise<PropuestaEntity[]> {
    return this.propuestaRepository.find();
  }

  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta) {
      throw new NotFoundException(`Propuesta with ID ${id} not found`);
    }
    if (propuesta.proyecto !== null) {
      throw new BadRequestException('No se puede eliminar la propuesta con un proyecto asociado');
    }
    await this.propuestaRepository.delete(propuesta.id);
  }
}

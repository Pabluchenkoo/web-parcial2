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

  // Create a new propuesta titulo must not be empty
  async createPropuesta(propuesta: PropuestaEntity): Promise<PropuestaEntity> {
    if (propuesta.titulo === "") {
      throw new Error("titulo must not be empty");
    }
    return this.propuestaRepository.save(propuesta);
  }

  //findPropuestaById
  async findPropuestaById(id: number): Promise<PropuestaEntity> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (!propuesta) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return propuesta;
  }

  //findAllPropuesta()
  async findAllPropuesta(): Promise<PropuestaEntity[]> {
    return this.propuestaRepository.find();
  }

  //deletePropuesta(id) cannot be deleted if it has a proyecto
  async deletePropuesta(id: number): Promise<void> {
    const propuesta = await this.propuestaRepository.findOne({ where: { id } });
    if (propuesta.proyecto !== null) {
      throw new BadRequestException("Cannot delete propuesta with proyecto");
    }
    await this.propuestaRepository.delete(propuesta.id);
  }





}

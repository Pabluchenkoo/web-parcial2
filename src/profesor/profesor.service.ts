/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(ProfesorEntity)
    private profesorRepository: Repository<ProfesorEntity>,
  ) {}

  createProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
    const validGroups = ['TICSW', 'IMAGINE', 'COMIT'];
    if (!validGroups.includes(profesor.grupoDeInvestigacion)) {
      throw new BadRequestException('El grupo de investigacion no es valido');
    }
    return this.profesorRepository.save(profesor);
  }

  async findOne(id: number): Promise<ProfesorEntity> {
    const profesor = await this.profesorRepository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException(`Profesor with ID ${id} not found`);
    }
    return profesor;
  }

  async deleteProfesor(id: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { id }, relations: ['propuestas'] });
    if (!profesor) {
      throw new NotFoundException(`Profesor with ID ${id} not found`);
    }
    if (profesor.propuestas.length > 0 && profesor.propuestas[0].proyecto !== null) {
      throw new BadRequestException('El profesor tiene propuestas asociadas');
    }
    await this.profesorRepository.delete(profesor.id);
  }

  async deleteProfesorCedula(cedula: number): Promise<void> {
    const profesor = await this.profesorRepository.findOne({ where: { cedula }, relations: ['propuestas'] });
    if (!profesor) {
      throw new NotFoundException(`Profesor with cedula ${cedula} not found`);
    }
    if (profesor.propuestas.length > 0 && profesor.propuestas[0].proyecto !== null) {
      throw new BadRequestException('El profesor tiene propuestas asociadas');
    }
    await this.profesorRepository.delete(profesor.id);
  }
}

/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProfesorService{
  constructor(
  @InjectRepository(ProfesorEntity)
  private profesorRespository: Repository<ProfesorEntity>,
  ){}


  createProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity>{

    if(profesor.grupoDeInvestigacion !== 'TICSW'){
      throw new BadRequestException('El grupo de investigacion no es valido')
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    else if(profesor.grupoDeInvestigacion !== 'IMAGINE'){
      throw new BadRequestException('El grupo de investigacion no es valido')
    }
    else if(profesor.grupoDeInvestigacion !== 'COMIT'){
      throw new BadRequestException('El grupo de investigacion no es valido')
    }

    return this.profesorRespository.save(profesor);
  }

  async findOne(id: number): Promise<ProfesorEntity> {
    const profesor = await this.profesorRespository.findOne({ where: { id } });
    if (!profesor) {
      throw new NotFoundException(`RedSocial with ID ${id} not found`);
    }
    return profesor;
  }


  async deleteProfesor(id: number): Promise<void> {
    const profesor = await this.profesorRespository.findOne({ where: { id } });
    if(profesor.propuestas.length > 0 && profesor.propuestas[0].proyecto !== null){
      throw new BadRequestException(`El profesor tiene propuestas asociadas`);
    }
    await this.profesorRespository.delete(profesor.id);
  }


  async deleteProfesorCedula(cedula: number): Promise<void> {
    const profesor = await this.profesorRespository.findOne({ where: { cedula } });
    if(profesor.propuestas.length > 0 && profesor.propuestas[0].proyecto !== null){
      throw new BadRequestException(`El profesor tiene propuestas asociadas`);
    }
    await this.profesorRespository.delete(profesor.id);
  }




}


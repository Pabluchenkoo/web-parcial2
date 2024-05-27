/* eslint-disable prettier/prettier */
import { Controller, Post, Param, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  create(@Body() proyecto: ProyectoEntity) {
    return this.proyectoService.createProyecto(proyecto);
  }
}

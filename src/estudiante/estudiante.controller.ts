/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() estudiante: EstudianteEntity) {
    return this.estudianteService.createEstudiante(estudiante);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.estudianteService.findOne(id);
  }
}

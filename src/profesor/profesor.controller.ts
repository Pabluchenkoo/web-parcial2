/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';

@Controller('profesores')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() profesor: ProfesorEntity) {
    return this.profesorService.createProfesor(profesor);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.profesorService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.profesorService.deleteProfesor(id);
  }

  @Delete('cedula/:cedula')
  deleteByCedula(@Param('cedula') cedula: number) {
    return this.profesorService.deleteProfesorCedula(cedula);
  }
}

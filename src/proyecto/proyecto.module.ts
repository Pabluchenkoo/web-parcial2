/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { ProyectoController } from './proyecto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoEntity])],
  providers: [ProyectoService],
  controllers: [ProyectoController],
  exports: [ProyectoService],
})
export class ProyectoModule {}

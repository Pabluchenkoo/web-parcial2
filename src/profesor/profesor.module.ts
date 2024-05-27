/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { ProfesorController } from '../profesor/profesor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  providers: [ProfesorService],
  controllers: [ProfesorController],
  exports: [ProfesorService],
})
export class ProfesorModule {}

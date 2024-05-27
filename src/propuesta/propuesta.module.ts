/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { PropuestaController } from './propuesta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PropuestaEntity])],
  providers: [PropuestaService],
  controllers: [PropuestaController],
  exports: [PropuestaService],
})
export class PropuestaModule {}

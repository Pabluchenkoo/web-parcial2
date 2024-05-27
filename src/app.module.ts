/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { PropuestaModule } from './propuesta/propuesta.module';
import { ProyectoModule } from './proyecto/proyecto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of your database
      host: 'db', // database host
      port: 5432, // database port
      username: 'ISIS3710', // username
      password: 'qwerty123', // password
      database: 'parcial2_db', // name of your database
      autoLoadEntities: true,
      synchronize: true,
    }),
    EstudianteModule,
    ProfesorModule,
    PropuestaModule,
    ProyectoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";
import { PropuestaEntity } from "../propuesta/propuesta.entity";

@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  url: string;

  @OneToOne(() => EstudianteEntity, estudiante => estudiante.proyecto)
  @JoinColumn()
  estudiante: EstudianteEntity;

  @OneToOne(() => PropuestaEntity, propuesta => propuesta.proyecto)
  propuesta: PropuestaEntity;
}

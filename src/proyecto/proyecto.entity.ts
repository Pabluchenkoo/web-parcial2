/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { EstudianteEntity } from "../estudiante/estudiante.entity";

@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @Column()
  palabraClave: number;

  @OneToOne (() => EstudianteEntity , estudiante => estudiante.proyecto)
  @JoinColumn()
  estudiante: EstudianteEntity;

  @OneToOne (() => ProyectoEntity, proyecto => proyecto.propuesta)
  propuesta: ProyectoEntity;

}
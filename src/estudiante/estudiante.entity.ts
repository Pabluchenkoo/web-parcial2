/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  codigoEstudiante: string;

  @Column()
  creditosAprobados: number;

  @OneToOne (() => ProyectoEntity, proyecto => proyecto.estudiante)
  @JoinColumn()
  proyecto: ProyectoEntity;

}
/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { ProyectoEntity } from "../proyecto/proyecto.entity";

@Entity()
export class PropuestaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  palabraClave: number;

  @ManyToOne(() => ProfesorEntity, profesor => profesor.propuestas)
  profesor: ProfesorEntity;

  @OneToOne (() => ProyectoEntity, proyecto => proyecto.propuesta)
  proyecto: ProyectoEntity;
}
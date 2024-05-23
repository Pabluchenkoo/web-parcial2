/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PropuestaEntity } from "../propuesta/propuesta.entity";


@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  grupoDeInvestigacion: string;

  @OneToMany(() => PropuestaEntity, propuesta => propuesta.profesor)
  propuestas: PropuestaEntity[];
}
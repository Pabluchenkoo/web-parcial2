/* eslint-disable prettier/prettier */


import { Injectable } from "@nestjs/common";
import { PropuestaEntity } from "./propuesta.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PropuestaService {

  constructor(
    @InjectRepository(PropuestaEntity)
    private propuestaRepository: Repository<PropuestaEntity>,
  ) {}


}

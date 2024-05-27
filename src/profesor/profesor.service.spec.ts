/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfesorService } from './profesor.service';
import { ProfesorEntity } from './profesor.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(ProfesorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profesor with valid grupoDeInvestigacion', async () => {
    const profesor: ProfesorEntity = { id: 1, cedula: 12345, nombre: 'Dr. Smith', grupoDeInvestigacion: 'TICSW', propuestas: [] };
    jest.spyOn(repository, 'save').mockResolvedValue(profesor);
    const result = await service.createProfesor(profesor);
    expect(result).toEqual(profesor);
  });

  it('should throw an error if grupoDeInvestigacion is invalid', async () => {
    const profesor: ProfesorEntity = { id: 1, cedula: 12345, nombre: 'Dr. Smith', grupoDeInvestigacion: 'INVALID', propuestas: [] };
    await expect(service.createProfesor(profesor)).rejects.toThrow(BadRequestException);
  });

  it('should find a profesor by id', async () => {
    const profesor: ProfesorEntity = { id: 1, cedula: 12345, nombre: 'Dr. Smith', grupoDeInvestigacion: 'TICSW', propuestas: [] };
    jest.spyOn(repository, 'findOne').mockResolvedValue(profesor);
    const result = await service.findOne(1);
    expect(result).toEqual(profesor);
  });

  it('should throw an error if profesor not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });


});

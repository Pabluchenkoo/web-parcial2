/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProyectoService } from './proyecto.service';
import { ProyectoEntity } from './proyecto.entity';
import { BadRequestException } from '@nestjs/common';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(ProyectoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a proyecto with valid dates', async () => {
    const proyecto: ProyectoEntity = { id: 1, fechaInicio: new Date('2023-01-01'), fechaFin: new Date('2023-12-31'), url: 'http://example.com', estudiante: null, propuesta: null };
    jest.spyOn(repository, 'save').mockResolvedValue(proyecto);
    const result = await service.createProyecto(proyecto);
    expect(result).toEqual(proyecto);
  });

  it('should throw an error if fechaFin is before fechaInicio', async () => {
    const proyecto: ProyectoEntity = { id: 1, fechaInicio: new Date('2023-12-31'), fechaFin: new Date('2023-01-01'), url: 'http://example.com', estudiante: null, propuesta: null };
    await expect(service.createProyecto(proyecto)).rejects.toThrow(BadRequestException);
  });
});

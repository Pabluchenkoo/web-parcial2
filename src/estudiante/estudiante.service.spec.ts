/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(EstudianteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student with valid data', async () => {
    const estudiante: EstudianteEntity = { id: 1, nombre: 'John Doe', codigo: '1234567890', creditosAprobados: 30, proyecto: null };
    jest.spyOn(repository, 'save').mockResolvedValue(estudiante);
    const result = await service.createEstudiante(estudiante);
    expect(result).toEqual(estudiante);
  });

  it('should throw an error if student code is not 10 characters', async () => {
    const estudiante: EstudianteEntity = { id: 1, nombre: 'John Doe', codigo: '123', creditosAprobados: 30, proyecto: null };
    await expect(service.createEstudiante(estudiante)).rejects.toThrow(BadRequestException);
  });

  it('should find a student by id', async () => {
    const estudiante: EstudianteEntity = { id: 1, nombre: 'John Doe', codigo: '1234567890', creditosAprobados: 30, proyecto: null };
    jest.spyOn(repository, 'findOne').mockResolvedValue(estudiante);
    const result = await service.findOne(1);
    expect(result).toEqual(estudiante);
  });

  it('should throw an error if student not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });
});

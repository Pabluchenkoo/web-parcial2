/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropuestaService } from './propuesta.service';
import { PropuestaEntity } from './propuesta.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PropuestaService', () => {
  let service: PropuestaService;
  let repository: Repository<PropuestaEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropuestaService,
        {
          provide: getRepositoryToken(PropuestaEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PropuestaService>(PropuestaService);
    repository = module.get<Repository<PropuestaEntity>>(getRepositoryToken(PropuestaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a propuesta with valid titulo', async () => {
    const propuesta: PropuestaEntity = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripcion 1', palabraClave: 'Clave', profesor: null, proyecto: null };
    jest.spyOn(repository, 'save').mockResolvedValue(propuesta);
    const result = await service.createPropuesta(propuesta);
    expect(result).toEqual(propuesta);
  });

  it('should throw an error if titulo is empty', async () => {
    const propuesta: PropuestaEntity = { id: 1, titulo: '', descripcion: 'Descripcion 1', palabraClave: 'Clave', profesor: null, proyecto: null };
    await expect(service.createPropuesta(propuesta)).rejects.toThrow(BadRequestException);
  });

  it('should find a propuesta by id', async () => {
    const propuesta: PropuestaEntity = { id: 1, titulo: 'Propuesta 1', descripcion: 'Descripcion 1', palabraClave: 'Clave', profesor: null, proyecto: null };
    jest.spyOn(repository, 'findOne').mockResolvedValue(propuesta);
    const result = await service.findPropuestaById(1);
    expect(result).toEqual(propuesta);
  });

  it('should throw an error if propuesta not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findPropuestaById(1)).rejects.toThrow(NotFoundException);
  });

});

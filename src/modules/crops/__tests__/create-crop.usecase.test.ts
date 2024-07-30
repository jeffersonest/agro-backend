/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
import 'reflect-metadata';
import '../../../config/tests.config';
import CreateCropUseCase from '../application/use-cases/create-crop.usecase';
import CropService from '../domain/crops.service';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import CreateCropDTO from '../application/dto/create-crop.dto';
import { v7 as uuidv7 } from 'uuid';

describe('CreateCropUseCase', () => {
  let createCropUseCase: CreateCropUseCase;
  let cropService: CropService;

  beforeEach(() => {
    cropService = {
      createCrop: jest.fn(),
    } as unknown as CropService;
    createCropUseCase = new CreateCropUseCase(cropService);
  });

  it('should create a crop successfully', async () => {
    const createCropDTO = new CreateCropDTO();
    createCropDTO.name = 'Repolho';

    (cropService.createCrop as jest.Mock).mockResolvedValue({
      id: uuidv7(),
      name: 'Repolho',
      createdAt: new Date(),
    });

    const result = await createCropUseCase.execute(createCropDTO);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', 'Repolho');
    expect(cropService.createCrop).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should throw validation errors if input is invalid', async () => {
    const createCropDTO = plainToClass(CreateCropDTO, {});
    await expect(validateOrReject(createCropDTO)).rejects.toBeInstanceOf(Array);
  });
});

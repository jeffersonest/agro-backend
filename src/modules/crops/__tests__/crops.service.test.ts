/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
import 'reflect-metadata';
import '../../../config/tests.config';
import CropService from '../domain/crops.service';
import CropsRepositoryPort from '../domain/ports/crops-repository.port';
import Crop from '../domain/crops.entity';
import UpdateCropDTO from '../application/dto/update-crop.dto';
import { v7 as uuidv7 } from 'uuid';

describe('CropsService', () => {
  let cropService: CropService;
  let cropRepository: CropsRepositoryPort;

  beforeEach(() => {
    cropRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findByName: jest.fn(),
    } as unknown as CropsRepositoryPort;
    cropService = new CropService(cropRepository);
  });

  it('should create a crop successfully', async () => {
    const crop: Crop = {
      id: uuidv7(),
      name: 'crop',
      createdAt: new Date(),
      producerCrops: [],
    };

    (cropRepository.create as jest.Mock).mockResolvedValue(crop);

    const result = await cropService.createCrop(crop);

    expect(result).toEqual(crop);
    expect(cropRepository.create).toHaveBeenCalledWith(crop);
  });

  it('should update a crop successfully', async () => {
    const id = uuidv7();
    const updateData: UpdateCropDTO = {
      name: 'updated crop',
    };
    const existingCrop: Crop = {
      id,
      name: 'old crop',
      createdAt: new Date(),
      producerCrops: [],
    };
    const updatedCrop: Crop = {
      ...existingCrop,
      ...updateData,
    };

    (cropRepository.findById as jest.Mock).mockResolvedValue(existingCrop);
    (cropRepository.update as jest.Mock).mockResolvedValue(updatedCrop);

    const result = await cropService.updateCrop(id, updateData);

    expect(result).toEqual(updatedCrop);
    expect(cropRepository.findById).toHaveBeenCalledWith(id);
    expect(cropRepository.update).toHaveBeenCalledWith(id, updatedCrop);
  });

  it('should delete a crop successfully', async () => {
    const id = uuidv7();
    const existingCrop: Crop = {
      id,
      name: 'old crop',
      createdAt: new Date(),
      producerCrops: [],
    };

    (cropRepository.findById as jest.Mock).mockResolvedValue(existingCrop);
    (cropRepository.delete as jest.Mock).mockResolvedValue(true);

    const result = await cropService.deleteCrop(id);

    expect(result).toBe(true);
    expect(cropRepository.findById).toHaveBeenCalledWith(id);
    expect(cropRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should get a crop by id successfully', async () => {
    const id = uuidv7();
    const crop: Crop = {
      id,
      name: 'crop',
      createdAt: new Date(),
      producerCrops: [],
    };

    (cropRepository.findById as jest.Mock).mockResolvedValue(crop);

    const result = await cropService.getCropById(id);

    expect(result).toEqual(crop);
    expect(cropRepository.findById).toHaveBeenCalledWith(id);
  });

  it('should list all crops successfully', async () => {
    const crops: Crop[] = [
      {
        id: uuidv7(),
        name: 'crop1',
        createdAt: new Date(),
        producerCrops: [],
      },
      {
        id: uuidv7(),
        name: 'crop2',
        createdAt: new Date(),
        producerCrops: [],
      },
    ];

    (cropRepository.findAll as jest.Mock).mockResolvedValue(crops);

    const result = await cropService.listCrops();

    expect(result).toEqual(crops);
    expect(cropRepository.findAll).toHaveBeenCalled();
  });
});

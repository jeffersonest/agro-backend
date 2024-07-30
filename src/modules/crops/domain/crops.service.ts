import { inject, injectable } from 'tsyringe';
import Crop from './crops.entity';
import CropsRepositoryPort from './ports/crops-repository.port';
import UpdateCropDTO from '../application/dto/update-crop.dto';

@injectable()
class CropService {
  constructor(
    @inject('CropRepositoryPort')
    private cropRepository: CropsRepositoryPort,
  ) {}

  async createCrop(crop: Crop): Promise<Crop> {
    return this.cropRepository.create(crop);
  }

  async updateCrop(id: string, data: UpdateCropDTO): Promise<Crop | null> {
    const crop = await this.cropRepository.findById(id);
    if (!crop) {
      throw new Error('Crop not found');
    }

    Object.assign(crop, data);
    return this.cropRepository.update(id, crop);
  }

  async deleteCrop(id: string): Promise<boolean> {
    const crop = await this.cropRepository.findById(id);
    if (!crop) {
      throw new Error('Crop not found');
    }

    return this.cropRepository.delete(id);
  }

  async getCropById(id: string): Promise<Crop | null> {
    return this.cropRepository.findById(id);
  }

  async listCrops(): Promise<Crop[]> {
    return this.cropRepository.findAll();
  }
}

export default CropService;

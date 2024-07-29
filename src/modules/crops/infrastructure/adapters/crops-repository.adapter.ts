import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/typeorm.config';
import Crops from '../../domain/crops.entity';
import CropsRepositoryPort from '../../domain/ports/crops-repository.port';

@injectable()
class CropsRepositoryAdapter implements CropsRepositoryPort {
  private repository: Repository<Crops>;

  constructor() {
    this.repository = AppDataSource.getRepository(Crops);
  }

  async create(crop: Crops): Promise<Crops> {
    return await this.repository.save(crop);
  }

  async findAll(): Promise<Crops[]> {
    return await this.repository.find();
  }

  async findCropById(id: string): Promise<Crops | null> {
    return await this.repository.findOneBy({ id });
  }

  async updateCrop(id: string, crop: Crops): Promise<Crops | null> {
    const existingCrop = await this.repository.findOneBy({ id });
    if (!existingCrop) {
      return null;
    }
    const updatedCrop = { ...existingCrop, ...crop };
    return await this.repository.save(updatedCrop);
  }

  async deleteCrop(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}

export default CropsRepositoryAdapter;

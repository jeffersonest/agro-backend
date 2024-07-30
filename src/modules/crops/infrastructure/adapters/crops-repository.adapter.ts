import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/typeorm.config';
import Crop from '../../domain/crops.entity';
import CropsRepositoryPort from '../../domain/ports/crops-repository.port';

@injectable()
class CropRepositoryAdapter implements CropsRepositoryPort {
  private repository: Repository<Crop>;

  constructor() {
    this.repository = AppDataSource.getRepository(Crop);
  }

  async create(crop: Crop): Promise<Crop> {
    return await this.repository.save(crop);
  }

  async findAll(): Promise<Crop[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<Crop | null> {
    return await this.repository.findOneBy({ id });
  }

  async update(id: string, crop: Crop): Promise<Crop | null> {
    const existingCrop = await this.repository.findOneBy({ id });
    if (!existingCrop) {
      return null;
    }
    const updatedCrop = { ...existingCrop, ...crop };
    return await this.repository.save(updatedCrop);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}

export default CropRepositoryAdapter;

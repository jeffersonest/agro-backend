import Crops from '../crops.entity';

abstract class CropsRepositoryPort {
  abstract create(crop: Crops): Promise<Crops>;
  abstract findAll(): Promise<Crops[]>;
  abstract findById(id: string): Promise<Crops | null>;
  abstract update(id: string, crop: Crops): Promise<Crops | null>;
  abstract delete(id: string): Promise<boolean>;
}

export default CropsRepositoryPort;

import Crops from '../crops.entity';

abstract class CropsRepositoryPort {
  abstract create(crop: Crops): Promise<Crops>;
  abstract findAll(): Promise<Crops[]>;
  abstract findCropById(id: string): Promise<Crops | null>;
  abstract updateCrop(id: string, crop: Crops): Promise<Crops | null>;
  abstract deleteCrop(id: string): Promise<boolean>;
}

export default CropsRepositoryPort;

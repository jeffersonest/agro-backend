import { inject, injectable } from 'tsyringe';
import Crop from '../../domain/crops.entity';
import CropService from '../../domain/crops.service';

@injectable()
class ListCropsUseCase {
  constructor(
    @inject('CropService')
    private cropService: CropService,
  ) {}

  async execute(): Promise<Crop[]> {
    return this.cropService.listCrops();
  }
}

export default ListCropsUseCase;

import { inject, injectable } from 'tsyringe';
import Crop from '../../domain/crops.entity';
import CropService from '../../domain/crops.service';

@injectable()
class GetCropUseCase {
  constructor(
    @inject('CropService')
    private cropService: CropService,
  ) {}

  async execute(id: string): Promise<Crop | null> {
    return this.cropService.getCropById(id);
  }
}

export default GetCropUseCase;

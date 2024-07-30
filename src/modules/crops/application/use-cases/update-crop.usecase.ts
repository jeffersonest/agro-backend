import { inject, injectable } from 'tsyringe';
import Crop from '../../domain/crops.entity';
import UpdateCropDTO from '../dto/update-crop.dto';
import CropService from '../../domain/crops.service';

@injectable()
class UpdateCropUseCase {
  constructor(
    @inject('CropService')
    private cropService: CropService,
  ) {}

  async execute(id: string, data: UpdateCropDTO): Promise<Crop | null> {
    return this.cropService.updateCrop(id, data);
  }
}

export default UpdateCropUseCase;

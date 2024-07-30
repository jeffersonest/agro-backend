import { inject, injectable } from 'tsyringe';
import Crop from '../../domain/crops.entity';
import CreateCropDTO from '../dto/create-crop.dto';
import CropService from '../../domain/crops.service';

@injectable()
class CreateCropUseCase {
  constructor(
    @inject('CropService')
    private cropService: CropService,
  ) {}

  async execute(data: CreateCropDTO): Promise<Crop> {
    const crop = new Crop();
    Object.assign(crop, data);
    return this.cropService.createCrop(crop);
  }
}

export default CreateCropUseCase;

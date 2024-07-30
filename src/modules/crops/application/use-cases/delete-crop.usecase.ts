import { inject, injectable } from 'tsyringe';
import CropService from '../../domain/crops.service';

@injectable()
class DeleteCropUseCase {
  constructor(
    @inject('CropService')
    private cropService: CropService,
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.cropService.deleteCrop(id);
  }
}

export default DeleteCropUseCase;

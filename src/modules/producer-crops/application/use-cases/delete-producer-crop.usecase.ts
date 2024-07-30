import { inject, injectable } from 'tsyringe';
import ProducerCropService from '../../domain/producer-crop.service';

@injectable()
class DeleteProducerCropUseCase {
  constructor(
    @inject('ProducerCropService')
    private producerCropService: ProducerCropService,
  ) {}

  async execute(id: string): Promise<boolean> {
    return this.producerCropService.deleteProducerCrop(id);
  }
}

export default DeleteProducerCropUseCase;

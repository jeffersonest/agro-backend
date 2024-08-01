import { inject, injectable } from 'tsyringe';
import ProducerRepositoryPort from './ports/producer-repository.port';
import Producer from './producer.entity';
import ProducerCropRepositoryPort from '../../producer-crops/domain/ports/producer-crop-repository.port';

@injectable()
class ProducerService {
  constructor(
    @inject('ProducerRepositoryPort')
    private producerRepository: ProducerRepositoryPort,
    @inject('ProducerCropRepositoryPort')
    private producerCropRepository: ProducerCropRepositoryPort,
  ) {}

  async createProducer(producer: Producer): Promise<Producer> {
    const producerExists = await this.producerIdentificationExists(
      producer.identification,
    );
    if (producerExists) {
      throw new Error('Producer identification already exists');
    }
    if (producer.usableArea + producer.vegetationArea > producer.farmSize) {
      throw new Error('Usable area and vegetation area exceed farm size');
    }
    return this.producerRepository.create(producer);
  }

  async producerIdentificationExists(identification: string): Promise<boolean> {
    return this.producerRepository.identificationExists(identification);
  }

  async updateProducer(
    id: string,
    producer: Producer,
  ): Promise<Producer | null> {
    const existingProducer = await this.getProducerById(id);
    if (!existingProducer) {
      throw new Error('Producer not found');
    }

    const totalPlantedArea = await this.calculateTotalPlantedArea(id);

    if (producer.farmSize < totalPlantedArea) {
      throw new Error(
        'Total planted area exceeds the new farm size. Please adjust the planted areas before reducing the farm size.',
      );
    }

    if (producer.usableArea + producer.vegetationArea > producer.farmSize) {
      throw new Error('Usable area and vegetation area exceed farm size');
    }

    return this.producerRepository.update(id, producer);
  }

  async deleteProducer(producer: Producer): Promise<boolean> {
    return this.producerRepository.delete(producer);
  }

  async getProducerById(id: string): Promise<Producer | null> {
    return this.producerRepository.findById(id);
  }

  async listProducers(): Promise<Producer[]> {
    return this.producerRepository.findAll();
  }

  private async calculateTotalPlantedArea(producerId: string): Promise<number> {
    const producerCrops =
      await this.producerCropRepository.findCropByProducerId(producerId);
    return producerCrops.reduce((total, crop) => total + crop.area, 0);
  }
}

export default ProducerService;

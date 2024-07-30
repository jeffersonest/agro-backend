import { injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../config/typeorm.config';
import Producer from '../../../producer/domain/producer.entity';
import Crop from '../../../crops/domain/crops.entity';
import ProducerCrop from '../../../producer-crops/domain/producer-crop.entity';
import StatisticsRepositoryPort from '../../domain/ports/statistics-repository.port';

@injectable()
class StatisticsRepositoryAdapter implements StatisticsRepositoryPort {
  private producerRepository: Repository<Producer>;
  private cropRepository: Repository<Crop>;
  private producerCropRepository: Repository<ProducerCrop>;

  constructor() {
    this.producerRepository = AppDataSource.getRepository(Producer);
    this.cropRepository = AppDataSource.getRepository(Crop);
    this.producerCropRepository = AppDataSource.getRepository(ProducerCrop);
  }

  async getFarmCount(): Promise<number> {
    return this.producerRepository.count();
  }

  async getTotalHectares(): Promise<number> {
    const result = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.farmSize)', 'total')
      .getRawOne();
    return result.total;
  }

  async getPieChartByState(): Promise<{ [state: string]: number }> {
    const result = await this.producerRepository
      .createQueryBuilder('producer')
      .select('producer.state', 'state')
      .addSelect('COUNT(producer.id)', 'count')
      .groupBy('producer.state')
      .getRawMany();
    return result.reduce((acc, item) => {
      acc[item.state] = parseInt(item.count, 10);
      return acc;
    }, {});
  }

  async getPieChartByCrop(): Promise<{ [crop: string]: number }> {
    const result = await this.producerCropRepository
      .createQueryBuilder('producerCrop')
      .innerJoinAndSelect('producerCrop.crop', 'crop')
      .select('crop.name', 'crop')
      .addSelect('COUNT(producerCrop.id)', 'count')
      .groupBy('crop.name')
      .getRawMany();
    return result.reduce((acc, item) => {
      acc[item.crop] = parseInt(item.count, 10);
      return acc;
    }, {});
  }

  async getPieChartByLandUse(): Promise<{
    agricultable: number;
    vegetation: number;
  }> {
    const result = await this.producerRepository
      .createQueryBuilder('producer')
      .select('SUM(producer.usableArea)', 'agricultable')
      .addSelect('SUM(producer.vegetationArea)', 'vegetation')
      .getRawOne();
    return {
      agricultable: result.agricultable,
      vegetation: result.vegetation,
    };
  }
}

export default StatisticsRepositoryAdapter;

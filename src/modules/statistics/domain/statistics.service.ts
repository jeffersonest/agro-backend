import { inject, injectable } from 'tsyringe';
import StatisticsRepositoryPort from './ports/statistics-repository.port';

@injectable()
class StatisticsService {
  constructor(
    @inject('StatisticsRepositoryPort')
    private statisticsRepository: StatisticsRepositoryPort,
  ) {}

  async getFarmCount(): Promise<number> {
    return this.statisticsRepository.getFarmCount();
  }

  async getTotalHectares(): Promise<number> {
    return this.statisticsRepository.getTotalHectares();
  }

  async getPieChartByState(): Promise<{ [state: string]: number }> {
    return this.statisticsRepository.getPieChartByState();
  }

  async getPieChartByCrop(): Promise<{ [crop: string]: number }> {
    return this.statisticsRepository.getPieChartByCrop();
  }

  async getPieChartByLandUse(): Promise<{
    agricultable: number;
    vegetation: number;
  }> {
    return this.statisticsRepository.getPieChartByLandUse();
  }
}

export default StatisticsService;

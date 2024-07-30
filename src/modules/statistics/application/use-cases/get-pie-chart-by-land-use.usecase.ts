import { inject, injectable } from 'tsyringe';
import StatisticsRepositoryPort from '../../domain/ports/statistics-repository.port';

@injectable()
class GetPieChartByLandUseUseCase {
  constructor(
    @inject('StatisticsRepositoryPort')
    private statisticsRepository: StatisticsRepositoryPort,
  ) {}

  async execute(): Promise<Record<string, number>> {
    return this.statisticsRepository.getPieChartByLandUse();
  }
}

export default GetPieChartByLandUseUseCase;

import { inject, injectable } from 'tsyringe';
import StatisticsRepositoryPort from '../../domain/ports/statistics-repository.port';

@injectable()
class GetPieChartByStateUseCase {
  constructor(
    @inject('StatisticsRepositoryPort')
    private statisticsRepository: StatisticsRepositoryPort,
  ) {}

  async execute(): Promise<Record<string, number>> {
    return this.statisticsRepository.getPieChartByState();
  }
}

export default GetPieChartByStateUseCase;

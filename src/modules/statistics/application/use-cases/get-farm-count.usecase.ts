import { inject, injectable } from 'tsyringe';
import StatisticsService from '../../domain/statistics.service';

@injectable()
class GetFarmCountUseCase {
  constructor(
    @inject('StatisticsService')
    private statisticsService: StatisticsService,
  ) {}

  async execute(): Promise<number> {
    return this.statisticsService.getFarmCount();
  }
}

export default GetFarmCountUseCase;

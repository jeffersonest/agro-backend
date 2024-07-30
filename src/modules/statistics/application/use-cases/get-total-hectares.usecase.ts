import { inject, injectable } from 'tsyringe';
import StatisticsRepositoryPort from '../../domain/ports/statistics-repository.port';

@injectable()
class GetTotalHectaresUseCase {
  constructor(
    @inject('StatisticsRepositoryPort')
    private statisticsRepository: StatisticsRepositoryPort,
  ) {}

  async execute(): Promise<number> {
    return this.statisticsRepository.getTotalHectares();
  }
}

export default GetTotalHectaresUseCase;

import { Router } from 'express';
import { container } from 'tsyringe';
import StatisticsController from './statistics.controller';

class StatisticsRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
    const statisticsController = container.resolve(StatisticsController);

    this.router.get(
      '/farm-count',
      statisticsController.getFarmCount.bind(statisticsController),
    );
    this.router.get(
      '/total-hectares',
      statisticsController.getTotalHectares.bind(statisticsController),
    );
    this.router.get(
      '/pie-chart-by-state',
      statisticsController.getPieChartByState.bind(statisticsController),
    );
    this.router.get(
      '/pie-chart-by-crop',
      statisticsController.getPieChartByCrop.bind(statisticsController),
    );
    this.router.get(
      '/pie-chart-by-land-use',
      statisticsController.getPieChartByLandUse.bind(statisticsController),
    );
  }

  public getRoutes(): Router {
    return this.router;
  }
}

export default new StatisticsRoutes().getRoutes();

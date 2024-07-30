abstract class StatisticsRepositoryPort {
  abstract getFarmCount(): Promise<number>;
  abstract getTotalHectares(): Promise<number>;
  abstract getPieChartByState(): Promise<{ [state: string]: number }>;
  abstract getPieChartByCrop(): Promise<{ [crop: string]: number }>;
  abstract getPieChartByLandUse(): Promise<{
    agricultable: number;
    vegetation: number;
  }>;
}

export default StatisticsRepositoryPort;

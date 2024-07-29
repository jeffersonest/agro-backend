import express from 'express';
import bodyParser from 'body-parser';
import Routes from './src/shared/infrastucture/routes';
import { injectable } from 'tsyringe';

@injectable()
export default class Server {
  private app: express.Application;
  private port: number;

  constructor(port?: number) {
    this.app = express();
    this.port = port ?? 3000;
  }

  public start(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/api', Routes);
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

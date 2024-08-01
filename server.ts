import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { injectable } from 'tsyringe';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './src/config/swagger.config';
import routes from './src/shared/infrastucture/routes';

@injectable()
export default class Server {
  private app: express.Application;
  private port: number;

  constructor(port?: number) {
    this.app = express();
    this.port = port ?? 3000;
  }

  public start(): void {
    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use('/api', routes);
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

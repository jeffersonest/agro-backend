import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Agro Challenge API',
      version: '1.0.0',
      description: 'Documentação da API da Agro Challenge',
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
      },
    ],
  },
  apis: ['./src/docs/**/*.yml'], // Caminho para seus arquivos de documentação
};

export default swaggerOptions;
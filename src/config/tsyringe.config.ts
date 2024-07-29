import 'reflect-metadata';
import { container } from 'tsyringe';

// Imports de Crops
import CropsRepositoryPort from '../modules/crops/domain/ports/crops-repository.port';
import CropsRepositoryAdapter from '../modules/crops/infrastructure/adapters/crops-repository.adapter';

// Imports de User
import UserRepositoryPort from '../modules/user/domain/ports/user-repository.port';
import UserRepositoryAdapter from '../modules/user/infrastructure/adapters/user-repository.adapter';
import CreateUserUseCase from '../modules/user/application/use-cases/create-user.usecase';
import UpdateUserUseCase from '../modules/user/application/use-cases/update-user.usecase';
import DeleteUserUseCase from '../modules/user/application/use-cases/delete-user.usecase';
import ListUsersUseCase from '../modules/user/application/use-cases/list-user.usecase';
import GetUserUseCase from '../modules/user/application/use-cases/get-user.usecase';
import UserService from '../modules/user/domain/user.service';
import UserController from '../modules/user/infrastructure/user.controller';

// Imports de Producer
import ProducerRepositoryPort from '../modules/producer/domain/ports/producer-repository.port';
import ProducerRepositoryAdapter from '../modules/producer/infrastructure/adapters/producer-repository.adapter';
import ProducerService from '../modules/producer/domain/producer.service';
import CreateProducerUseCase from '../modules/producer/application/use-cases/create-producer.usecase';
import UpdateProducerUseCase from '../modules/producer/application/use-cases/update-producer.usecase';
import DeleteProducerUseCase from '../modules/producer/application/use-cases/delete-producer.usecase';
import GetProducerUseCase from '../modules/producer/application/use-cases/get-producer.usecase';
import ListProducersUseCase from '../modules/producer/application/use-cases/list-producer.usecase';
import ProducerController from '../modules/producer/infrastructure/producer.controller';

// Registro de Repositórios
container.registerSingleton<UserRepositoryPort>(
  'UserRepositoryPort',
  UserRepositoryAdapter,
);
container.registerSingleton<CropsRepositoryPort>(
  'CropsRepositoryPort',
  CropsRepositoryAdapter,
);
container.registerSingleton<ProducerRepositoryPort>(
  'ProducerRepositoryPort',
  ProducerRepositoryAdapter,
);

// Registro de Serviços
container.registerSingleton<UserService>('UserService', UserService);
container.registerSingleton<ProducerService>(
  'ProducerService',
  ProducerService,
);

// Registro de Casos de Uso (User)
container.registerSingleton<CreateUserUseCase>(
  'CreateUserUseCase',
  CreateUserUseCase,
);
container.registerSingleton<UpdateUserUseCase>(
  'UpdateUserUseCase',
  UpdateUserUseCase,
);
container.registerSingleton<DeleteUserUseCase>(
  'DeleteUserUseCase',
  DeleteUserUseCase,
);
container.registerSingleton<ListUsersUseCase>(
  'ListUsersUseCase',
  ListUsersUseCase,
);
container.registerSingleton<GetUserUseCase>('GetUserUseCase', GetUserUseCase);

// Registro de Casos de Uso (Producer)
container.registerSingleton<CreateProducerUseCase>(
  'CreateProducerUseCase',
  CreateProducerUseCase,
);
container.registerSingleton<UpdateProducerUseCase>(
  'UpdateProducerUseCase',
  UpdateProducerUseCase,
);
container.registerSingleton<DeleteProducerUseCase>(
  'DeleteProducerUseCase',
  DeleteProducerUseCase,
);
container.registerSingleton<GetProducerUseCase>(
  'GetProducerUseCase',
  GetProducerUseCase,
);
container.registerSingleton<ListProducersUseCase>(
  'ListProducersUseCase',
  ListProducersUseCase,
);

// Registro de Controladores
container.registerSingleton<UserController>('UserController', UserController);
container.registerSingleton<ProducerController>(
  'ProducerController',
  ProducerController,
);

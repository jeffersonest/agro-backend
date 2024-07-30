import 'reflect-metadata';
import { container } from 'tsyringe';

// Importar classes e interfaces necessárias
// User imports
import CreateUserUseCase from '../modules/user/application/use-cases/create-user.usecase';
import UpdateUserUseCase from '../modules/user/application/use-cases/update-user.usecase';
import DeleteUserUseCase from '../modules/user/application/use-cases/delete-user.usecase';
import ListUsersUseCase from '../modules/user/application/use-cases/list-user.usecase';
import GetUserUseCase from '../modules/user/application/use-cases/get-user.usecase';
import UserService from '../modules/user/domain/user.service';
import UserRepositoryPort from '../modules/user/domain/ports/user-repository.port';
import UserRepositoryAdapter from '../modules/user/infrastructure/adapters/user-repository.adapter';
import UserController from '../modules/user/infrastructure/user.controller';

// Producer imports
import CreateProducerUseCase from '../modules/producer/application/use-cases/create-producer.usecase';
import UpdateProducerUseCase from '../modules/producer/application/use-cases/update-producer.usecase';
import DeleteProducerUseCase from '../modules/producer/application/use-cases/delete-producer.usecase';
import GetProducerUseCase from '../modules/producer/application/use-cases/get-producer.usecase';
import ListProducersUseCase from '../modules/producer/application/use-cases/list-producer.usecase';
import ProducerService from '../modules/producer/domain/producer.service';
import ProducerRepositoryPort from '../modules/producer/domain/ports/producer-repository.port';
import ProducerRepositoryAdapter from '../modules/producer/infrastructure/adapters/producer-repository.adapter';
import ProducerController from '../modules/producer/infrastructure/producer.controller';

// Crops imports
import CreateCropUseCase from '../modules/crops/application/use-cases/create-crop.usecase';
import UpdateCropUseCase from '../modules/crops/application/use-cases/update-crop.usecase';
import DeleteCropUseCase from '../modules/crops/application/use-cases/delete-crop.usecase';
import GetCropUseCase from '../modules/crops/application/use-cases/get-crop.usecase';
import ListCropsUseCase from '../modules/crops/application/use-cases/list-crop.usecase';
import CropService from '../modules/crops/domain/crops.service';
import CropsRepositoryPort from '../modules/crops/domain/ports/crops-repository.port';
import CropsRepositoryAdapter from '../modules/crops/infrastructure/adapters/crops-repository.adapter';
import CropController from '../modules/crops/infrastructure/crops.controller';

// Registrar repositórios
container.registerSingleton<UserRepositoryPort>(
  'UserRepositoryPort',
  UserRepositoryAdapter,
);
container.registerSingleton<ProducerRepositoryPort>(
  'ProducerRepositoryPort',
  ProducerRepositoryAdapter,
);
container.registerSingleton<CropsRepositoryPort>(
  'CropRepositoryPort',
  CropsRepositoryAdapter,
);

// Registrar serviços
container.registerSingleton<UserService>('UserService', UserService);
container.registerSingleton<ProducerService>(
  'ProducerService',
  ProducerService,
);
container.registerSingleton<CropService>('CropService', CropService);

// Registrar casos de uso - User
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

// Registrar casos de uso - Producer
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

// Registrar casos de uso - Crops
container.registerSingleton<CreateCropUseCase>(
  'CreateCropUseCase',
  CreateCropUseCase,
);
container.registerSingleton<UpdateCropUseCase>(
  'UpdateCropUseCase',
  UpdateCropUseCase,
);
container.registerSingleton<DeleteCropUseCase>(
  'DeleteCropUseCase',
  DeleteCropUseCase,
);
container.registerSingleton<GetCropUseCase>('GetCropUseCase', GetCropUseCase);
container.registerSingleton<ListCropsUseCase>(
  'ListCropsUseCase',
  ListCropsUseCase,
);

// Registrar controladores
container.registerSingleton<UserController>('UserController', UserController);
container.registerSingleton<ProducerController>(
  'ProducerController',
  ProducerController,
);
container.registerSingleton<CropController>('CropController', CropController);

import 'reflect-metadata';
import { container } from 'tsyringe';
import CropsRepositoryPort from '../modules/crops/domain/ports/crops-repository.port';
import CropsRepositoryAdapter from '../modules/crops/infrastructure/adapters/crops-repository.adapter';
import UserRepositoryPort from '../modules/user/domain/ports/user-repository.port';
import UserRepositoryAdapter from '../modules/user/infrastructure/adapters/user-repository.adapter';
import CreateUserUseCase from '../modules/user/application/use-cases/create-user.usecase';
import UpdateUserUseCase from '../modules/user/application/use-cases/update-user.usecase';
import DeleteUserUseCase from '../modules/user/application/use-cases/delete-user.usecase';
import ListUsersUseCase from '../modules/user/application/use-cases/list-user.usecase';
import GetUserUseCase from '../modules/user/application/use-cases/get-user.usecase';
import UserService from '../modules/user/domain/user.service';
import UserController from '../modules/user/infrastructure/user.controller';

// Registrar repositórios
container.registerSingleton<UserRepositoryPort>(
  'UserRepositoryPort',
  UserRepositoryAdapter,
);
container.registerSingleton<CropsRepositoryPort>(
  'CropsRepositoryPort',
  CropsRepositoryAdapter,
);

// Registrar serviços
container.registerSingleton<UserService>('UserService', UserService);

// Registrar casos de uso
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

// Registrar controladores
container.registerSingleton<UserController>('UserController', UserController);

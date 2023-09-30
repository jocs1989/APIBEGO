import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationController } from './authentication.controller';
import { AuthorizationService } from './authentication.service';

describe('AuthorizationController', () => {
  let controller: AuthorizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorizationController],
      providers: [AuthorizationService],
    }).compile();

    controller = module.get<AuthorizationController>(AuthorizationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

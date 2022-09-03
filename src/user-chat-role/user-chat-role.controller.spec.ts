import { Test, TestingModule } from '@nestjs/testing';
import { UserChatRoleController } from './user-chat-role.controller';

describe('UserChatRoleController', () => {
  let controller: UserChatRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserChatRoleController],
    }).compile();

    controller = module.get<UserChatRoleController>(UserChatRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

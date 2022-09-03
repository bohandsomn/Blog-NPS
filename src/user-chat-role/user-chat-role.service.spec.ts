import { Test, TestingModule } from '@nestjs/testing';
import { UserChatRoleService } from './user-chat-role.service';

describe('UserChatRoleService', () => {
  let service: UserChatRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserChatRoleService],
    }).compile();

    service = module.get<UserChatRoleService>(UserChatRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

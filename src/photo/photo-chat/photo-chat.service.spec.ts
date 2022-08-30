import { Test, TestingModule } from '@nestjs/testing';
import { PhotoChatService } from './photo-chat.service';

describe('PhotoChatService', () => {
  let service: PhotoChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoChatService],
    }).compile();

    service = module.get<PhotoChatService>(PhotoChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

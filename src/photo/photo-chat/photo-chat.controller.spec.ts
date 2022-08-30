import { Test, TestingModule } from '@nestjs/testing';
import { PhotoChatController } from './photo-chat.controller';

describe('PhotoChatController', () => {
  let controller: PhotoChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoChatController],
    }).compile();

    controller = module.get<PhotoChatController>(PhotoChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LikesPostController } from './likes-post.controller';

describe('LikesPostController', () => {
  let controller: LikesPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesPostController],
    }).compile();

    controller = module.get<LikesPostController>(LikesPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

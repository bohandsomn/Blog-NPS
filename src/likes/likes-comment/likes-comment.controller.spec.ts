import { Test, TestingModule } from '@nestjs/testing';
import { LikesCommentController } from './likes-comment.controller';

describe('LikesCommentController', () => {
  let controller: LikesCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesCommentController],
    }).compile();

    controller = module.get<LikesCommentController>(LikesCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

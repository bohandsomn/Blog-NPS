import { Test, TestingModule } from '@nestjs/testing';
import { LikesCommentService } from './likes-comment.service';

describe('LikesCommentService', () => {
  let service: LikesCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesCommentService],
    }).compile();

    service = module.get<LikesCommentService>(LikesCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

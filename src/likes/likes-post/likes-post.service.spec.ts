import { Test, TestingModule } from '@nestjs/testing';
import { LikesPostService } from './likes-post.service';

describe('LikesPostService', () => {
  let service: LikesPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesPostService],
    }).compile();

    service = module.get<LikesPostService>(LikesPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

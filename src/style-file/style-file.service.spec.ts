import { Test, TestingModule } from '@nestjs/testing';
import { StyleFileService } from './style-file.service';

describe('StyleFileService', () => {
  let service: StyleFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StyleFileService],
    }).compile();

    service = module.get<StyleFileService>(StyleFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

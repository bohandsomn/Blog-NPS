import { Test, TestingModule } from '@nestjs/testing';
import { PhotoUserController } from './photo-user.controller';

describe('PhotoUserController', () => {
  let controller: PhotoUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoUserController],
    }).compile();

    controller = module.get<PhotoUserController>(PhotoUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

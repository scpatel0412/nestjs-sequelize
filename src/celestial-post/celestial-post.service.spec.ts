import { Test, TestingModule } from '@nestjs/testing';
import { CelestialPostService } from './celestial-post.service';

describe('CelestialPostService', () => {
  let service: CelestialPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CelestialPostService],
    }).compile();

    service = module.get<CelestialPostService>(CelestialPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CelestialPostResolver } from './celestial-post.resolver';
import { CelestialPostService } from './celestial-post.service';

describe('CelestialPostResolver', () => {
  let resolver: CelestialPostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CelestialPostResolver, CelestialPostService],
    }).compile();

    resolver = module.get<CelestialPostResolver>(CelestialPostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

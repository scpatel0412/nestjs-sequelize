import { Test, TestingModule } from '@nestjs/testing';
import { PostLikeResolver } from './post-like.resolver';
import { PostLikeService } from './post-like.service';

describe('PostLikeResolver', () => {
  let resolver: PostLikeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostLikeResolver, PostLikeService],
    }).compile();

    resolver = module.get<PostLikeResolver>(PostLikeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

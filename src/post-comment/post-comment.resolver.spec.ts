import { Test, TestingModule } from '@nestjs/testing';
import { PostCommentResolver } from './post-comment.resolver';
import { PostCommentService } from './post-comment.service';

describe('PostCommentResolver', () => {
  let resolver: PostCommentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostCommentResolver, PostCommentService],
    }).compile();

    resolver = module.get<PostCommentResolver>(PostCommentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

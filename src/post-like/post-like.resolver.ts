import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostLikeService } from './post-like.service';
import { PostLike } from './entities/post-like.entity';
import { CreatePostLikeInput } from './dto/create-post-like.input';
import { UpdatePostLikeInput } from './dto/update-post-like.input';
import { PostLikeModel } from './model/post-like.model';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';

@Resolver(() => PostLike)
export class PostLikeResolver {
  constructor(private readonly postLikeService: PostLikeService) {}

  @AllowUnauthorized()
  @Mutation(() => PostLikeModel)
  createLike(
    @Args('createPostLikeInput') createPostLikeInput: CreatePostLikeInput,
  ) {
    return this.postLikeService.createLike(createPostLikeInput);
  }

  @AllowUnauthorized()
  @Query(() => [PostLikeModel])
  getLikes() {
    return this.postLikeService.getLikes();
  }

  @AllowUnauthorized()
  @Query(() => PostLikeModel)
  getLike(@Args('id') id: string) {
    return this.postLikeService.getLike(id);
  }
}

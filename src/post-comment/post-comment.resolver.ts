import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostCommentService } from './post-comment.service';
import { PostComment } from './entities/post-comment.entity';
import { CreatePostCommentInput } from './dto/create-post-comment.input';
import { UpdatePostCommentInput } from './dto/update-post-comment.input';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized.decorator';
import { PostCommentModel } from './model/post-comment.model';

@Resolver(() => PostCommentModel)
export class PostCommentResolver {
  constructor(private readonly postCommentService: PostCommentService) {}

  @AllowUnauthorized()
  @Mutation(() => PostCommentModel)
  createComment(
    @Args('createPostCommentInput')
    createPostCommentInput: CreatePostCommentInput,
  ) {
    return this.postCommentService.createComment(createPostCommentInput);
  }

  @AllowUnauthorized()
  @Mutation(() => PostCommentModel)
  updateComment(
    @Args('id') id: string,
    @Args('updatePostCommentInput')
    updatePostCommentInput: UpdatePostCommentInput,
  ) {
    return this.postCommentService.updateComment(id, updatePostCommentInput);
  }

  @AllowUnauthorized()
  @Mutation(() => PostCommentModel)
  deleteComment(@Args('id') id: string) {
    return this.postCommentService.deleteComment(id);
  }

  @AllowUnauthorized()
  @Query(() => PostCommentModel)
  getComment(@Args('id') id: string) {
    return this.postCommentService.getComment(id);
  }

  @AllowUnauthorized()
  @Query(() => [PostCommentModel])
  getComments() {
    return this.postCommentService.getComments();
  }
}

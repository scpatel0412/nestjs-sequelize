import { Module } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { PostCommentResolver } from './post-comment.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostCommentModel } from './model/post-comment.model';

@Module({
  imports: [SequelizeModule.forFeature([PostCommentModel])],
  providers: [PostCommentResolver, PostCommentService],
  exports: [PostCommentService],
})
export class PostCommentModule {}

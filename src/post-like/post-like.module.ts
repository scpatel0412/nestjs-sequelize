import { Module } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { PostLikeResolver } from './post-like.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostLikeModel } from './model/post-like.model';

@Module({
  imports: [SequelizeModule.forFeature([PostLikeModel])],
  providers: [PostLikeResolver, PostLikeService],
  exports: [PostLikeService],
})
export class PostLikeModule {}

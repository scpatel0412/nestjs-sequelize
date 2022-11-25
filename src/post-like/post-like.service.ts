import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostLikeInput } from './dto/create-post-like.input';
import { UpdatePostLikeInput } from './dto/update-post-like.input';
import { PostLikeModel } from './model/post-like.model';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectModel(PostLikeModel) private postLikeModel: typeof PostLikeModel,
    private sequelize: Sequelize,
  ) {}

  public async createLike(post: CreatePostLikeInput): Promise<PostLikeModel> {
    const postInput = new PostLikeModel();
    postInput.like = post.like;
    postInput.status = post.status;
    postInput.description = post.description;
    postInput.postId = post.postId;
    postInput.email = post.email;

    const postResults = await this.postLikeModel.create(postInput.dataValues);
    return postResults;
  }

  public async getLikes(): Promise<Array<PostLikeModel>> {
    const userLike = await this.postLikeModel
      .scope([{ method: ['posts'] }])
      .findAll();
    return userLike;
  }

  public async getLike(id: string): Promise<PostLikeModel> {
    const userLike = await this.postLikeModel
      .scope([{ method: ['posts'] }])
      .findOne({ where: { id } });
    return userLike;
  }
}

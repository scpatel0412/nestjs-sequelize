import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostLikeInput } from './dto/create-post-like.input';
import { UpdatePostLikeInput } from './dto/update-post-like.input';
import { PostLikeCountModel } from './model/post-like-count.model';
import { PostLikeModel } from './model/post-like.model';

@Injectable()
export class PostLikeService {
  constructor(
    @InjectModel(PostLikeModel) private postLikeModel: typeof PostLikeModel,
    private sequelize: Sequelize,
  ) {}

  public async createLike(post: CreatePostLikeInput): Promise<PostLikeModel> {
    const postInput = new PostLikeModel();
    postInput.likes = post.likes;
    postInput.status = post.status;
    postInput.description = post.description;
    postInput.postId = post.postId;
    postInput.userId = post.userId;

    const postResults = await this.postLikeModel.create(postInput.dataValues);
    return postResults;
  }

  public async getLikes(): Promise<Array<PostLikeModel>> {
    const userLike = await this.postLikeModel
      .scope([{ method: ['posts'] }, { method: ['users'] }])
      .findAll();
    return userLike;
  }

  public async getLike(id: string): Promise<PostLikeModel> {
    const userLike = await this.postLikeModel
      .scope([{ method: ['posts'] }, { method: ['users'] }])
      .findOne({ where: { id } });
    return userLike;
  }

  public async updateLike(
    id: string,
    post: UpdatePostLikeInput,
  ): Promise<PostLikeModel> {
    const likeInput = await this.postLikeModel.findOne({ where: { id } });
    if (!likeInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      likeInput.likes = post.likes;
      likeInput.status = post.status;
      likeInput.description = post.description;

      const a = await this.postLikeModel.update(likeInput.dataValues, {
        where: { id },
      });
      return likeInput;
    }
  }

  public async deleteLike(id: string): Promise<PostLikeModel> {
    const likeDetails = await this.postLikeModel.findOne({
      where: { id },
    });
    if (!likeDetails) {
      throw new NotFoundException(`user with ${id} not found`);
    } else {
      await this.postLikeModel.destroy({ where: { id } });
      return likeDetails;
    }
  }

  public async getUserLikes(userId: string): Promise<Array<PostLikeModel>> {
    const likeDetails = await this.postLikeModel
      .scope([{ method: ['users'] }, { method: ['posts'] }])
      .findAll({
        where: { userId },
      });
    if (!likeDetails) {
      throw new NotFoundException(`No data found with this id ${userId}`);
    } else {
      return likeDetails;
    }
  }

  public async getPostLikes(postId: string): Promise<Array<PostLikeModel>> {
    const likeDetails = await this.postLikeModel
      .scope([{ method: ['users'] }, { method: ['posts'] }])
      .findAll({
        where: { postId },
      });
    if (!likeDetails) {
      throw new NotFoundException(`No data found with this id ${postId}`);
    } else {
      return likeDetails;
    }
  }

  public async getUserLikesCount(userId: string): Promise<PostLikeCountModel> {
    const counts = await this.postLikeModel.count({ where: { userId } });
    const likeCount = new PostLikeCountModel();
    likeCount.count = counts;
    return likeCount;
  }

  public async getPostLikesCount(postId: string): Promise<PostLikeCountModel> {
    const counts = await this.postLikeModel.count({ where: { postId } });
    const likeCount = new PostLikeCountModel();
    likeCount.count = counts;
    return likeCount;
  }
}

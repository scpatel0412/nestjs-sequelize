import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostCommentInput } from './dto/create-post-comment.input';
import { UpdatePostCommentInput } from './dto/update-post-comment.input';
import { PostCommentCountModel } from './model/post-comment-count.model';
import { PostCommentModel } from './model/post-comment.model';

@Injectable()
export class PostCommentService {
  constructor(
    @InjectModel(PostCommentModel)
    private postCommentModel: typeof PostCommentModel,
    private sequelize: Sequelize,
  ) {}

  public async createComment(
    comment: CreatePostCommentInput,
  ): Promise<PostCommentModel> {
    const commentInput = new PostCommentModel();
    commentInput.description = comment.description;
    commentInput.comment = comment.comment;
    commentInput.userId = comment.userId;
    commentInput.status = comment.status;
    commentInput.postId = comment.postId;
    const commentResult = await this.postCommentModel.create(
      commentInput.dataValues,
    );
    return commentResult;
  }

  public async updateComment(
    id: string,
    comment: UpdatePostCommentInput,
  ): Promise<PostCommentModel> {
    const commentInput = await this.postCommentModel.findOne({ where: { id } });
    if (!commentInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      commentInput.description = comment.description;
      commentInput.comment = comment.comment;
      commentInput.status = comment.status;
      await this.postCommentModel.update(commentInput.dataValues, {
        where: { id },
      });
      return commentInput;
    }
  }

  public async deleteComment(id: string): Promise<PostCommentModel> {
    const commentInput = await this.postCommentModel.findOne({ where: { id } });
    if (!commentInput) {
      throw new NotFoundException(`${id} not found`);
    } else {
      await this.postCommentModel.destroy({ where: { id } });
      return commentInput;
    }
  }

  public async getComment(id: string): Promise<PostCommentModel> {
    const commentInput = await this.postCommentModel
      .scope([{ method: ['posts'] }, { method: ['users'] }])
      .findOne({ where: { id } });
    return commentInput;
  }

  public async getComments(): Promise<Array<PostCommentModel>> {
    const commentInput = await this.postCommentModel
      .scope([{ method: ['posts'] }, { method: ['users'] }])
      .findAll();
    return commentInput;
  }

  public async getUserComments(
    userId: string,
  ): Promise<Array<PostCommentModel>> {
    const likeDetails = await this.postCommentModel
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

  public async getPostComments(
    postId: string,
  ): Promise<Array<PostCommentModel>> {
    const likeDetails = await this.postCommentModel
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

  public async getUserCommentsCount(
    userId: string,
  ): Promise<PostCommentCountModel> {
    const counts = await this.postCommentModel.count({ where: { userId } });
    const likeCount = new PostCommentCountModel();
    likeCount.count = counts;
    return likeCount;
  }

  public async getPostCommentsCount(
    postId: string,
  ): Promise<PostCommentCountModel> {
    const counts = await this.postCommentModel.count({ where: { postId } });
    const likeCount = new PostCommentCountModel();
    likeCount.count = counts;
    return likeCount;
  }
}

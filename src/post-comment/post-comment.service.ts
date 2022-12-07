import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CreatePostCommentInput } from './dto/create-post-comment.input';
import { UpdatePostCommentInput } from './dto/update-post-comment.input';
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
}

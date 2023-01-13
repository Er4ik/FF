import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './entitites/comment.entity';
import { PostEntity } from '../posts/entitites/post.entity';
import { LoggerService } from '../shared/helpers/logger/logger.service';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';
import { buildTree } from '../shared/helpers/tree/tree';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly logger: LoggerService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  /**
   * Retrieves all comments on individual posts by a given 'pid'
   * @param pid The id of the post to fetch
   */
  async getAllPostComments(postId: string): Promise<any> {
    try {
      const postWithComments = await this.postRepository.findOne({
        where: {
          id: +postId,
        },
        relations: ['comments', 'comments.parentId'],
      });

      const tree = buildTree(postWithComments.comments);

      return tree;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}

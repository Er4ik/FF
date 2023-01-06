import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentEntity } from './entitites/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  /**
   * Finds comments for the post
   * @param pid The id of the post to fetch
   */
  @Get('/:pid/all')
  @HttpCode(HttpStatus.OK)
  async getAllUserPosts(@Param('pid') postId: string): Promise<CommentEntity> {
    return await this.commentsService.getAllPostComments(postId);
  }
}

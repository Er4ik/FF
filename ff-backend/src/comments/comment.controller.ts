import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get()
  getHello(): string {
    return this.commentsService.getHello();
  }
}

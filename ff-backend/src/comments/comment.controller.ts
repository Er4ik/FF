import { Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.commentsService.getHello();
  }
}

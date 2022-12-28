import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.postsService.getHello();
  }
}

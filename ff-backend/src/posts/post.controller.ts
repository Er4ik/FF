import { Controller, Get, Param } from '@nestjs/common';
import { PostDto } from './dto/userPosts.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get('/all/:id')
  async getAllUserPosts(@Param('id') userId: string): Promise<PostDto[]> {
    return await this.postsService.getAllUserPosts(userId);
  }
}

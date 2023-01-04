import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/CreatePost.dto';

import { PostEntity } from './entitites/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get('/:uid/all')
  @HttpCode(HttpStatus.OK)
  async getAllUserPosts(@Param('uid') userId: string): Promise<PostEntity[]> {
    return await this.postsService.getAllUserPosts(userId);
  }

  @Get('/:uid/:id')
  @HttpCode(HttpStatus.OK)
  async getUserPostById(
    @Param() param: { uid: string; id: string },
  ): Promise<PostEntity[]> {
    return await this.postsService.getUserPostById(param.id, param.uid);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createUserPost(
    @Body(ValidationPipe) postCreateDto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postsService.createUserPost(postCreateDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserPost(
    @Param() param: { uid: string; id: string },
  ): Promise<void> {
    const mockedUserId = 1; // TODO: must be fixed
    return await this.postsService.deleteUserPost(param.id, mockedUserId);
  }
}

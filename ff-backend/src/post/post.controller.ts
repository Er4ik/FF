import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUpdatePostDto } from './dto/CreateUpdatePost.dto';
import { PostEntity } from './entitites/post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  /**
   * Finds all posts for user
   * @param uid user id
   */
  @Get('/:uid/all')
  @HttpCode(HttpStatus.OK)
  async getAllUserPosts(@Param('uid') userId: string): Promise<PostEntity[]> {
    return await this.postsService.getAllUserPosts(userId);
  }

  /**
   * Finds one post by user id and post id
   * @param uid user id
   * @param id post id
   */
  @Get('/:uid/:id')
  @HttpCode(HttpStatus.OK)
  async getUserPostById(
    @Param() param: { uid: string; id: string },
  ): Promise<PostEntity> {
    return await this.postsService.getUserPostById(param.id, param.uid);
  }

  /**
   * Creates post
   * @param postCreateDto post body data
   */
  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createUserPost(
    @Body(ValidationPipe) postCreateDto: CreateUpdatePostDto,
  ): Promise<PostEntity> {
    return await this.postsService.createUserPost(postCreateDto);
  }

  /**
   * Update post by post id
   * @param id post id
   */
  @Put('/:id')
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async updateUserPost(
    @Param('id') postId: string,
    @Body(ValidationPipe) postUpdateDto: CreateUpdatePostDto,
  ): Promise<PostEntity> {
    const mockedUserId = 1; // TODO: must be fixed

    return await this.postsService.updateUserPost(
      mockedUserId,
      postId,
      postUpdateDto,
    );
  }

  /**
   * Delete post by post id
   * @param id post id
   */
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUserPost(
    @Param() param: { uid: string; id: string },
  ): Promise<void> {
    const mockedUserId = 1; // TODO: must be fixed
    return await this.postsService.deleteUserPost(param.id, mockedUserId);
  }
}

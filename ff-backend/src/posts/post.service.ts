import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostLikeEntity } from './entitites/post-likes.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostEntity } from './entitites/post.entity';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';
import { LoggerService } from '../shared/helpers/logger/logger.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { UserEntity } from '../users/entitites/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(PostMediaEntity)
    private postMediaRepository: Repository<PostMediaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly logger: LoggerService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async getUserPosts(parameters: any): Promise<PostEntity[]> {
    return await this.postRepository.find({
      where: parameters,
      relations: ['likes', 'media', 'likes.user'],
      select: {
        likes: {
          id: true,
          user: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async getAllUserPosts(userId: string): Promise<PostEntity[]> {
    try {
      const posts = await this.getUserPosts({ createdBy: { id: +userId } });
      return posts;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async getUserPostById(postId: string, userId: string): Promise<PostEntity[]> {
    try {
      const posts = await this.getUserPosts({
        id: +postId,
        createdBy: { id: +userId },
      });

      return posts;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async createUserPost(postDto: CreatePostDto): Promise<any> {
    try {
      const mockedUserId = 1; // TODO: must be fixed

      const user = await this.userRepository.findOne({
        where: {
          id: mockedUserId,
        },
      });

      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }

      const postToDb = {
        ...postDto,
        ingredients: JSON.stringify(postDto.ingredients),
        steps: JSON.stringify(postDto.steps),
        createdBy: user,
      };

      const post = await this.postRepository.save(postToDb);

      if (!post) {
        throw new HttpException(
          'Something went wrong! Post was not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return post;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}

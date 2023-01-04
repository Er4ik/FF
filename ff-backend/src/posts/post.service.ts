import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostLikeEntity } from './entitites/post-likes.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostEntity } from './entitites/post.entity';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';
import { LoggerService } from '../shared/helpers/logger/logger.service';
import { CreateUpdatePostDto } from './dto/CreateUpdatePost.dto';
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

  async getPostTime(steps) {
    if (!steps.length) {
      return 0;
    } else if (steps.length === 1) {
      return steps[0].time;
    }

    return steps.reduce((prev, next) => prev?.time + next?.time);
  }

  async parsePostFields(posts: PostEntity[]): Promise<PostEntity[]> {
    return posts.map((post: PostEntity) => {
      const resPost = {
        ...post,
        ingredients: JSON.parse(post?.ingredients),
      };

      (async (steps) => await this.getPostTime(steps))(post.steps).then(
        (time) => (resPost['time'] = time),
      );

      return resPost;
    });
  }

  async getAllUserPosts(userId: string): Promise<PostEntity[]> {
    try {
      const posts = await this.getUserPosts({ createdBy: { id: +userId } });

      return await this.parsePostFields(posts);
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async getUserPostById(postId: string, userId: string): Promise<PostEntity> {
    try {
      const posts = await this.getUserPosts({
        id: +postId,
        createdBy: { id: +userId },
      });

      if (!posts.length) {
        throw new HttpException(
          `Post with id: ${postId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const parsedPost = await this.parsePostFields(posts);
      const post = parsedPost[0];

      return post;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async createUserPost(postDto: CreateUpdatePostDto): Promise<any> {
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
        createdBy: user,
      };

      const post = await this.postRepository.save(postToDb);

      if (!post) {
        throw new HttpException(
          'Something went wrong! Post was not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      this.logger.info(
        `Post was successfully created: ${JSON.stringify(post)}`,
      );

      return post;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async updateUserPost(
    userId: number,
    postId: string,
    postDto: CreateUpdatePostDto,
  ): Promise<any> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          id: +userId,
        },
      });

      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      }

      const post = await this.postRepository.findOne({
        where: {
          id: +postId,
        },
      });

      if (!post) {
        throw new HttpException(
          `Post with id: ${postId} does not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }

      Object.assign(post, {
        ...postDto,
        ingredients: JSON.stringify(postDto.ingredients),
        createdBy: user,
      });

      const updatedPost = await this.postRepository.save(post);
      this.logger.info(
        `Post was successfully updated: ${JSON.stringify(updatedPost)}`,
      );

      return updatedPost;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }

  async deleteUserPost(postId: string, userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    const post = await this.postRepository.findOne({
      where: {
        id: +postId,
      },
      relations: ['createdBy'],
    });

    if (post?.createdBy?.id !== user.id) {
      throw new HttpException(
        `Post with id: "${postId}" does not exist for this user`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.postRepository.delete(post.id);
    this.logger.info(`Post with id: ${postId} was successfully deleted`);
    return;
  }
}

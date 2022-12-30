import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostLikeEntity } from './entitites/post-likes.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostEntity } from './entitites/post.entity';
import { ErrorHandlerService } from '../shared/helpers/error-handler/error-handler.service';
import { LoggerService } from '../shared/helpers/logger/logger.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(PostMediaEntity)
    private postMediaRepository: Repository<PostMediaEntity>,
    private readonly logger: LoggerService,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  async getAllUserPosts(userId: string): Promise<any> {
    try {
      const posts = await this.postRepository.find({
        where: {
          createdBy: { id: +userId },
        },
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

      return posts;
    } catch (error) {
      this.errorHandler.handle(error);
    }
  }
}

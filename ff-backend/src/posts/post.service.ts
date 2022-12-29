import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostDto } from './dto/userPosts.dto';
import { PostLikeEntity } from './entitites/post-likes.entity';
import { PostMediaEntity } from './entitites/post-media.entity';
import { PostEntity } from './entitites/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostLikeEntity)
    private postLikeRepository: Repository<PostLikeEntity>,
    @InjectRepository(PostMediaEntity)
    private postMediaRepository: Repository<PostMediaEntity>,
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
      if (error instanceof HttpException) {
        throw new HttpException(`${error.message}`, error.getStatus());
      }

      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getHello(): Promise<string> {
    return 'Hello World from Posts Service!';
  }
}

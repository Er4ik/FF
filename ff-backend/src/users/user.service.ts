import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserFollowerEntity } from './entitites/user-follower.entity';
import { UserEntity } from './entitites/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserFollowerEntity)
    private userFollowerRepository: Repository<UserFollowerEntity>,
  ) {}

  async getHello(): Promise<string> {
    this.userRepository.find();
    return 'Hello World from User Service!';
  }
}

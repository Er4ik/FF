import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserEntity } from './entitites/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/all')
  async getAll(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') userId: string): Promise<UserEntity> {
    return await this.userService.getOne(userId);
  }

  @Delete('/:id')
  async remove(@Param('id') userId: string): Promise<void> {
    return await this.userService.deleteUser(userId);
  }

  // @Put()
  // async update() {}

  @Post('/registration')
  async registration(@Body() userCreateDto: UserCreateDto) {
    try {
      const userData = await this.userService.createUser(userCreateDto);

      return userData;
    } catch (err) {
      console.log(err);
    }
  }

  // @Post()
  // async login() {
  //   try {
  //   } catch (e) {}
  // }

  // @Post()
  // async logout() {
  //   try {
  //   } catch (e) {}
  // }

  // @Get('activate/:link')
  // async activate(@Param('link') activateLink: string) {
  //   try {
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // @Get('refresh')
  // async refresh() {
  //   try {
  //   } catch (e) {}
  // }
}

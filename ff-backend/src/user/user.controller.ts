import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  //Put,
  UsePipes,
  ValidationPipe,
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
  @UsePipes(ValidationPipe)
  async registration(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const userData = await this.userService.createUser(userCreateDto);
    return userData;
  }

  @Get('/activate/:link')
  async activate(@Param('link') link: string): Promise<void> {
    await this.userService.activate(link);
    return;
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

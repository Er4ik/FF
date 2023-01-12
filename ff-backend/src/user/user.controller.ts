import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';
import { AuthService } from '../auth/auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from './entitites/user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/all')
  async getAll(@Req() request): Promise<UserEntity[]> {
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

  @Post('/registration')
  @UsePipes(ValidationPipe)
  async registration(
    @Req() request,
    @Body() userCreateDto: UserCreateDto,
  ): Promise<any> {
    const userData = await this.userService.createUser(userCreateDto);
    const options = {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
    };
    request.res.setHeader('Set-Cookie', [userData.refreshToken], options);
    return userData;
  }

  @Get('/activate/:link')
  async activate(@Param('link') link: string): Promise<void> {
    await this.userService.activate(link);
    return;
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Req() request, @Body() userLogin: UserLoginDto): Promise<any> {
    const userData = await this.userService.login(userLogin);
    const options = {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      secure: true,
    };
    request.res.setHeader('Set-Cookie', [userData.refreshToken], options);
    return userData;
  }
}

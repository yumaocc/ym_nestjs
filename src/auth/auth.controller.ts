// auth.controller.ts
import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/utils';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { TOKEN_KEY } from 'src/config';
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Public()
  @Post('/login')
  async login(
    @Body() body: { name: string; password: string },
    @Res() res: Response,
  ) {
    const userInfo = await this.userService.get(body.name);

    if (body.name === userInfo.name && body.password === userInfo.password) {
      const token = await this.authService.generateToken(userInfo);

      res.cookie(TOKEN_KEY, token, { httpOnly: true });

      res.send({ data: { token }, success: true, code: 200 });
    } else {
      throw new UnauthorizedException('账号密码错误');
    }
  }
  @Public()
  @Post('verify')
  async verify(@Body() body: { token: string }) {
    try {
      const decoded = await this.authService.verifyToken(body.token);
      return { decoded };
    } catch (error) {
      throw new UnauthorizedException('登录过期');
    }
  }
}

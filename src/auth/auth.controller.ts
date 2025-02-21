import { Controller, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiQuery } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'email', required: true, type: String })
  @ApiQuery({ name: 'password', required: true, type: String })
  @Post('signin')
  signin(@Query('email') email: string, @Query('password') password: string) {
    const dto: AuthDto = { email, password };
    return this.authService.signin(dto);
  }

  @ApiQuery({ name: 'email', required: true, type: String })
  @ApiQuery({ name: 'password', required: true, type: String })
  @Post('signup')
  signup(@Query('email') email: string, @Query('password') password: string) {
    const dto: AuthDto = { email, password };
    return this.authService.signup(dto);
  }
}
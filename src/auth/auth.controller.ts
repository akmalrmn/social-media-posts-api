import { Controller, HttpCode, HttpStatus, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { ApiQuery } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  // signup
  @ApiQuery({ name: 'password', required: true, type: String })
  @ApiQuery({ name: 'email', required: true, type: String })
  @Post('signup')
  signup(@Query() dto: AuthDto) {
    return this.authService.signup(dto);
  }
  
  // signin
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'password', required: true, type: String })
  @ApiQuery({ name: 'email', required: true, type: String })
  @Post('signin')
  signin(@Query() dto: AuthDto) {
    return this.authService.signin(dto);
  }

}
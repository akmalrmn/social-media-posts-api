import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('signin')
  signin() {
    return 'I am a signin route';
  }

  @Post('signup')
  signup() {
    return 'I am a signup route';
  }
}
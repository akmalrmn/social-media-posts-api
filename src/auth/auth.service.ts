import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  signin() {
    return { msg: 'I am a signin route' };
  }

  signup() {
    return { msg: 'I am a signup route' };
  }
}
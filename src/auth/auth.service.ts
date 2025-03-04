import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isValid = await argon.verify(user.hash, dto.password);

    if (!isValid) throw new ForbiddenException('Invalid credentials');
    
    return this.signToken(user.id, user.email);
  }

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })
      
      delete (user as any).hash;

      return user;
    }
    catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ForbiddenException(
          'This email is already in use. Please use a different email.'
        )
      }
    }
    throw error;
  }

  async signToken(userId: number, email: string): Promise<{ access_token: String }> {
    const token = await this.jwt.signAsync({ userId, email }, { expiresIn: '1h', secret: process.env.JWT_SECRET });  
    
    return { access_token: token }  
  }
}
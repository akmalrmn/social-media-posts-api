import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, PrismaModule, ItemModule],
})

export class AppModule {}

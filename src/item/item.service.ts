import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateItemDto, EditItemDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  getPost(userId: number) {
    return this.prisma.item.findMany({
      where: {
        userId,
      }
    })
  }
    
  getPostById(userId: number, itemId: number) {
    return this.prisma.item.findFirst({
      where: {
        userId,
        id: itemId,
      }
    })
  }

  async createPost(userId: number, dto: CreateItemDto) {
    const post = await this.prisma.item.create({
      data: {
        userId,
        ...dto
      },
    });

    return post;
  }
  
  async editPostById(userId: number, itemId: number, dto: EditItemDto) {
    const post = await this.prisma.item.findUnique({
      where: {
        userId,
        id: itemId,
      }
    });

    if (!post) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        ...dto
      }
    })
  }

  deletePostById(userId: number, itemId: number) {
    return this.prisma.item.delete({
      where: {
        userId,
        id: itemId,
      }
    })
  } 
}

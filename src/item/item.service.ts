import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto, EditItemDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async getItem(userId: number) {
    const items = await this.prisma.item.findMany({
      where: {
        userId,
      }
    });

    if (items.length === 0) throw new NotFoundException('Item not found');

    return items;
  }
  async getItemById(userId: number, itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: {
        userId,
        id: itemId,
      }
    });

    if (!item) throw new NotFoundException('item not found');

    return item;
  }

  async createItem(userId: number, dto: CreateItemDto) {
    try {
      const item = await this.prisma.item.create({
        data: {
          userId,
          ...dto
        },
      });
  
      return item;
    }
    catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Invalid due date format');
      }
    }
  }
  
  async editItemById(userId: number, itemId: number, dto: EditItemDto) {
    const item = await this.prisma.item.findUnique({
      where: {
        userId,
        id: itemId,
      }
    });

    if (!item) throw new NotFoundException('Item not found');
    
    try {
  
      return this.prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          ...dto
        }
      })
    }
    catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new BadRequestException('Invalid due date format');
      }
    }
  }

  async deleteItemById(userId: number, itemId: number) {
    const item = await this.prisma.item.findUnique({
      where: {
        userId,
        id: itemId,
      }
    })

    if (!item) throw new NotFoundException('Access to resources denied');

    return await this.prisma.item.delete({
      where: {
        userId,
        id: itemId,
      }
    })
  } 
}

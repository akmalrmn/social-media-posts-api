import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ItemService } from './item.service';
import { GetUser } from 'src/auth/decorator';
import { CreateItemDto, EditItemDto } from './dto';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get()
  getPost(@GetUser('id') userId: number) {
    return this.itemService.getPost(userId);
  }
  
  @Get(':id')
  getPostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number) {
      return this.itemService.getPostById(userId, itemId);
    }

  @Post()
  createPost(
    @GetUser('id') userId: number,
    @Body() dto: CreateItemDto) {
      return this.itemService.createPost(userId, dto);
    }

  @Patch(':id')
  editPostById(
    @GetUser('id') userId: number,
    @Body() dto: EditItemDto,
    @Param('id', ParseIntPipe) itemId: number) {
      return this.itemService.editPostById(userId, itemId, dto);
    }

  @Delete(':id')
  deletePostById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number) {
      return this.deletePostById(userId, itemId);
    }
}

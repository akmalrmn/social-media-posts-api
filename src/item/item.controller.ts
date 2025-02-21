import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ItemService } from './item.service';
import { GetUser } from 'src/auth/decorator';
import { CreateItemDto, EditItemDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentMethod } from './dto/enum';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('Items')
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  // getItem
  @Get()
  @ApiOperation({ summary: 'Get all items for a user' })
  @ApiResponse({ status: 200, description: 'Returns all items for the authenticated user' })
  @ApiResponse({ status: 404, description: 'item not found' })
  getitem(@GetUser('id') userId: number) {
    return this.itemService.getItem(userId);
  }
  
  //getItemById
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific item by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Returns the specified item' })
  @ApiResponse({ status: 404, description: 'item not found' })
  getitemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number
  ) {
    return this.itemService.getItemById(userId, itemId);
  }

  // createItem
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiQuery({ name: 'title', required: true, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'brand', required: true, type: String })
  @ApiQuery({ name: 'platform', required: true, type: String })
  @ApiQuery({ name: 'dueDate', required: true, type: String, description: 'Due date in format YYYY-MM-DD' })
  @ApiQuery({ name: 'payment', required: true, enum: PaymentMethod })
  @ApiQuery({ name: 'status', required: true, type: Boolean})
  createitem(
    @GetUser('id') userId: number,
    @Query('title') title: string, 
    @Query('description') description: string, 
    @Query('brand') brand: string, 
    @Query('platform') platform: string, 
    @Query('dueDate') dueDate: Date, 
    @Query('payment') payment: PaymentMethod, 
    @Query('status') status: string
  ) {
    const dto: CreateItemDto = { title, description, brand, platform, dueDate: new Date(dueDate), payment, status: status === 'true' };
    return this.itemService.createItem(userId, dto);
  }

  // editItemById
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing item' })
  @ApiParam({ name: 'id', required: true, description: 'Item ID' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'description', required: false, type: String })
  @ApiQuery({ name: 'brand', required: false, type: String })
  @ApiQuery({ name: 'platform', required: false, type: String })
  @ApiQuery({ name: 'dueDate', required: false, type: String, description: 'Due date in format YYYY-MM-DD' })
  @ApiQuery({ name: 'payment', required: false, enum: PaymentMethod })
  @ApiQuery({ name: 'status', required: false, type: Boolean})
  @ApiResponse({ status: 200, description: 'Item updated successfully' })
  @ApiResponse({ status: 403, description: 'Access denied' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  edititemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
    @Query('title') title: string, 
    @Query('description') description: string, 
    @Query('brand') brand: string, 
    @Query('platform') platform: string, 
    @Query('dueDate') dueDate: string, 
    @Query('payment') payment: PaymentMethod, 
    @Query('status') status: boolean
  ) {
    const dto: EditItemDto = { title, description, brand, platform, dueDate: dueDate ? new Date(dueDate) : undefined, payment, status };
    return this.itemService.editItemById(userId, itemId, dto);
  }


  // deleteItemById
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', required: true, description: 'Item ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Item not found' })
  deleteitemById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number
  ) {
    return this.itemService.deleteItemById(userId, itemId);
  }
}
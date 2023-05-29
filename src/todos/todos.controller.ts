import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  TodoCountEntity,
  TodoEntity,
  TodoIDEntity,
} from './entities/todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  async findAll() {
    const todos = await this.todosService.findAll();
    return todos.map((todo) => new TodoEntity(todo));
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity, isArray: true })
  async findDrafts() {
    const todos = await this.todosService.findDrafts();
    return todos.map((todo) => new TodoEntity(todo));
  }

  @Get('ids')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoIDEntity, isArray: true })
  async findIDs() {
    const todos = await this.todosService.findIDs();
    return todos.map((todo) => new TodoEntity(todo));
  }

  @Get(':id')
  @ApiOkResponse({ type: TodoEntity })
  async findOne(@Param('id') id: string) {
    return new TodoEntity(await this.todosService.findOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TodoEntity })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todosService.create(createTodoDto);
    return new TodoEntity(todo);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosService.update(id, updateTodoDto);
    return new TodoEntity(todo);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  async patch(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosService.update(id, updateTodoDto);
    return new TodoEntity(todo);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoCountEntity })
  removeAll() {
    return this.todosService.removeAll();
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TodoEntity })
  async remove(@Param('id') id: string) {
    return new TodoEntity(await this.todosService.remove(id));
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { createApi as unsplashCreateApi } from 'unsplash-js';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { createTodoSlug } from 'src/utils/slug';

const unsplash = unsplashCreateApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.todo.findMany({
      where: {
        completed: true,
        completedAt: {
          lte: new Date(),
        },
      },
      include: {
        author: true,
      },
    });
  }

  findDrafts() {
    return this.prisma.todo.findMany({
      where: { completed: false },
      include: {
        author: true,
      },
    });
  }

  findIDs() {
    return this.prisma.todo.findMany({
      select: { id: true },
    });
  }

  async findOne(id: string) {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if (!todo) {
      throw new NotFoundException(`Todo with id: ${id} does not exist`);
    }
    return todo;
  }

  async create(createTodoDto: CreateTodoDto) {
    const result = await unsplash.photos.getRandom({
      query: createTodoDto.title,
      count: 1,
    });
    const randomImageUrl = result?.response[0]?.urls?.regular;

    return this.prisma.todo.create({
      data: {
        ...createTodoDto,
        imageUrl: randomImageUrl || '',
        slug: createTodoSlug(createTodoDto.title),
        completedAt: createTodoDto.completed ? new Date() : null,
      },
      include: {
        author: true,
      },
    });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data: {
        ...updateTodoDto,
        slug: createTodoSlug(updateTodoDto.title),
        completedAt: updateTodoDto.completed ? new Date() : null,
      },
      include: {
        author: true,
      },
    });
  }

  removeAll() {
    return this.prisma.todo.deleteMany();
  }

  remove(id: string) {
    return this.prisma.todo.delete({
      where: { id },
      include: {
        author: true,
      },
    });
  }
}

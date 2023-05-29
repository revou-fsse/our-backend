import { Todo } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'src/users/entities/user.entity';

export class TodoEntity implements Todo {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  slug: string | null;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty({ required: false, nullable: true })
  completedAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  imageUrl: string | null;

  @ApiProperty({ required: false, nullable: true })
  authorId: string | null;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  constructor({ author, ...data }: Partial<TodoEntity>) {
    Object.assign(this, data);

    if (author) {
      this.author = new UserEntity(author);
    }
  }
}

export class TodoIDEntity {
  @ApiProperty()
  id: string;
}

export class TodoCountEntity {
  @ApiProperty()
  count: number;
}

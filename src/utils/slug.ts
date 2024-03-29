import slugify from 'slugify';
import { nanoid } from 'nanoid';

export function createSlug(text: string) {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function createTodoSlug(title: string) {
  return createSlug(title + '-' + nanoid());
}

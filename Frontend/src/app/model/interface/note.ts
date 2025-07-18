import {User} from './user';

/*
export interface Note {
  title: string;
  categoryId: string;
  tagIds: string[];
  status: string;
  content: string;
}

 */

export interface Category {
  id: string;
  name: string;
  noteCount: number;
}

export interface Tag{
  id: string;
  name: string;
  noteCount: number;
}

export enum noteStatus{
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED"
}

export interface noteCreated{
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  tagIds: Tag[];
  createdAt: Date;
  updatedAt: Date;
  status: noteStatus;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  author?: {
    id: string;
    name: string;
  };
  category: Category;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  status?: noteStatus;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: noteStatus;
}


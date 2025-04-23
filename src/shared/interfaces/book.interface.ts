import { Author } from "./author.interface";
import { Publisher } from "./publisher.interface";
import { Reader } from "./reader.interface";

export interface Book {
  _id: string;
  code: string;
  title: string;
  subtitle: string;
  author: Author[];
  isOrg: boolean;
  cdd: string;
  spine: number;
  cutter: string;
  publisher: Publisher;
  edition: string;
  pages: number;
  isbn: string;
  coverUrl: string;
  isRead: boolean;
  readAt: Date;
  year: number;
  acquiredAt: Date;
  isBorrowed: boolean;
  borrowedTo?: Reader;
  authorNames: string;
}

export interface BooksAround {
  nextBooks: Book[];
  previousBooks: Book[];
}

export enum BookFilter {
  TITLE = "title",
  AUTHOR = "author",
  PUBLISHER = "publisher",
}

export interface CreateBook {
  code: string;
  title: string;
  subtitle?: string;
  author: string[];
  isOrg: boolean;
  cdd: string;
  spine: number;
  cutter: string;
  publisher: string;
  edition: string;
  pages: number;
  year: number;
  isbn: string;
  coverUrl?: string;
  isRead: boolean;
  readAt?: Date;
  acquiredAt: Date;
  isBorrowed: boolean;
  borrowedTo?: string;
}
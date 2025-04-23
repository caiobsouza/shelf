import api from "@/api";
import { BookFilter } from "@stores/Book.store";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export enum BOOKS_QUERY_KEYS {
  get_all_books = "get-all-books",
  get_books_around = "get-books-around",
  get_next_code = "get-next-code"
}

export const useBooks = (options: { filter: BookFilter; query?: string, page?: number }) => useQuery({
  queryKey: [BOOKS_QUERY_KEYS.get_all_books, options],
  queryFn: async () => {
    const { filter, query, page } = options;
    const { data, pagination } = await api.getBooks({ filter, query, page });
    return { data, pagination };
  },
  placeholderData: keepPreviousData,
});

export const useBooksAround = (bookId: string, enabled: boolean) => useQuery({
  queryKey: [BOOKS_QUERY_KEYS.get_books_around, bookId],
  queryFn: async () => {
    const {data } = await api.getBooksAroundById(bookId);
    return data;
  },
  enabled
});

export const useNextBookCode = () => useQuery({
  queryKey: [BOOKS_QUERY_KEYS.get_next_code],
  queryFn: async () => {
    const {data } = await api.getNextBookCode();
    return data;
  },
  staleTime: 360000
});
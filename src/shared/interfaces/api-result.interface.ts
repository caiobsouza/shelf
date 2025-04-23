export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface PaginationResponse {
  currentPage: number;
  pages: number;
  totalCount: number;
  limit: number;
}

export interface ApiResultDTO<T> {
  pagination?: PaginationResponse;
  data: T;
}

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "@/api";

export enum AUTHOR_QUERY_KEY {
  get_all_AUTHORS = "get-all-authors"
}

export const useAuthors = (options: { page?: number }) => useQuery({
  queryKey: [AUTHOR_QUERY_KEY.get_all_AUTHORS, options],
  queryFn: async () => {
    const response = await api.getAuthors(options);
    return {
      authors: response.data,
      pagination: response.pagination
    };
  },
  // staleTime: 360000,
  placeholderData: keepPreviousData
});

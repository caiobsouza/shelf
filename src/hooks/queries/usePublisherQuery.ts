import api from "@/api";
import { useQuery } from "@tanstack/react-query";

export enum PUBLISHER_QUERY_KEY {
  get_all_publishers = "get-all-publishers"
}

export const usePublishers = () => useQuery({
  queryKey: [PUBLISHER_QUERY_KEY.get_all_publishers],
  queryFn: async () => {
    const { data } = await api.getPublishers();
    return data;
  },
  staleTime: 360000
});

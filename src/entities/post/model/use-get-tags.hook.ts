import { useQuery } from "@tanstack/react-query"
import { postQueries } from "../api/post.queries"

export const useGetTags = () => {
  return useQuery(postQueries.tags())
}

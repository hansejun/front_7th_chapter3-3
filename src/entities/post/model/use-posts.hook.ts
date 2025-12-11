import { useQuery } from "@tanstack/react-query"
import { postQueries } from "../api/post.queries"

// 게시물 목록 조회
export const usePosts = (skip: number, limit: number) => {
  return useQuery(postQueries.list(skip, limit))
}

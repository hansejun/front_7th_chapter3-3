import { useQuery } from "@tanstack/react-query"
import { commentQueries } from "../api/comment.queries"

// 특정 게시물의 댓글 목록 조회
export const useCommentsByPost = (postId: number) => {
  return useQuery(commentQueries.listByPost(postId))
}

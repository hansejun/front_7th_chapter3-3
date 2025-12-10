import { queryOptions } from "@tanstack/react-query"
import { commentService } from "./comment.service"

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  listByPost: (postId: number) => [...commentKeys.lists(), "byPost", postId] as const,
}

export const commentQueries = {
  // 특정 게시물의 댓글 목록 조회
  listByPost: (postId: number) =>
    queryOptions({
      queryKey: commentKeys.listByPost(postId),
      queryFn: () => commentService.getCommentsByPost(postId),
    }),
}

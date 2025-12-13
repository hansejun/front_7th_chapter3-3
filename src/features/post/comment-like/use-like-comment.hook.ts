import { commentService, commentKeys, type Comment } from "@entities/comment"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"

interface LikeCommentVariables {
  id: number
  likes: number
}

export function useLikeComment(postId: number) {
  return useOptimisticMutation<Comment, Error, LikeCommentVariables, PaginatedData<Comment>>(
    {
      mutationFn: ({ id, likes }) => commentService.likeComment(id, likes),
    },
    {
      optimisticKey: commentKeys.listByPost(postId),
      updateFn: (oldData, { id, likes }) => {
        // 전달받은 likes 값으로 직접 업데이트
        return {
          ...oldData,
          data: oldData.data.map((comment) => (comment.id === id ? { ...comment, likes } : comment)),
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

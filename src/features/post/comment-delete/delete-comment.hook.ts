import { commentService, commentKeys, type Comment } from "@entities/comment"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"

export function useDeleteComment(postId: number) {
  return useOptimisticMutation<void, Error, number, PaginatedData<Comment>>(
    {
      mutationFn: commentService.deleteComment,
    },
    {
      optimisticKey: commentKeys.listByPost(postId),
      updateFn: (oldData, commentId) => {
        // 삭제할 댓글을 목록에서 제거
        return {
          ...oldData,
          data: oldData.data.filter((comment) => comment.id !== commentId),
          total: oldData.total - 1,
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

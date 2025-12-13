import {
  commentService,
  commentKeys,
  type UpdateCommentRequestDto,
  type Comment,
} from "@entities/comment"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"

export function useEditComment(postId: number) {
  return useOptimisticMutation<Comment, Error, UpdateCommentRequestDto, PaginatedData<Comment>>(
    {
      mutationFn: ({ id, body }) => commentService.updateComment(id, body),
    },
    {
      optimisticKey: commentKeys.listByPost(postId),
      updateFn: (oldData, updateData) => {
        // 수정된 댓글로 교체
        return {
          ...oldData,
          data: oldData.data.map((comment) =>
            comment.id === updateData.id ? { ...comment, body: updateData.body } : comment,
          ),
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

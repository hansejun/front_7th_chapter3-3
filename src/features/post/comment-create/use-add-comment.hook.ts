import {
  commentService,
  commentKeys,
  type CreateCommentRequestDto,
  type Comment,
} from "@entities/comment"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"

export function useAddComment(postId: number) {
  return useOptimisticMutation<Comment, Error, CreateCommentRequestDto, PaginatedData<Comment>>(
    {
      mutationFn: commentService.createComment,
    },
    {
      optimisticKey: commentKeys.listByPost(postId),
      updateFn: (oldData, newComment) => {
        // 새 댓글을 목록 끝에 추가
        return {
          ...oldData,
          data: [...oldData.data, newComment as unknown as Comment],
          total: oldData.total + 1,
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

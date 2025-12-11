import { postService, postKeys } from "@entities/post"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"
import type { Post } from "@entities/post"
import { usePostsSearchParams } from "@entities/post"

export function useDeletePost() {
  const { params } = usePostsSearchParams()

  return useOptimisticMutation<void, Error, number, PaginatedData<Post>>(
    {
      mutationFn: postService.deletePost,
    },
    {
      optimisticKey: postKeys.list({
        skip: params.skip,
        limit: params.limit,
        search: params.search,
        tag: params.tag,
      }),
      updateFn: (oldData, postId) => {
        // 삭제할 게시물을 목록에서 제거
        return {
          ...oldData,
          data: oldData.data.filter((post) => post.id !== postId),
          total: oldData.total - 1,
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

import { postService, postKeys, type Post, type UpdatePostRequestDto } from "@entities/post"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"
import { usePostsSearchParams } from "@entities/post"

export function useEditPost() {
  const { params } = usePostsSearchParams()

  return useOptimisticMutation<Post, Error, UpdatePostRequestDto, PaginatedData<Post>>(
    {
      mutationFn: postService.updatePost,
    },
    {
      optimisticKey: postKeys.list({
        skip: params.skip,
        limit: params.limit,
        search: params.search,
        tag: params.tag,
      }),
      updateFn: (oldData, updateData) => {
        // 수정된 게시물로 교체
        return {
          ...oldData,
          data: oldData.data.map((post) => (post.id === updateData.id ? { ...post, ...updateData.data } : post)),
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

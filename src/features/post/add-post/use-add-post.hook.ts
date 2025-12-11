import { postService, postKeys, type CreatePostRequestDto, type Post } from "@entities/post"
import { useOptimisticMutation } from "@shared/lib/tanstack-query/use-optimistic-update"
import type { PaginatedData } from "@shared/model/response.interface"
import { usePostsSearchParams } from "@entities/post"

export function useAddPost() {
  const { params } = usePostsSearchParams()

  return useOptimisticMutation<Post, Error, CreatePostRequestDto, PaginatedData<Post>>(
    {
      mutationFn: postService.createPost,
    },
    {
      optimisticKey: postKeys.list({
        skip: params.skip,
        limit: params.limit,
        search: params.search,
        tag: params.tag,
      }),
      updateFn: (oldData, newPost) => {
        // 새 게시물을 목록 맨 앞에 추가
        return {
          ...oldData,
          data: [newPost as unknown as Post, ...oldData.data],
          total: oldData.total + 1,
        }
      },
      // 성공 시에만 쿼리 무효화 (서버 데이터와 동기화)
      strategy: "never",
    },
  )
}

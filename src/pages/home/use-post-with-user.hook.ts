import { postQueries, usePostsSearchParams } from "@entities/post"
import { userQueries } from "@entities/user"
import { useSuspenseQueries } from "@tanstack/react-query"

export function useGetSuspendedPostsWithUser() {
  const { params } = usePostsSearchParams()
  const [postsQuery, usersQuery] = useSuspenseQueries({
    queries: [
      // 통합된 쿼리 - search, tag, 페이지네이션 모두 지원
      postQueries.list({
        skip: params.skip,
        limit: params.limit,
        search: params.search,
        tag: params.tag,
      }),
      userQueries.list({ limit: 0, select: "username,image" }),
    ],
  })

  const posts = postsQuery.data?.data || []
  const users = usersQuery.data?.data || []
  const total = postsQuery.data?.total || 0

  return {
    posts: posts.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    })),
    total,
  }
}

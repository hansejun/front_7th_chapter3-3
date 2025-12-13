import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { AddPostModalTrigger } from "@features/post/post-create"
import { PostTable } from "./ui/post-table"
import { PostSearchFilter } from "./ui/post-search-filter"
import { PaginationControls } from "./ui/pagination-controls"
import { useGetPostsWithUser } from "./hook/use-post-with-user"
import { ConditionalRender } from "@shared/ui/conditional-render"

export const PostsManagerPage = () => {
  const { posts, total } = useGetPostsWithUser()

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostModalTrigger />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostSearchFilter />

          <ConditionalRender
            condition={posts.length > 0}
            fallback={<div className="flex justify-center p-4">로딩 중...</div>}
          >
            <PostTable posts={posts} />
          </ConditionalRender>

          {/* 페이지네이션 */}
          <PaginationControls total={total} />
        </div>
      </CardContent>
    </Card>
  )
}

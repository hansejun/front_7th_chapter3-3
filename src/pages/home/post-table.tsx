import { Post, usePostsSearchParams } from "@entities/post"

import { Button } from "@shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shared/ui/table"
import { MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { useGetSuspendedPostsWithUser } from "./use-post-with-user.hook"
import { HighlightText } from "@shared/ui/highlight-text"
import { EditPostModalTrigger } from "@features/post/edit-post/modal-trigger.ui"
import { DeletePostButton } from "@features/post/delete-post"
import { User } from "@entities/user"
import { useModal } from "@shared/hooks/use-modal"
import { UserDetailModal } from "@widgets/user-detail-modal.ui"
import { PostDetailModal } from "@widgets/post-detail-modal.ui"

export const PostTable = () => {
  const { params, updateParams } = usePostsSearchParams()
  const { posts } = useGetSuspendedPostsWithUser()
  const { openModal } = useModal()

  const openUserDetailModal = (user: User) => {
    openModal(UserDetailModal, { user })
  }
  const openPostDetailModal = (post: Post) => {
    openModal(PostDetailModal, { post })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>
                  <HighlightText text={post.title} highlight={params.search} />
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        params.tag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        updateParams({ tag })
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => post.author && openUserDetailModal(post.author)}
              >
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetailModal(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <EditPostModalTrigger post={post} />
                <DeletePostButton postId={post.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

import { Post, usePostsSearchParams } from "@entities/post"
import { commentQueries } from "@entities/comment"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { BaseModalProps } from "@shared/store/modal/types"
import { HighlightText } from "@shared/ui/highlight-text"
import { useQuery } from "@tanstack/react-query"
import { AddCommentModalTrigger } from "@features/comment/add-comment"
import { LikeCommentButton } from "@features/comment/like-comment"
import { EditCommentModalTrigger } from "@features/comment/edit-comment"
import { DeleteCommentButton } from "@features/comment/delete-comment"

interface PostDetailModalProps extends BaseModalProps {
  post: Post
}

export const PostDetailModal = ({ post, onCloseModal }: PostDetailModalProps) => {
  const { params } = usePostsSearchParams()
  const { data: commentsData } = useQuery(commentQueries.listByPost(post.id))

  const comments = commentsData?.data || []
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={post.title} highlight={params.search} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={post.body} highlight={params.search} />
          </p>

          {/* 댓글 섹션 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <AddCommentModalTrigger postId={post.id} />
            </div>
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">
                      <HighlightText text={comment.body} highlight={params.search} />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LikeCommentButton postId={post.id} comment={comment} />
                    <EditCommentModalTrigger comment={comment} />
                    <DeleteCommentButton commentId={comment.id} postId={post.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

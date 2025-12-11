import { Post } from "@entities/post"
import { Comment } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { BaseModalProps } from "@shared/store/modal/types"
import { HighlightText } from "@shared/ui/highlight-text"

interface ViewPostModalProps extends BaseModalProps {
  post: Post
  comments: Comment[]
  searchTerm: string
  onAddComment: (postId: number) => void
  onLikeComment: (commentId: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number, postId: number) => void
}

export const ViewPostModal = ({
  post,
  comments,
  searchTerm,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
  onCloseModal,
}: ViewPostModalProps) => {
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <HighlightText text={post.title} highlight={searchTerm} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <HighlightText text={post.body} highlight={searchTerm} />
          </p>

          {/* 댓글 섹션 */}
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <Button size="sm" onClick={() => onAddComment(post.id)}>
                <Plus className="w-3 h-3 mr-1" />
                댓글 추가
              </Button>
            </div>
            <div className="space-y-1">
              {comments?.map((comment) => (
                <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
                  <div className="flex items-center space-x-2 overflow-hidden">
                    <span className="font-medium truncate">{comment.user.username}:</span>
                    <span className="truncate">
                      <HighlightText text={comment.body} highlight={searchTerm} />
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => onLikeComment(comment.id, post.id)}>
                      <ThumbsUp className="w-3 h-3" />
                      <span className="ml-1 text-xs">{comment.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEditComment(comment)}>
                      <Edit2 className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDeleteComment(comment.id, post.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
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

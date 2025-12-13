import { Comment } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { ThumbsUp } from "lucide-react"
import { toast } from "sonner"
import { useLikeComment } from "./use-like-comment.hook"

interface LikeCommentButtonProps {
  comment: Comment
  postId: number
}
export const LikeCommentButton = ({ postId, comment }: LikeCommentButtonProps) => {
  const { mutate: likeComment } = useLikeComment(postId)

  const handleLikeComment = () => {
    likeComment(
      {
        id: comment.id,
        likes: (comment.likes || 0) + 1,
      },
      {
        onSuccess: () => {
          toast.success("댓글 좋아요 성공")
        },
        onError: (error) => {
          toast.error("댓글 좋아요 실패")
        },
      },
    )
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLikeComment}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes || 0}</span>
    </Button>
  )
}

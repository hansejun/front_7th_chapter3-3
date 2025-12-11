import { Comment } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { ThumbsUp } from "lucide-react"

interface LikeCommentButtonProps {
  comment: Comment
  postId: number
}
export const LikeCommentButton = ({ postId, comment }: LikeCommentButtonProps) => {
  const handleLikeComment = () => {
    // likeComment(commentId, postId)
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleLikeComment}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}

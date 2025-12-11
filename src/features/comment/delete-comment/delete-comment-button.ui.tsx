import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"

interface DeleteCommentButtonProps {
  commentId: number
  postId: number
}

export const DeleteCommentButton = ({ commentId, postId }: DeleteCommentButtonProps) => {
  const handleDeleteComment = () => {
    // deleteComment(commentId, postId)
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"
import { useDeleteComment } from "./delete-comment.hook"

interface DeleteCommentButtonProps {
  commentId: number
  postId: number
}

export const DeleteCommentButton = ({ commentId, postId }: DeleteCommentButtonProps) => {
  const { mutate: deleteComment } = useDeleteComment(postId)

  const handleDeleteComment = () => {
    deleteComment(commentId)
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

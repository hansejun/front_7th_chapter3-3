import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useDeleteComment } from "./delete-comment.hook"

interface DeleteCommentButtonProps {
  commentId: number
  postId: number
}

export const DeleteCommentButton = ({ commentId, postId }: DeleteCommentButtonProps) => {
  const { mutate: deleteComment } = useDeleteComment(postId)

  const handleDeleteComment = () => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("댓글이 삭제되었습니다")
      },
      onError: (error) => {
        toast.error("댓글 삭제 실패")
      },
    })
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

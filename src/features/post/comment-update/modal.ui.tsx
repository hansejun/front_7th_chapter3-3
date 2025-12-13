import { Comment, UpdateCommentRequestDto } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"
import { useState } from "react"
import { toast } from "sonner"
import { useEditComment } from "./use-edit-comment.hook"

interface EditCommentModalProps extends BaseModalProps {
  comment: Comment
}

export const EditCommentModal = ({ onCloseModal, comment }: EditCommentModalProps) => {
  const [editedComment, setEditedComment] = useState<UpdateCommentRequestDto>({
    id: comment.id,
    body: comment.body,
  })

  const { mutate: updateComment } = useEditComment(comment.postId)

  const handleUpdateComment = () => {
    updateComment(editedComment, {
      onSuccess: () => {
        toast.success("댓글이 수정되었습니다")
        onCloseModal()
      },
      onError: () => {
        toast.error("댓글 수정 실패")
      },
    })
  }
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={editedComment.body || ""}
            onChange={(e) => setEditedComment({ ...editedComment, body: e.target.value })}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

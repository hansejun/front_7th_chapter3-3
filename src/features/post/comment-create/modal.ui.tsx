import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"
import { useState } from "react"
import { CreateCommentRequestDto } from "@entities/comment"
import { useAddComment } from "./use-add-comment.hook"

interface AddCommentModalProps extends BaseModalProps {
  postId: number
}

export const AddCommentModal = ({ onCloseModal, postId }: AddCommentModalProps) => {
  const [comment, setComment] = useState<CreateCommentRequestDto>({
    body: "",
    postId,
    userId: 1,
  })

  const { mutate: addComment } = useAddComment(postId)

  const handleAddComment = () => {
    addComment(comment)
    onCloseModal()
  }

  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment.body}
            onChange={(e) => setComment({ ...comment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

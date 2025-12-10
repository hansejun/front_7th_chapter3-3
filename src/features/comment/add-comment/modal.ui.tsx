import { CreateCommentRequestDto } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"

interface AddCommentModalProps extends BaseModalProps {
  comment: CreateCommentRequestDto
  onCommentChange: (comment: CreateCommentRequestDto) => void
  onAdd: () => void
}

export const AddCommentModal = ({ onCloseModal, comment, onCommentChange, onAdd }: AddCommentModalProps) => {
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
            onChange={(e) => onCommentChange({ ...comment, body: e.target.value })}
          />
          <Button onClick={onAdd}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

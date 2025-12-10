import { Comment } from "@entities/comment"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"

interface EditCommentModalProps extends BaseModalProps {
  comment: Comment
  onCommentChange: (comment: Comment) => void
  onUpdate: () => void
}

export const EditCommentModal = ({ onCloseModal, comment, onCommentChange, onUpdate }: EditCommentModalProps) => {
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={comment.body || ""}
            onChange={(e) => onCommentChange({ ...comment, body: e.target.value })}
          />
          <Button onClick={onUpdate}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

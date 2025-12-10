import { Post } from "@entities/post"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"

interface EditPostModalProps extends BaseModalProps {
  post: Post
  onPostChange: (post: Post) => void
  onUpdate: () => void
}

export const EditPostModal = ({ onCloseModal, post, onPostChange, onUpdate }: EditPostModalProps) => {
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post.title || ""}
            onChange={(e) => onPostChange({ ...post, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post.body || ""}
            onChange={(e) => onPostChange({ ...post, body: e.target.value })}
          />
          <Button onClick={onUpdate}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

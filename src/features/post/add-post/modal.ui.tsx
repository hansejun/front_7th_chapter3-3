import { CreatePostRequestDto } from "@entities/post"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"

interface AddPostModalProps extends BaseModalProps {
  newPost: CreatePostRequestDto
  setNewPost: (newPost: CreatePostRequestDto) => void
  onAddPost: () => void
}

export const AddPostModal = ({ onCloseModal, newPost, setNewPost, onAddPost }: AddPostModalProps) => {
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={onAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

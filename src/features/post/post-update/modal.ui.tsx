import { useState } from "react"
import { toast } from "sonner"
import { Post } from "@entities/post"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"
import { useEditPost } from "./use-edit-post.hook"

interface EditPostModalProps extends BaseModalProps {
  post: Post
}

export const EditPostModal = ({ onCloseModal, post }: EditPostModalProps) => {
  const [editedPost, setEditedPost] = useState(post)
  const { mutate: updatePost } = useEditPost()

  const handleUpdate = async () => {
    updatePost(
      { id: editedPost.id, data: editedPost },
      {
        onSuccess: () => {
          toast.success("게시물이 수정되었습니다")
          onCloseModal()
        },
        onError: (error) => {
          toast.error("게시물 수정 실패")
        },
      },
    )
  }
  return (
    <Dialog open onOpenChange={onCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={editedPost.title || ""}
            onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={editedPost.body || ""}
            onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
          />
          <Button onClick={handleUpdate}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

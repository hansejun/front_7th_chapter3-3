import { useState } from "react"
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
  const editPostMutation = useEditPost()

  const handleUpdate = async () => {
    try {
      await editPostMutation.mutateAsync({ id: editedPost.id, data: editedPost })
      onCloseModal()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
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

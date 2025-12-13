import { CreatePostRequestDto } from "@entities/post"
import { Button } from "@shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { Input } from "@shared/ui/input"
import { Textarea } from "@shared/ui/textarea"
import { BaseModalProps } from "@shared/store/modal/types"
import { useState } from "react"
import { toast } from "sonner"
import { useAddPost } from "./use-add-post.hook"

export const AddPostModal = ({ onCloseModal }: BaseModalProps) => {
  const [newPost, setNewPost] = useState<CreatePostRequestDto>({
    title: "",
    body: "",
    userId: 1,
  })

  const { mutate: addPost } = useAddPost()

  const handleAddPost = async () => {
    addPost(newPost, {
      onSuccess: () => {
        toast.success("게시물이 추가되었습니다")
      },
      onError: () => {
        toast.error("게시물 추가 실패")
      },
    })
    onCloseModal()
  }

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
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

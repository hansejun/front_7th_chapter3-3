export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: PostReactions
  views: number
}

export interface PostReactions {
  likes: number
  dislikes: number
}

export interface Tag {
  slug: string
  name: string
  url: string
}

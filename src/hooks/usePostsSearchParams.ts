import { useSearchParams } from "react-router-dom"

export interface PostsSearchParams {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
}

export const usePostsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 타입 안전한 params 객체
  const params: PostsSearchParams = {
    skip: parseInt(searchParams.get("skip") || "0"),
    limit: parseInt(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    tag: searchParams.get("tag") || "",
  }

  // 타입 안전한 업데이트 함수
  const updateParams = (updates: Partial<PostsSearchParams>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      return newParams
    })
  }

  return { params, updateParams }
}

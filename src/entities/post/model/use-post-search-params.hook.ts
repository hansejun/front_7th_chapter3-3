import { createSearchParamsProvider, type SearchParamValue } from "@shared/store/search-params"

export interface PostsSearchParams {
  [key: string]: SearchParamValue
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: "asc" | "desc"
  tag: string
}

const { Provider: PostsSearchParamsProvider, useSearchParams: usePostsSearchParams } =
  createSearchParamsProvider<PostsSearchParams>({
    defaultParams: {
      skip: 0,
      limit: 10,
      search: "",
      sortBy: "none",
      sortOrder: "asc",
      tag: "all",
    },
    paramSchema: {
      skip: "number",
      limit: "number",
      search: "string",
      sortBy: "string",
      sortOrder: "string",
      tag: "string",
    },
  })

export { PostsSearchParamsProvider, usePostsSearchParams }

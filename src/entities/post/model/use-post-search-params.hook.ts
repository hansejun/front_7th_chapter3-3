import { createSearchParamsProvider } from "@shared/store/search-params"
import { PostsSearchParams } from "./post.interface"

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

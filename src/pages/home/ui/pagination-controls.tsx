import { Button } from "@shared/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui/select"
import { usePostsSearchParams } from "@entities/post"

interface PropsType {
  total: number
}

export function PaginationControls({ total }: PropsType) {
  const { params, updateParams } = usePostsSearchParams()
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={params.limit.toString()} onValueChange={(value) => updateParams({ limit: Number(value) })}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button
          disabled={params.skip === 0}
          onClick={() => updateParams({ skip: Math.max(0, params.skip - params.limit) })}
        >
          이전
        </Button>
        <Button
          disabled={params.skip + params.limit >= total}
          onClick={() => updateParams({ skip: params.skip + params.limit })}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

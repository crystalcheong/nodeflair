import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/Core/ui/Pagination'
import { cn } from '@/utils/dom'
import { getRangedArray } from '@/utils/helpers'
import { Dispatch, SetStateAction } from 'react'

type PaginationSegmented = {
  segmentCount: number
  segmentsCount: number

  state: [number, Dispatch<SetStateAction<number>>]
}
const PaginationSegmented = ({
  state: [pageIdx, setPageIdx],

  segmentCount,
  segmentsCount,
}: PaginationSegmented) => {
  const maxPageIdx = segmentsCount - 1
  const isPaginationDisabled = maxPageIdx < 1 || !segmentCount
  const isFirstPage = pageIdx === 0
  const isNextDisabled = pageIdx + 1 > maxPageIdx
  const isPrevDisabled = isFirstPage

  const pages = {
    prev: isPrevDisabled ? pageIdx : pageIdx - 1,
    next: isNextDisabled ? maxPageIdx : pageIdx + 1,
    min: 0,
    max: maxPageIdx,
  }

  const ranges = getRangedArray({
    min: pages.prev,
    max: pages.next,
  })

  const isMaxDisabled = pages.next === pages.max
  const isMaxEllipsisDisabled =
    !isNextDisabled && ranges.slice(-1)[0] + 1 >= pages.max

  const isMinDisabled = pages.prev === pages.min
  const isMinEllipsisDisabled = !isPrevDisabled && ranges[0] - 1 <= pages.min

  const onPageChange = (page: number) => {
    const isCurrentPage: boolean = page === pageIdx
    if (isCurrentPage) return

    const isValidPage: boolean = page >= 0 && page <= maxPageIdx
    if (!isValidPage) page = 0

    setPageIdx(page)
  }
  const onPagePrevious = () => onPageChange(pages.prev)
  const onPageNext = () => onPageChange(pages.next)

  return (
    <Pagination className={cn(isPaginationDisabled && 'hidden')}>
      <PaginationContent className="m-0">
        <PaginationItem
          className={cn(isPrevDisabled && 'cursor-not-allowed opacity-50')}
          onClick={() => {
            if (isPrevDisabled) return
            onPagePrevious()
          }}
        >
          <PaginationPrevious className="max-sm:!px-2 max-sm:[&>span]:hidden" />
        </PaginationItem>

        {/* //#region  //*=========== MIN =========== */}
        <PaginationItem
          className={cn(isMinDisabled && 'hidden')}
          onClick={() => {
            if (isMinDisabled) return
            onPageChange(pages.min)
          }}
        >
          <PaginationLink>{pages.min + 1}</PaginationLink>
        </PaginationItem>

        <PaginationItem
          className={cn((isMinEllipsisDisabled || isPrevDisabled) && 'hidden')}
          onClick={() => {
            if (isMinEllipsisDisabled) return
            onPagePrevious()
          }}
        >
          <PaginationEllipsis />
        </PaginationItem>
        {/* //#endregion  //*======== MIN =========== */}

        {ranges.map((pgIdx) => (
          <PaginationItem
            key={`interview-page-${pgIdx}`}
            onClick={() => {
              onPageChange(pgIdx)
            }}
          >
            <PaginationLink isActive={pgIdx === pageIdx}>
              {pgIdx + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* //#region  //*=========== MAX =========== */}
        <PaginationItem
          className={cn((isMaxEllipsisDisabled || isNextDisabled) && 'hidden')}
          onClick={() => {
            if (isMaxEllipsisDisabled) return
            onPageNext()
          }}
        >
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem
          className={cn(isMaxDisabled && 'hidden')}
          onClick={() => {
            if (isMaxDisabled) return
            onPageChange(pages.max)
          }}
        >
          <PaginationLink>{pages.max + 1}</PaginationLink>
        </PaginationItem>
        {/* //#endregion  //*======== MAx =========== */}

        <PaginationItem
          className={cn(isNextDisabled && 'cursor-not-allowed opacity-50')}
          onClick={() => {
            if (isNextDisabled) return
            onPageNext()
          }}
        >
          <PaginationNext className="max-sm:!px-2 max-sm:[&>span]:hidden" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSegmented

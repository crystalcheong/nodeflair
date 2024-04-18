import PaginationSegmented from '@/components/Core/ui/Pagination.Segmented'
import {
  InterviewFilters,
  InterviewQuestionCard,
  useInteviewContext,
} from '@/components/Interview'
import { cn } from '@/utils/dom'
import { createSlug, getSegmentedArray } from '@/utils/helpers'
import { HTMLAttributes, useEffect, useState } from 'react'

type InterviewQuestions = HTMLAttributes<HTMLDivElement>
export const InterviewQuestions = ({
  className,
  children,
  ...rest
}: InterviewQuestions) => {
  const { form, questions } = useInteviewContext()
  const { sortType, questionTypes, companies, positions } = form.getValues()

  const isCompanyFiltered = !!companies.length
  const isPositionFiltered = !!positions.length

  const filteredQuestions = questions
    .filter((question) => {
      const isMatchingQuestionType = questionTypes.includes(
        question.questionType,
      )
      let isMatched = isMatchingQuestionType

      if (isCompanyFiltered) {
        const companySlug = createSlug(question.companyName, { delimiter: '_' })
        const isMatchingCompanies = companies.includes(companySlug)
        isMatched = isMatchingCompanies
      }

      if (isPositionFiltered) {
        const positionSlug = createSlug(question.companyName, {
          delimiter: '_',
        })
        const isMatchingPositions = positions.includes(positionSlug)
        isMatched = isMatchingPositions
      }

      return isMatched
    })
    .sort((a, b) => {
      let equality = 0

      if (sortType === 'recent') {
        equality = b.date.getDate() - a.date.getDate()
      }
      return equality
    })

  const isQuestionsEmpty = !filteredQuestions.length

  //#region  //*=========== PAGINATION ===========
  //#region  //*=========== STATES ===========
  const [pageIdx, setPageIdx] = useState<number>(0)

  const reset = () => {
    setPageIdx(0)
  }

  // reset pagination on mount
  useEffect(() => {
    reset()
  }, [])
  //#endregion  //*======== STATES ===========

  const segmentLimit = 10
  const segments: (typeof questions)[] = getSegmentedArray(
    filteredQuestions,
    segmentLimit,
  )
  const segment: typeof questions = segments?.[pageIdx] ?? []
  //#endregion  //*======== PAGINATION ===========

  // if (!filteredQuestions.length) return null
  return (
    <section
      className={cn('flex flex-col gap-4', className)}
      {...rest}
    >
      <header
        className={cn(
          'flex flex-row flex-wrap place-content-between place-items-start gap-4',
        )}
      >
        <p className="font-bold capitalize text-muted-foreground">
          {filteredQuestions.length}&nbsp;questions
        </p>

        <InterviewFilters.Drawer
          className="max-lg:!hidden"
          excludedFieldTypes={['combobox']}
        />
      </header>

      {segment.map((question, idx) => (
        <InterviewQuestions.Card
          key={`question-${question.questionType}-${idx}`}
          question={question}
        />
      ))}

      {isQuestionsEmpty && (
        <div className="flex flex-col place-content-center place-items-center gap-2">
          <img
            src="/images/error.notfound.svg"
            alt="not found"
            className="aspect-square w-3/5	min-w-28 max-w-48"
          />

          <p className="h3 line-clamp-2 max-w-prose truncate text-pretty text-center font-bold">
            Result Not Found
          </p>
          <p className="line-clamp-2 max-w-prose truncate text-pretty text-center leading-snug text-muted-foreground">
            Whoops... this information is not available at the moment
          </p>
        </div>
      )}

      <InterviewQuestions.Pagination
        state={[pageIdx, setPageIdx]}
        segmentCount={segment.length}
        segmentsCount={segments.length}
      />

      {children}
    </section>
  )
}

InterviewQuestions.Card = InterviewQuestionCard
InterviewQuestions.Pagination = PaginationSegmented

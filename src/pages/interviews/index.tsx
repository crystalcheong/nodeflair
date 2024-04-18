import {
  InterviewBanner,
  InterviewFilters,
  InterviewProvider,
  InterviewQuestions,
} from '@/components/Interview'
import { cn } from '@/utils/dom'

const InterviewsPage = () => {
  return (
    <InterviewsPage.Provider>
      <InterviewsPage.Banner />

      <main
        className={cn(
          'page-container',
          'flex flex-col gap-4',
          'gap-x-8 lg:flex-row',
        )}
      >
        <InterviewsPage.Filters />
        <InterviewsPage.Questions className="flex-1" />
      </main>
    </InterviewsPage.Provider>
  )
}

InterviewsPage.Provider = InterviewProvider
InterviewsPage.Banner = InterviewBanner
InterviewsPage.Filters = InterviewFilters
InterviewsPage.Questions = InterviewQuestions

export default InterviewsPage

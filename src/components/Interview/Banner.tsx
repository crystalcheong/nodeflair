import { cn } from '@/utils/dom'
import { HTMLAttributes } from 'react'

type InterviewBanner = HTMLAttributes<HTMLDivElement>
export const InterviewBanner = ({
  className,
  children,
  ...rest
}: InterviewBanner) => {
  return (
    <header
      className={cn('bg-primary', className)}
      {...rest}
    >
      <div
        className={cn(
          'container max-sm:px-4',
          'text-primary-foreground',
          'flex flex-col gap-1 pb-4 pt-2',
        )}
      >
        <h1 className="text-2xl">Interview Questions &amp; Answers</h1>
        <p className="m-0 text-pretty text-sm">
          Your go-to resource for acing job interviews with confidence.&nbsp;
          <br className="sm:hidden" />
          Access over 185,853 questions for your preparation needs.
        </p>

        {children}
      </div>
    </header>
  )
}

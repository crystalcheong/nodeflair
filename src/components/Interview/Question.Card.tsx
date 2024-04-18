import { Avatar, AvatarFallback } from '@/components/Core/ui/Avatar'
import { Badge } from '@/components/Core/ui/Badge'
import { Button } from '@/components/Core/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/Core/ui/Card'
import { InterviewQuestion } from '@/types/nodeflair'
import { cn } from '@/utils/dom'
import { BackpackIcon, Share1Icon } from '@radix-ui/react-icons'
import { ComponentProps } from 'react'

type InterviewQuestionCard = ComponentProps<typeof Card> & {
  question: InterviewQuestion
}
export const InterviewQuestionCard = ({
  question,

  children,
  ...rest
}: InterviewQuestionCard) => {
  return (
    <Card {...rest}>
      <CardHeader className="flex flex-row flex-wrap place-content-between place-items-start gap-2 pb-2 pt-3">
        <div className="flex flex-row place-items-center gap-2">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback>
              <BackpackIcon className="size-4" />
            </AvatarFallback>
          </Avatar>

          <span className="truncate text-pretty">{question.companyName}</span>
        </div>

        <Badge
          variant={'secondary'}
          className="capitalize"
        >
          {question.questionType}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-2 pb-3">
        <CardDescription className="text-pretty capitalize">
          {question.roleName}
        </CardDescription>

        <p className="text-pretty font-medium leading-snug	hover:cursor-pointer hover:text-primary">
          {question.question}
        </p>

        {children}
      </CardContent>

      <CardFooter
        className={cn(
          'border-t',
          'bg-secondary/30 pb-2 pt-1.5 text-sm text-muted-foreground',
          'flex flex-row flex-wrap place-content-between place-items-end gap-x-4 gap-y-1',
        )}
      >
        <span className="">
          {question.date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>

        <Button
          variant={'link'}
          className="flex h-auto flex-row place-items-center gap-1 p-0"
        >
          <span>Share</span>
          <Share1Icon className="inline-block size-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

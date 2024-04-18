import { getUniqueArray, parseDateStr } from '@/utils/helpers'
import { z } from 'zod'

//#endregion  //*======== ENUMS ===========
export const InterviewQuestionTypes = [
  `background`,
  `situational`,
  `technical`,
] as const
export const InterviewQuestionType = z.enum(InterviewQuestionTypes)
export type InterviewQuestionType = z.infer<typeof InterviewQuestionType>

export const InterviewSortTypes = [`helpful`, `recent`] as const
export const InterviewSortType = z.enum(InterviewSortTypes)
export type InterviewSortType = z.infer<typeof InterviewSortType>
export const DefaultInterviewSortType = InterviewSortType.enum.helpful
//#endregion  //*======== ENUMS ===========

//#endregion  //*======== SCHEMAS ===========
export const InterviewQuestion = z.object({
  companyName: z.string(),
  roleName: z.string(),
  questionType: z
    .string()
    .transform((t) => t.toLowerCase())
    .pipe(InterviewQuestionType),
  date: z.string().transform(parseDateStr),
  question: z.string(),
  position: z.string(),
})
export type InterviewQuestion = z.infer<typeof InterviewQuestion>

export const InterviewFilterFormSchema = z.object({
  page: z
    .number()
    .nonnegative()
    .safe()
    .min(1, {
      message: 'Query page must be least 1',
    })
    .default(1),
  sortType: InterviewSortType.default(DefaultInterviewSortType),

  questionTypes: z
    .array(InterviewQuestionType)
    .default(InterviewQuestionType.options)
    .transform(getUniqueArray),
  companies: z.array(z.string()).default([]).transform(getUniqueArray),
  positions: z.array(z.string()).default([]).transform(getUniqueArray),
})
export type InterviewFilterFormSchema = z.infer<
  typeof InterviewFilterFormSchema
>
export const DefaultFilterFormValues: InterviewFilterFormSchema =
  InterviewFilterFormSchema.parse({})
export const InterviewFilterFormSchemaKeys = InterviewFilterFormSchema.keyof()
export type InterviewFilterFormSchemaKey = z.infer<
  typeof InterviewFilterFormSchemaKeys
>

//#endregion  //*======== SCHEMAS ===========

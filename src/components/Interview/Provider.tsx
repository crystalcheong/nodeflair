import InterviewQuestions from '@/assets/interview-questions.json'
import { RenderProvider } from '@/components/Core/providers/Provider.Render'
import { CommandInput } from '@/components/Core/ui/Command'
import { Form, FormField } from '@/components/Core/ui/Form'
import {
  DefaultFilterFormValues,
  InterviewFilterFormSchema,
  InterviewFilterFormSchemaKeys,
  InterviewQuestion,
  InterviewQuestionType,
  InterviewSortType,
} from '@/types/nodeflair'
import { logger } from '@/utils/debug'
import { createSlug, getUniqueArray } from '@/utils/helpers'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ComponentProps,
  FormEvent,
  PropsWithChildren,
  createContext,
  useContext,
} from 'react'
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'

//#region  //*=========== MOCK DATA ===========
const questionTypes = InterviewQuestionType.options.map((i) => ({
  value: `${i}`,
  label: `${i}`,
}))

const InterviewSortTypeLabel: Record<InterviewSortType, string> = {
  helpful: 'Most Helpful',
  recent: 'Latest',
}

const sortTypes = Object.entries(InterviewSortTypeLabel).map(
  ([value, label]) => ({
    value,
    label,
  }),
)

const questions: InterviewQuestion[] = (InterviewQuestions ?? [])
  .filter((question) => InterviewQuestion.safeParse(question).success)
  .map((question) => InterviewQuestion.parse(question))

const positions = getUniqueArray(questions.map(({ roleName }) => roleName)).map(
  (roleName) => ({
    value: createSlug(roleName, {
      delimiter: '_',
    }),
    label: roleName,
  }),
)

const companies = getUniqueArray(
  questions.map(({ companyName }) => companyName),
).map((companyName) => ({
  value: createSlug(companyName, {
    delimiter: '_',
  }),
  label: companyName,
}))
//#endregion  //*======== MOCK DATA ===========

//#region  //*======== TYPES ===========
export const InterviewFilterFormFields = [`combobox`, `radio`] as const
export const InterviewFilterFormField = z.enum(InterviewFilterFormFields)
export type InterviewFilterFormField = z.infer<typeof InterviewFilterFormField>

export type InterviewFilterFormFieldInfo = Omit<
  ComponentProps<typeof FormField>,
  'render' | 'control' | 'name'
> & {
  name: z.infer<typeof InterviewFilterFormSchemaKeys>
  options: {
    value: string
    label: string
  }[]
  fieldType: InterviewFilterFormField
  label?: string

  searchOptions?: ComponentProps<typeof CommandInput>
}
//#endregion  //*======== TYPES ===========

//#region  //*======== CONTEXT ===========
export type InteviewContext = {
  form: UseFormReturn<typeof DefaultFilterFormValues>
  fields: InterviewFilterFormFieldInfo[]

  questions: InterviewQuestion[]

  onSubmit: () => void
}
export const InteviewContext = createContext<InteviewContext | undefined>(
  undefined,
)
// eslint-disable-next-line react-refresh/only-export-components
export const useInteviewContext = () => {
  let ctxValue = useContext(InteviewContext)
  const defaultCtxValue = useDefaultInterviewContext()
  if (ctxValue === undefined) {
    ctxValue = defaultCtxValue
  }
  return ctxValue
}

const useDefaultInterviewContext = (): InteviewContext => {
  //#endregion  //*======== STATES ===========
  const form = useForm<InterviewFilterFormSchema>({
    resolver: zodResolver(InterviewFilterFormSchema),
    defaultValues: DefaultFilterFormValues,
  })

  //#endregion  //*======== STATES ===========

  const onSubmitFilter: SubmitHandler<InterviewFilterFormSchema> = (
    values: InterviewFilterFormSchema,
  ) => {
    logger(
      { breakpoint: '[Question.Filter.tsx:95]/submit' },
      {
        values,
      },
    )

    // toast.success(
    //   <pre>
    //     {JSON.stringify({
    //       values,
    //     }, null, 2)}
    //   </pre>
    // )
  }

  const onSubmit = () => form.handleSubmit(onSubmitFilter)()

  const fields: InteviewContext['fields'] = [
    {
      fieldType: 'combobox',
      label: 'Company',
      name: 'companies',
      options: companies,
      searchOptions: {
        placeholder: 'eg. Google, Meta, Microsoft',
      },
    },
    {
      fieldType: 'combobox',
      label: 'Job Title',
      name: 'positions',
      options: positions,
      searchOptions: {
        placeholder: 'eg. Blockchain, Product Manager',
      },
    },
    {
      fieldType: 'combobox',
      label: 'Question Type',
      name: 'questionTypes',
      options: questionTypes,
      searchOptions: {
        className: 'hidden',
      },
    },

    {
      fieldType: 'radio',
      label: InterviewSortTypeLabel[form.getValues().sortType],
      name: 'sortType',
      options: sortTypes,
    },
  ]

  return {
    form,
    fields,
    onSubmit,

    questions,
  }
}
//#endregion  //*======== CONTEXT ===========

//#region  //*======== PROVIDER ===========
export type InterviewProvider = PropsWithChildren
export const InterviewProvider = ({ children }: InterviewProvider) => {
  const ctx = useDefaultInterviewContext()

  return (
    <InteviewContext.Provider value={ctx}>
      <RenderProvider>
        <Form {...ctx.form}>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault()
              ctx.form.handleSubmit(ctx.onSubmit)()
            }}
          >
            {children}
          </form>
        </Form>
      </RenderProvider>
    </InteviewContext.Provider>
  )
}
//#endregion  //*======== PROVIDER ===========

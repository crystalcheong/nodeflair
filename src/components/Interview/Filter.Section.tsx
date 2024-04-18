import { useMediaQuery } from '@/components/Core/hooks/use-media-query'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Core/ui/Accordion'
import { Badge } from '@/components/Core/ui/Badge'
import { Button } from '@/components/Core/ui/Button'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/Core/ui/Drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/Core/ui/Dropdown-Menu'
import {
  InterviewFilterCombobox,
  InterviewFilterRadio,
} from '@/components/Interview/Filter.Inputs'
import {
  InterviewFilterFormField,
  useInteviewContext,
} from '@/components/Interview/Provider'
import { InterviewFilterFormSchemaKeys } from '@/types/nodeflair'
import { cn } from '@/utils/dom'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { HTMLAttributes, useEffect } from 'react'

type InterviewFilters = HTMLAttributes<HTMLDivElement>
export const InterviewFilters = ({
  className,
  children,
  ...rest
}: InterviewFilters) => {
  const { form, onSubmit } = useInteviewContext()

  const isDesktop = useMediaQuery('(min-width: 1024px)')

  //* watch fields for onchange submission
  useEffect(() => {
    if (!isDesktop) return
    const watchSelectFields = form.watch(() => {
      onSubmit()
    })
    return () => watchSelectFields.unsubscribe()
  }, [form, isDesktop, onSubmit])

  return (
    <>
      <InterviewFilters.Drawer
        className={cn('lg:hidden', className)}
        {...rest}
      />
      <InterviewFilters.Accordion
        className={cn('hidden basis-1/5 lg:block', className)}
        {...rest}
      />
      {children}
    </>
  )
}

InterviewFilters.Combobox = InterviewFilterCombobox
InterviewFilters.Radio = InterviewFilterRadio

type InterviewFiltersDropdown = HTMLAttributes<HTMLDivElement> & {
  excludedFieldTypes?: InterviewFilterFormField[]
}
export const InterviewFiltersDropdown = ({
  excludedFieldTypes = [],
  className,
  children,
  ...rest
}: InterviewFiltersDropdown) => {
  const { form, onSubmit, fields: filters } = useInteviewContext()
  const formValues = form.getValues()

  return (
    <aside
      className={cn(
        'grid grid-cols-2 gap-2 max-[400px]:grid-cols-1',
        'flex-row flex-wrap sm:flex sm:place-items-center',
        'max-sm:*:w-full',
        className,
      )}
      {...rest}
    >
      {filters.map((filter) => {
        const isValidSchemaKey = InterviewFilterFormSchemaKeys.safeParse(
          filter.name,
        ).success
        if (!isValidSchemaKey) return

        const schemaKey = InterviewFilterFormSchemaKeys.parse(filter.name)
        const selected = formValues[schemaKey]
        const isCounterNeeded =
          filter.fieldType === 'combobox' &&
          Array.isArray(selected) &&
          !!selected.length
        const isExcludedFieldType = excludedFieldTypes.includes(
          filter.fieldType,
        )

        if (isExcludedFieldType) return null

        return (
          <DropdownMenu
            key={`filter-${filter.name}`}
            onOpenChange={(open) => {
              if (!open) form.handleSubmit(onSubmit)()
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex flex-row !place-content-start place-items-center gap-2',
                  isCounterNeeded && 'bg-muted',
                )}
              >
                <span className="truncate whitespace-nowrap text-start capitalize	">
                  {filter?.label ?? selected}
                </span>

                {isCounterNeeded && <Badge>{selected.length}</Badge>}

                <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 px-4 pb-6">
              {filter.fieldType === 'combobox' && (
                <InterviewFilters.Combobox {...filter} />
              )}
              {filter.fieldType === 'radio' && (
                <InterviewFilters.Radio {...filter} />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      })}
      {children}
    </aside>
  )
}
InterviewFilters.Dropdown = InterviewFiltersDropdown

type InterviewFiltersDrawer = HTMLAttributes<HTMLDivElement> & {
  excludedFieldTypes?: InterviewFilterFormField[]
}
const InterviewFiltersDrawer = ({
  excludedFieldTypes = [],
  className,
  children,
  ...rest
}: InterviewFiltersDrawer) => {
  const { form, onSubmit, fields: filters } = useInteviewContext()
  const formValues = form.getValues()

  return (
    <aside
      className={cn(
        'grid grid-cols-2 gap-2 max-[400px]:grid-cols-1',
        'flex-row flex-wrap sm:flex sm:place-items-center',
        'max-sm:*:w-full',
        className,
      )}
      {...rest}
    >
      {filters.map((filter) => {
        const isValidSchemaKey = InterviewFilterFormSchemaKeys.safeParse(
          filter.name,
        ).success
        if (!isValidSchemaKey) return

        const schemaKey = InterviewFilterFormSchemaKeys.parse(filter.name)
        const selected = formValues[schemaKey]
        const isCounterNeeded =
          filter.fieldType === 'combobox' &&
          Array.isArray(selected) &&
          !!selected.length
        const isExcludedFieldType = excludedFieldTypes.includes(
          filter.fieldType,
        )

        if (isExcludedFieldType) return null
        return (
          <Drawer
            key={`filter-${filter.name}`}
            onOpenChange={(open) => {
              if (!open) form.handleSubmit(onSubmit)()
            }}
          >
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex flex-row !place-content-start place-items-center gap-2',
                  isCounterNeeded && 'bg-muted',
                )}
              >
                <span className="truncate whitespace-nowrap text-start capitalize	">
                  {filter?.label ?? selected}
                </span>

                {isCounterNeeded && <Badge>{selected.length}</Badge>}

                <ChevronDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="px-4 pb-6">
              {filter.fieldType === 'combobox' && (
                <InterviewFilters.Combobox {...filter} />
              )}
              {filter.fieldType === 'radio' && (
                <InterviewFilters.Radio {...filter} />
              )}
            </DrawerContent>
          </Drawer>
        )
      })}
      {children}
    </aside>
  )
}
InterviewFilters.Drawer = InterviewFiltersDrawer

type InterviewFiltersAccordion = HTMLAttributes<HTMLDivElement>
const InterviewFiltersAccordion = ({
  children,
  ...rest
}: InterviewFiltersAccordion) => {
  const { form, fields: filters } = useInteviewContext()
  const formValues = form.getValues()

  return (
    <aside {...rest}>
      <Accordion
        type="multiple"
        defaultValue={filters.map((filter) => filter.name)}
        className="space-y-2"
      >
        {filters.map((filter) => {
          const isValidSchemaKey = InterviewFilterFormSchemaKeys.safeParse(
            filter.name,
          ).success
          if (!isValidSchemaKey) return

          const schemaKey = InterviewFilterFormSchemaKeys.parse(filter.name)
          const selected = formValues[schemaKey]
          const isCounterNeeded =
            filter.fieldType === 'combobox' &&
            Array.isArray(selected) &&
            !!selected.length

          if (filter.fieldType !== 'combobox') return null
          return (
            <AccordionItem
              key={`filter-${filter.name}`}
              value={filter.name}
              data-state="open"
              className="rounded-b rounded-t-md border p-2"
            >
              <AccordionTrigger className="py-2 font-semibold capitalize hover:no-underline">
                {filter?.label ?? selected}

                {isCounterNeeded && (
                  <Badge className="ml-auto mr-4">{selected.length}</Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <InterviewFilters.Combobox {...filter} />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>

      {children}
    </aside>
  )
}
InterviewFilters.Accordion = InterviewFiltersAccordion

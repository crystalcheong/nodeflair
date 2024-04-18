import { Checkbox } from '@/components/Core/ui/Checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/Core/ui/Command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Core/ui/Form'
import { RadioGroup, RadioGroupItem } from '@/components/Core/ui/Radio'
import { ScrollArea } from '@/components/Core/ui/ScrollArea'
import {
  InterviewFilterFormFieldInfo,
  useInteviewContext,
} from '@/components/Interview/Provider'
import { Control, FieldValues } from 'react-hook-form'

type InterviewFilterCombobox = InterviewFilterFormFieldInfo
export const InterviewFilterCombobox = ({
  options = [],
  name,
  searchOptions,
  ...fieldOptions
}: InterviewFilterCombobox) => {
  const { form } = useInteviewContext()

  if (!options.length) return null
  return (
    <FormField
      name={name}
      control={form.control as unknown as Control<FieldValues>}
      {...fieldOptions}
      render={() => (
        <FormItem>
          <Command>
            <CommandInput {...searchOptions} />
            <CommandEmpty className="py-2 capitalize text-muted-foreground">
              no results found
            </CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {options.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                  >
                    <FormField
                      name={name}
                      control={form.control as unknown as Control<FieldValues>}
                      {...fieldOptions}
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.value}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                value={item.value}
                                checked={field.value?.includes(item.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: typeof item.value) =>
                                            value !== item.value,
                                        ),
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal capitalize">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type InterviewFilterRadio = InterviewFilterFormFieldInfo
export const InterviewFilterRadio = ({
  options = [],
  name,
  ...fieldOptions
}: InterviewFilterRadio) => {
  const { form } = useInteviewContext()

  return (
    <FormField
      name={name}
      control={form.control as unknown as Control<FieldValues>}
      {...fieldOptions}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Sort by</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value as string}
              className="flex flex-col space-y-1"
            >
              {options.map((item) => (
                <FormItem
                  key={item.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={item.value} />
                  </FormControl>
                  <FormLabel className="font-normal capitalize">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

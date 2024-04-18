import { StoreClientPrefix } from '@/data/static/store'
import {
  InterviewFilterFormSchema,
  InterviewFilterFormSchemaKey,
  InterviewFilterFormSchemaKeys,
} from '@/types/nodeflair'
import { logger } from '@/utils/debug'
import { getStringifiedRecord } from '@/utils/helpers'
import { url } from '@/utils/http'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/** @deprecated  Functionality hindered by API's CORS policy, defaulted to using static data */
const Endpoint = 'https://nodeflair.com/api/v2'
const TagType = `${StoreClientPrefix}nodeflair`

const Routes: Record<string, string> = {
  Interviews: '/interviews',
}

export const NodeFlairClient = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: Endpoint }),
  reducerPath: TagType,
  tagTypes: [TagType],
  endpoints: (build) => ({
    getInterviewQuestions: build.query<unknown, InterviewFilterFormSchema>({
      query: (params: InterviewFilterFormSchema) => {
        const queryParams = {
          page: params.page,
          sort_type: params.sortType,
        }

        const request = url({
          endpoint: Endpoint,
          route: Routes.Interviews,
          queryParams: getStringifiedRecord(queryParams),
        })

        // WHY?: Re-inject repetitive search params
        const overwriteParamNameMap: Record<
          InterviewFilterFormSchemaKey,
          string
        > = {
          questionTypes: 'question_types[]',
          companies: 'company_names[]',
          positions: 'positions[]',
          page: '',
          sortType: '',
        }
        for (const [key, value] of Object.entries(overwriteParamNameMap)) {
          const schemaKey = InterviewFilterFormSchemaKeys.parse(key)

          if (Array.isArray(params[schemaKey])) {
            for (const item of params[schemaKey] as string[]) {
              request.searchParams.append(value, item)
            }
          }
        }

        logger(
          { breakpoint: '[nodeflair.api.ts:63]/getInterviewQuestions' },
          {
            queryParams,
            request,

            updatedSearchParams: Array.from(request.searchParams.entries()),
            url,
          },
        )

        return {
          url: `${request.href}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const NodeFlairEndpoints = NodeFlairClient.endpoints

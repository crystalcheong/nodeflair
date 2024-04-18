import { AppThemeMode } from '@/data/static/app'
import { StoreSlicePrefix } from '@/data/static/store'
import { createAsyncSlice } from '@/utils/store'
import { PayloadAction } from '@reduxjs/toolkit'
import { z } from 'zod'

const AppState = z.object({
  themeMode: AppThemeMode,
})
type AppState = z.infer<typeof AppState>

const DefaultAppState: AppState = {
  themeMode: AppThemeMode.enum.light,
}

export const AppSlice = createAsyncSlice({
  name: `${StoreSlicePrefix}app`,
  initialState: DefaultAppState,
  reducers: (create) => ({
    setThemeMode: create.reducer(
      (state, action: PayloadAction<AppThemeMode>) => {
        state.themeMode = action.payload
      },
    ),
  }),
  selectors: {
    state: (state) => state,
  },
})

export const AppActions = AppSlice.actions
export const AppSelectors = AppSlice.selectors

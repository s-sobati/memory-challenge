import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { getImageIdsRequestAsync } from './asyncActions'

export interface ImagesState {
  is_fetching: boolean
  data: ImagesData[]
  revealed: ImagesData[]
}

const initialState: ImagesState = {
  is_fetching: false,
  data: [],
  revealed: [],
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addRevealedId: (state, action: PayloadAction<ImagesData[]>) => {
      const { payload } = action
      state.revealed.push(...payload)
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getImageIdsRequestAsync.pending, state => {
        state.is_fetching = true
      })
      .addCase(getImageIdsRequestAsync.fulfilled, (state, action) => {
        state.is_fetching = false
        state.data = action.payload.map((item, index) => ({ id: item, uniqueId: `${item}-${index}` }))
      })
      .addCase(getImageIdsRequestAsync.rejected, state => {
        state.is_fetching = false
      })
  },
})

export const { addRevealedId } = imagesSlice.actions

export const selectData = (state: RootState): ImagesData[] => state.images.data
export const selectRevealed = (state: RootState): ImagesData[] => state.images.revealed

export default imagesSlice.reducer

export interface ImagesData {
  id: number
  uniqueId: string
}

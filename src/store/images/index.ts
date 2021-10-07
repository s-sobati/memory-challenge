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
    updateData: (state, action: PayloadAction<number[]>) => {
      const newData = action.payload.map((item, index) => ({ id: item, uniqueId: `${item}-${index}` }))
      state.data.push(...newData)
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getImageIdsRequestAsync.pending, state => {
        state.is_fetching = true
      })
      .addCase(getImageIdsRequestAsync.fulfilled, (state, action) => {
        state.is_fetching = false
      })
      .addCase(getImageIdsRequestAsync.rejected, state => {
        state.is_fetching = false
      })
  },
})

export const { addRevealedId, updateData } = imagesSlice.actions

export const selectData = (state: RootState): ImagesData[] => state.images.data
export const selectRevealed = (state: RootState): ImagesData[] => state.images.revealed

export default imagesSlice.reducer

export interface ImagesData {
  id: number
  uniqueId: string
}

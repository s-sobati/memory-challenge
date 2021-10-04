import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from '../../services/service'

export const getImageIdsRequestAsync: AsyncThunk<number[], number, any> = createAsyncThunk(
  'images/getImageIds',
  async (payload_number: number, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/v2/imageIds', payload_number)
      const body: ReadableStream<Uint8Array> | null = response.body
      if (!body) return []
      const reader = body.getReader()
      let { value }: ReadableStreamReadResult<Uint8Array> = await reader.read()
      const data = Array.from(value ?? [])

      return data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

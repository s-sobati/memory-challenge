import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit'
import { fetch } from '../../services/service'
import {updateData} from "./index";

export const getImageIdsRequestAsync: AsyncThunk<never[], number, any> = createAsyncThunk(
  'images/getImageIds',
  async (payload_number: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('/api/v2/imageIds', payload_number)
      const body: ReadableStream<Uint8Array> | null = response.body
      if (!body) return []

      const reader = body.getReader()
      let { value, done }: ReadableStreamReadResult<Uint8Array> = await reader.read()
      dispatch(updateData(Array.from(value ?? [])))
      // Note: in this case if we remove while completely, it would work perfectly since the api would serve all the data in a chunk.
      // but since we're dealing with a stream and we can't assume or predict the behavior of the api in the future,
      // I've added this part to make sure everything will be fine.
      while (!done) {
        const temp = await reader.read()
        done = temp.done
        dispatch(updateData(Array.from(temp.value ?? [])))
      }

      return [];
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// 타입 지정
interface exampleState {
  value1: number | null;
  value2: string;
}

// 초기 상태
const initialState: exampleState = {
  value1: 0,
  value2: 'initial value',
};

// 리듀서
export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    updateValue1: (state, action: PayloadAction<number>) => {
      state.value1 = action.payload; // action.payload에서 전달된 number로 value1을 업데이트
    },
    updateValue2: (state, action: PayloadAction<string>) => {
      state.value2 = action.payload; // action.payload에서 전달된 string으로 value2를 업데이트
    },
  },
});

export const { updateValue1, updateValue2 } = exampleSlice.actions;
export default exampleSlice.reducer;

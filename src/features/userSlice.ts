import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {uid:"", photoUrl:"", displayName: ""}
  },
  reducers: {
    // ログインに成功したらredux側のstateに反映させることができる
    login: (state, action) => {
      state.user = action.payload;
    },
    // ログアウトしたら情報を初期化するので全て空白に
    logout: (state) => {
      state.user = {uid:"", photoUrl:"", displayName: ""}
    },
  },
});

export const { login, logout} = userSlice.actions;
 
// ユーザーのstateを返すコード
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

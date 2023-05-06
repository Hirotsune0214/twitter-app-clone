import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER {
  displayName: string;
  photoUrl: string
}

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
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    }
  },
});

export const { login, logout, updateUserProfile} = userSlice.actions;
 
// ユーザーのstateを返すコード
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

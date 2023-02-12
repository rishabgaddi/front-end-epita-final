import { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/User';
import { createSlice } from '@reduxjs/toolkit';
import { Token } from 'types/Token';

export type AuthState = {
  user: User | null;
  token: Token | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: Token }>,
    ) => {
      state.user = user;
      state.token = token;
    },
    setUser: (state, { payload: { user } }: PayloadAction<{ user: User }>) => {
      state.user = user;
    },
    setToken: (
      state,
      { payload: { token } }: PayloadAction<{ token: Token }>,
    ) => {
      state.token = token;
    },
    getCredentials: state => {
      return state;
    },
    deleteCredentials: state => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setCredentials,
  setUser,
  setToken,
  getCredentials,
  deleteCredentials,
} = slice.actions;

export default slice.reducer;

// export const selectCurrentUser = (state: any) => state.auth.user;

import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import CardsReducer from "./Card"
import GameReducer from './Game'
import userReducer from './User'
export const store = configureStore({
  reducer: {
    cards: CardsReducer ,
    game: GameReducer, 
    user : userReducer, 
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
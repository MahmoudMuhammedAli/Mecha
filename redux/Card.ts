import { createSlice } from '@reduxjs/toolkit'
import Cards, { CardsProps } from "../api/cards"

export interface CardsState {
 allCards: CardsProps[]; 
}
const initialState : CardsState = {
  allCards: Cards
}

export const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    
  },
})

export const { } = cardSlice.actions

export default cardSlice.reducer
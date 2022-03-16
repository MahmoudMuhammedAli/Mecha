import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cards, { CardsProps } from "../api/cards"

export interface user {
 cardSet: CardsProps[]; 
 token : string;
 name: string;
 email: string;
 userID: string;
 points : number; 
}
const initialState : user = {
  cardSet: Cards , 
  token:"", 
  name:"", 
  email:"", 
  userID:"", 
  points:0,

}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  setToken : (state  , action: PayloadAction<string>) =>{
    state.token = action.payload; 
  }
  ,
  setCardSet : (state  , action: PayloadAction<CardsProps[]>) =>{
    state.cardSet = action.payload; 
  }
  },
})

export const {setToken,setCardSet } = userSlice.actions

export default userSlice.reducer
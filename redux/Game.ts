import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'
import Cards, { CardsProps } from '../api/cards'

const player2CardsPH =  [
  {id:"1" , "cardNo":"1", "cardname":"Alakazam", "type":"Psychic", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 80 , "attack": 50 ,  "no" : "065", "height" : "4ft 11", "weight": "106lbs", "entry": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000." , "flipped" : true},
  {id:"2" , "cardNo":"2", "cardname":"Blastoise", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 2", "hp" : 100, "attack": 50 ,  "no" : "009", "height" : "5ft 3", "weight": "189lbs", "entry": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.", "flipped" : true},  
  {id:"3" , "cardNo":"3", "cardname":"Chansey", "type":"Colorless", "rarity":"Star_Holo", "stage" : "Basic Pokemon", "hp" : 120 , "attack": 50 ,  "no" : "113", "height" : "3ft 7", "weight": "76lbs", "entry": "A rare and elusive Pokémon that is said to bring happiness to those who manage to catch it.", "flipped" : true},
  {id:"4" , "cardNo":"4", "cardname":"Charizard", "type":"Fire", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 120, "attack": 50 ,  "no" : "006", "height" : "5ft 7", "weight": "200lbs", "entry": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires.", "flipped" : true},
  {id:"5" , "cardNo":"5", "cardname":"Clefairy", "type":"Colorless", "rarity":"Star_Holo",  "stage" : "Basic Pokemon", "hp" : 40, "attack": 50 ,  "no" : "035", "height" : "2ft 0", "weight": "17lbs", "entry": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas.", "flipped" : true},
  {id:"6" , "cardNo":"6", "cardname":"Gyarados", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 1", "hp" : 100, "attack": 50 ,  "no" : "130", "height" : "21ft 04", "weight": "518lbs", "entry": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.", "flipped" : true},
  ]
export interface game {
  player1: player ; 
  player2: player ; 
  placeholder : CardsProps;
  turn: number;
  gameActions: boolean ; 
  socket: any ; 
  partner: any ; 
  received: any ; 
  loading: boolean ; 
  clientId : string ;
  ws: any ; 
}
export interface player{
  cardSet: CardsProps[];
  name: string;
  playCard: CardsProps;
  chosen: CardsProps[];
  points: number;
  win?: boolean;
  turn: boolean; 
  
}
//TODO: when socket is added add proper playCards for player2
const initialState : game ={
    player1: {
      name:"You",
      cardSet: Cards,
      chosen:   <CardsProps[]>[],
      playCard: <CardsProps>{},
      points: 0 , 
      turn : true
    },
   player2: {
      name:"Alex",
      cardSet: Cards,
      chosen:  player2CardsPH ,
      playCard: <CardsProps>{},
      points:0 , 
      turn : false
   },                              
   placeholder: {id:"0" , "cardNo":"0", "cardname":"", "type":"cardBack", "rarity":"",  "stage" : "", "hp" : 0 , "attack" : 10 , "no" : "", "height" : "4ft 11", "weight": "", "entry": "", "flipped": true }, 
   turn : 1 , 
   gameActions: false, 
   socket: {doesSocketNotExist:true } ,
   partner: { } ,
   received: { } ,
   loading: true , 
   clientId: "",
   ws:{}, 
} 


// const setSocketThunk = createAsyncThunk(
//   'game/connectToSocket',
//   async (token: string, {dispatch,getState}) => {
  
//     const socket = io("https://mighty-inlet-28867.herokuapp.com", {
//       query: {
//         token ,
//       },
//     })
//   }
// )

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    CreateGame: (state)=>{
      state.player1.playCard = state.placeholder;
      state.player2.playCard = state.placeholder;
      state.player1.points = 0;
      state.player2.points = 0;
    },
    changeTurn : (state)=>{
      state.player1.turn = !state.player1.turn;
      state.player2.turn = !state.player2.turn;
    },
    setLoadingFinished : (state)=>{
      state.loading = false;
    },
    setLoadingStarted : (state)=>{
      state.loading = false;
    },
    setSocket : (state, action)=>{
   
      state.socket = action.payload;
    }, 
    setPartner : (state, action)=>{
      state.partner = action.payload;
    } , 
    setReceived: (state, action)=>{
      state.received = action.payload;
    },
    setGameActions : (state)=>{
      state.gameActions = true ; 
    },
    disableGameActions : (state)=>{
      state.gameActions = false ; 
    },
    attack1 : (state ,action)=>{
      if (state.player1.playCard.hp > 0 ){

        state.player1.playCard.hp = state.player1.playCard.hp - action.payload;
      }else{ 
        state.player1.playCard = state.placeholder ; 
        state.player2.points = state.player2.points + 1 ; 
      }
    },
    attack2 : (state ,action)=>{
      if (state.player2.playCard.hp >= 0 ){
        state.player2.playCard.hp = state.player2.playCard.hp - action.payload;
      }
      else{
        state.player2.playCard = state.placeholder ; 
        state.player1.points = state.player1.points + 1 ;
        state.player1.turn = !state.player1.turn;
        state.player2.turn = !state.player2.turn; 
      }
    },
 
    destroy1 : (state) =>{
      state.player1.playCard = state.placeholder ; 
      state.player2.points = state.player2.points + 1 ; 

    },
    destroy2 : (state) =>{
      state.player1.playCard = state.placeholder ; 
      state.player2.points = state.player2.points + 1 ; 

    },
    choose1: (state, action: PayloadAction<CardsProps[]>) => {
      state.player1.chosen = action.payload
    },
    choose2: (state, action: PayloadAction<CardsProps[]>) => {
      state.player2.chosen = action.payload
    },
    pick1: (state,action: PayloadAction<CardsProps>) => {
      state.player1.playCard = action.payload
    },
    pick2: (state,action: PayloadAction<CardsProps>) => {
      state.player2.playCard = action.payload
    },
    pickName1: (state,action: PayloadAction<string>) => {
      state.player1.name = action.payload
    },
    pickName2: (state,action: PayloadAction<string>) => {
      state.player2.name = action.payload
    }, 
    flip1: (state) => { 
      state.player1.playCard.flipped = !state.player1.playCard.flipped; 
    },
    flip2: (state) => { 
      state.player2.playCard.flipped = !state.player2.playCard.flipped; 
    },
    setClientId: (state,action: PayloadAction<string>) => {
      state.clientId = action.payload;
    },
    setWS: (state,action: PayloadAction<any>) => {
      state.ws = action.payload;
    },
    points1 : (state) =>{
      state.player1.points = state.player1.points + 1;
    },
    points2 : (state) =>{
      state.player2.points = state.player2.points + 1;
    }
  },
})

export const {choose1 , setLoadingFinished , setWS , setClientId  ,  setLoadingStarted ,disableGameActions , setReceived, setPartner ,  setSocket , destroy1,destroy2 ,   pick1 , pick2 , CreateGame, changeTurn, choose2 , pickName1 , pickName2, flip1 , flip2 , attack1, attack2, setGameActions} = gameSlice.actions
export default gameSlice.reducer
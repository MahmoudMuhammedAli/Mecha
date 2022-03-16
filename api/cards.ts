export interface CardsProps{
  id: string;
  cardNo?: string;
  cardname: string;
  type: string;
  rarity: string;
  stage: string;
  hp: number;
  no:string; 
  height: string;
  weight: string;
  entry: string;
  attack : number ;
  flipped?: boolean;
}
const  Cards: CardsProps[] = [
    {id:"1" , "cardNo":"1", "cardname":"Alakazam", "type":"Psychic", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 80 ,"attack" : 10 ,  "no" : "065", "height" : "4ft 11", "weight": "106lbs", "entry": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000."  , "flipped" : true},
    {id:"2" , "cardNo":"2", "cardname":"Blastoise", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 2", "hp" : 100,"attack" : 10 ,  "no" : "009", "height" : "5ft 3", "weight": "189lbs", "entry": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles." , "flipped" : true},  
    {id:"3" , "cardNo":"3", "cardname":"Chansey", "type":"Colorless", "rarity":"Star_Holo", "stage" : "Basic Pokemon", "hp" :  120 , "attack" : 10  , "no" : "113", "height" : "3ft 7", "weight": "76lbs", "entry": "A rare and elusive Pokémon that is said to bring happiness to those who manage to catch it." , "flipped" : true},
    {id:"4" , "cardNo":"4", "cardname":"Charizard", "type":"Fire", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 120,"attack" : 10 ,  "no" : "006", "height" : "5ft 7", "weight": "200lbs", "entry": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires." , "flipped" : true},
    {id:"5" , "cardNo":"5", "cardname":"Clefairy", "type":"Colorless", "rarity":"Star_Holo",  "stage" : "Basic Pokemon", "hp" : 40, "attack" : 10 , "no" : "035", "height" : "2ft 0", "weight": "17lbs", "entry": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas." , "flipped" : true},
    {id:"6" , "cardNo":"6", "cardname":"Gyarados", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 1", "hp" : 100,"attack" : 10 ,  "no" : "130", "height" : "21ft 04", "weight": "518lbs", "entry": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage." , "flipped" : true},
    {id:"7" , "cardNo":"1", "cardname":"Alakazam", "type":"Psychic", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 80 ,"attack" : 10 ,  "no" : "065", "height" : "4ft 11", "weight": "106lbs", "entry": "Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000."  , "flipped" : true},
    {id:"8" , "cardNo":"2", "cardname":"Blastoise", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 2", "hp" : 100,"attack" : 10 ,  "no" : "009", "height" : "5ft 3", "weight": "189lbs", "entry": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles." , "flipped" : true},  
    {id:"9" , "cardNo":"3", "cardname":"Chansey", "type":"Colorless", "rarity":"Star_Holo", "stage" : "Basic Pokemon", "hp" : 120   , "attack" : 10 ,  "no" : "113", "height" : "3ft 7", "weight": "76lbs", "entry": "A rare and elusive Pokémon that is said to bring happiness to those who manage to catch it." , "flipped" : true},
    {id:"10" , "cardNo":"4", "cardname":"Charizard", "type":"Fire", "rarity":"Star_Holo",  "stage" : "Stage 2", "hp" : 120,"attack" : 10 ,  "no" : "006", "height" : "5ft 7", "weight": "200lbs", "entry": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires." , "flipped" : true},
    {id:"11" , "cardNo":"5", "cardname":"Clefairy", "type":"Colorless", "rarity":"Star_Holo",  "stage" : "Basic Pokemon", "hp" : 40, "attack" : 10 , "no" : "035", "height" : "2ft 0", "weight": "17lbs", "entry": "Its magical and cute appeal has many admirers. It is rare and found only in certain areas." , "flipped" : true},
    {id:"12" , "cardNo":"6", "cardname":"Gyarados", "type":"Water", "rarity":"Star_Holo", "stage" : "Stage 1", "hp" : 100,"attack" : 10 ,  "no" : "130", "height" : "21ft 04", "weight": "518lbs", "entry": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage." , "flipped" : true},
  ]
  
  
 export default Cards; 
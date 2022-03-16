
const getPartner = (room , socket)=>{

  let partner ; 
    if (room.player1.socketId === socket.id) {
      partner = room.player2;
      return partner;
    }else{
      partner = room.player1;
      return partner;
    }

}
export default getPartner;



//? old 
 // if (room[socket.id]) {
  //   partner = room[socket.id].player2;
  //   return partner;
  // } else {    // for (let i in room) {
    //   if (room[i].partener.id === socket.id) {
    //     partner = room[i];
    //     return partner;
    //   }
    // }
  // }
const sendMessage = (messageEvent, messagePayload, socket, partnerSocketId) => {

if (socket) {
  let partnerSocketId;
  socket.emit(messageEvent, messagePayload, partnerSocketId);
  }
}
export default sendMessage;
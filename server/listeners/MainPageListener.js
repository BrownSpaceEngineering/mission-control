export default function (socket) {
  socket.on('room', (data) => {
    socket.join(data.room);
  });
}

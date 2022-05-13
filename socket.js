
export default function socket( server ) {
    console.log('socket.js');
    const { Server } = require("socket.io");
    const io = new Server(server);
    
      io.on('connection', (socket) => {
        console.log('a user connected');
      });
    
    //   server.listen(3010, () => {
    //     console.log('listening on *:3010 ');
    //   });

}
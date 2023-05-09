const { adduser, user, getReceiver, RemoveUser } = require("./EmitterChat");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
      console.log('user disconneted')
      RemoveUser(socket.id)
    });

    socket.on("adduser", (userid) => {
      adduser(userid, socket.id)
        io.emit('getuser',user)
      });
    
    socket.on('sendMessage', ({ senderid, receiverid, text }) => {
      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getMessage', {
          senderid,
          text
        })
      }
    })
  }); 
};




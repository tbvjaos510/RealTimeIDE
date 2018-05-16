/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function (io) {
    var nameid = 0;
    var colors = [
        'gold',
        'lightskyblue',
        'palegreen',
        'salmon'
    ];

    var users = {};

    io.on("connection", function (socket) {
        console.log('[Socket.IO] : Connect ' + socket.id);
        users[socket.id] = {
            name: "user" + nameid++,
            color: colors[nameid % colors.length]
        };
        socket.user = users[socket.id].name;
        console.log(users);
        
        socket.emit('userdata', Object.values(users));
        socket.broadcast.emit('connected', users[socket.id]);
        socket.on('selection', function (data) {
            data.user = socket.user;
            socket.broadcast.emit('selection', data);
        });
        socket.on('disconnect', function (data) {
            console.log('[Socket.IO] : disConnect ' + socket.id);
            socket.broadcast.emit("exit", users[socket.id].name);
            delete users[socket.id];
        });
        socket.on('key', function (data) {
            data.user = data.user;
            socket.broadcast.emit('key', data);
        });

    });
};
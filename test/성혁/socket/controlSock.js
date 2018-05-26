
var handle = require('./handleSocket');

/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function(io) {
    handle(io.of('/main'));
    handle(io.of('/room1'));
    handle(io.of('/room2'));
    handle(io.of('/room3'));
}
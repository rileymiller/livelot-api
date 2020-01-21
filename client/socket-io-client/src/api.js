import openSocket from 'socket.io-client';

const socket = openSocket('https://livelotapi.herokuapp.com/');

function subscribeToLot(cb) {
	socket.emit('connection');
  	socket.on('Car In', lot => cb(null, lot));
  	socket.on('Car Out', lot => cb(null, lot));
}
export { subscribeToLot };
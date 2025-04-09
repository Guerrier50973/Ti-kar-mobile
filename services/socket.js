// 📁 services/socket.js
import { io } from 'socket.io-client';

const socket = io('http://192.168.1.173:3000', {
  transports: ['websocket'],
  forceNew: true,
});

export default socket;

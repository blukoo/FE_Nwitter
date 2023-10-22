import socket, { io } from "socket.io-client";
export default class Socket {
  io: any;
  socketData:any
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: cb => cb({ token: getAccessToken() })
    });
    this.io.on("connect", err => {
      console.log("socket", err);
    });
    this.io.on("connect_error", err => {
      console.log("socket error", err.message);
    });
    this.io.on("disconnect", err => {
      console.log("disconnect", err);
    });
  }
  onConnect() {
    if (!this.io.connected) {
      this.socketData = this.io.connect();
    }
  }
}

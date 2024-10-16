"use client";

import { io } from "socket.io-client";

const socket = io(
  // "https://port-0-nabi-backend-m29e62geab88e174.sel4.cloudtype.app"
  "ws://localhost:8080"
);

export default socket;

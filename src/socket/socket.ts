"use client";

import { io } from "socket.io-client";

const socket = io(
  "ws://port-0-nabi-backend-m29e62geab88e174.sel4.cloudtype.app/"
);
export default socket;

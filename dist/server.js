"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const index_1 = require("./index");
(0, node_server_1.serve)(index_1.default, (info) => {
    console.log(`Server is running on ${info.port}`);
});

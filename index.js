const http = require("http");
const cors = require("cors");
const express = require("express");
const { Server } = require("socket.io");
const { getIpWireless, getIpServer } = require("./ip.js");

const app = express();

app.use(cors());

const server = http.createServer(app);
let ipWireless = '';
let ipServer = '';
const allowedOrigins = [`http://${ipWireless}:3000`, `exp://${ipWireless}:9000`];

const io = new Server(server,{
    cors:{
        origin: `http://localhost:3000`,
        methods: ["POST"],
    },
});

getIpWireless()
    .then(ip => {
        ipWireless = ip;
    })
    .catch(err => {
        console.error(err);
    });

getIpServer()
    .then(address => {
        ipServer = address;
    })
    .catch(err => {
        console.error(err);
    });

    io.on("connection", (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
        io.emit('ipWireless', ipWireless);
        console.log(`Wireless ip: ${ipWireless}`);
        console.log(`Server ip: ${ipServer}`);
    });

server.listen(3003, () =>{
    console.log(`Server on port ${3003}`);
});
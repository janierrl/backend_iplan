const os = require("os");
const network = require("network");

function getIpWireless() {
    return new Promise((resolve, reject) => {
        network.get_private_ip((err, ip) => {
            if (err) {
                reject(err);
            } else {
                resolve(ip);
            }
        });
    });
}

function getIpServer() {
    return new Promise((resolve, reject) => {
        const interfaces = os.networkInterfaces();
        
        for (let name of Object.keys(interfaces)) {
            for (let iface of interfaces[name]) {
                if (iface.family === "IPv4" && !iface.internal) {
                    resolve(iface.address);
                }
            }
        }
        
        reject("No se pudo encontrar la dirección IP del servidor.");
    });
}

module.exports = {
    getIpWireless,
    getIpServer
}
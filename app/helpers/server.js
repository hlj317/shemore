const Koa = require("koa");
const fs = require("fs");
const https = require("https");

class Server extends Koa {
    constructor() {
        super();
    }

    /**
     * 开启https服务
     *
     * @public
     * @param {String} key https key路径
     * @param {String} cert https cert路径
     * @returns {Promise<void>}
     */
    async ssl (key, cert) {
        await https.createServer({
            key: fs.readFileSync(key),
            cert: fs.readFileSync(cert),
        }, this.callback()).listen(443);
    }

    async startup (router, port = 81) {
        if (port <= 0 || isNaN(port)) {
            throw new Error("服务端口必须 >= 0 且 <= 65535");
        }

        this.use(router.routes())
            .use(router.allowedMethods());

        this.listen(port);
    }

}


module.exports = Server;
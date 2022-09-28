import http from "http";

class Server {
  constructor() {
    console.log("Init server...");
  }

  init() {
    const server = http.createServer(
      (req, res) => this.requester(req, res)
    );

    return server;
  }

  requester(req, res) {
  }
}

export { Server };

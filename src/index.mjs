import { app } from "./server.mjs"

app.server.listen(app.port, app.hostname, () => {
  console.log("Server running on port:", app.port);
});

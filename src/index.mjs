import { app } from "./server.mjs"

console.log("ENVIRONMENT:", app.env);

app.server.listen(app.port, app.hostname, () => {
  console.log("Server running on port:", app.port);
});

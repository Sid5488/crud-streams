import { Application } from "./application.mjs"

const app = new Application();

app.configuration(3333, 
  '127.0.0.1', 
  "Server running on port: 3333");

console.log("ENVIRONMENT:", app.env);

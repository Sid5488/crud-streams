import { readFileSync } from "fs";

class ConnectionDatasource {
  connection(file) {
    const data = JSON.parse(readFileSync(file, { encoding: "utf-8", flag: "r" }));

    return data;
  }
}

export { ConnectionDatasource };

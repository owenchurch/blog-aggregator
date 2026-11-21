import { setUser, readConfig } from "./config";

function main() {
  setUser("owen");
  const config = readConfig();
  console.log(config);
}

main();

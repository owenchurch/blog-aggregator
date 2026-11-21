import fs from "fs";
import os from "os";
import path from "path";

type Config = {
  dbUrl: string;
  currentUserName?: string;
};

export function setUser(name: string) {
  const config = readConfig();
  config.currentUserName = name;
  writeConfig(config);
}

export function readConfig() {
  const text = fs.readFileSync(getConfigFilePath(), { encoding: "utf-8" });
  const raw = JSON.parse(text);
  return validateConfig(raw);
}

function getConfigFilePath(): string {
  const home: string = os.homedir();
  return path.join(home, ".gatorconfig.json");
}

function writeConfig(config: Config): void {
  const raw = {
    db_url: config.dbUrl,
    current_user_name: config.currentUserName,
  };

  const data = JSON.stringify(raw, null, 2);

  fs.writeFileSync(getConfigFilePath(), data, { encoding: "utf-8" });
}

function validateConfig(raw: any): Config {
  if (!raw.db_url || typeof raw.db_url !== "string") {
    throw new Error("db_url required");
  }

  return {
    dbUrl: raw.db_url,
    currentUserName: raw.current_user_name,
  };
}

import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

import { promptsQuestions } from "./prompts.js";
import { copy } from "./utils.js";

import { kSetAvailableTemplates, kObjectSpawnSyncOptions } from "./config.js";

const kPathToTemplates = fileURLToPath(
  new URL(path.join("..", "templates"), import.meta.url)
);

// eslint-disable-next-line sonarjs/cognitive-complexity
export async function init(options) {
  const {
    templateName = options.templateName,
    projectName = options.projectName,
    linter = options.linter,
    confirmContinue,
    clearDirectory,
    cancelled,
    cliCommand,
  } = await promptsQuestions(options, kSetAvailableTemplates);

  if (cancelled === true) return;
  if (confirmContinue === false) return;

  if (clearDirectory === true) {
    for (const file of fs.readdirSync(process.cwd())) {
      fs.rmSync(file, { recursive: true });
    }
    console.log("Directory cleared");
  }

  const foundTemplate = [...kSetAvailableTemplates].find(
    (t) => t.directoryName === templateName
  );

  const kPathToFoundTemplate = path.join(
    kPathToTemplates,
    foundTemplate.directoryName
  );

  copy(kPathToFoundTemplate, process.cwd(), linter);

  if (foundTemplate.node === true) {
    const kPathToPackageJSON = path.join(process.cwd(), "package.json");
    const packageJSON = JSON.parse(fs.readFileSync(kPathToPackageJSON, "utf8"));

    packageJSON.name = projectName;

    if (linter === true)
      packageJSON.engines = { node: `>=${process.versions.node}` };

    if (cliCommand) packageJSON.bin = { [cliCommand]: "bin/index.js" };

    fs.writeFileSync(
      kPathToPackageJSON,
      JSON.stringify(packageJSON, undefined, 2)
    );

    if (linter && foundTemplate.linterDependencies) {
      spawnSync(
        "npm",
        ["install", "--save-dev", ...foundTemplate.linterDependencies],
        kObjectSpawnSyncOptions
      );
    }

    if (foundTemplate.dependencies) {
      spawnSync(
        "npm",
        ["install", "--save", ...foundTemplate.dependencies],
        kObjectSpawnSyncOptions
      );
    }

    if (foundTemplate.devDependencies) {
      spawnSync(
        "npm",
        ["install", "--save-dev", ...foundTemplate.devDependencies],
        kObjectSpawnSyncOptions
      );
    }
  }
  spawnSync("git", ["init"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}

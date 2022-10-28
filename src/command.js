import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

import { promptsQuestions } from "./prompts.js";
import { copy } from "./utils.js";

const TEMPLATES_PATH = path.join(
  fileURLToPath(import.meta.url),
  "..",
  "..",
  "templates"
);

export async function init(projectName, templateName) {
  try {
    const { name = projectName, template = templateName } =
      await promptsQuestions(projectName, templateName);

    if (!name) {
      throw new Error("Project name is required");
    }

    if (!template) {
      throw new Error("Template is required");
    }

    const TEMPLATE_PATH = path.join(TEMPLATES_PATH, template);
    copy(TEMPLATE_PATH, process.cwd());

    const PACKAGE_PATH = path.join(process.cwd(), "package.json");
    const packageJSON = JSON.parse(fs.readFileSync(PACKAGE_PATH, "utf8"));

    packageJSON.name = name;

    fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJSON, undefined, 2));

    spawnSync("git", ["init"], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

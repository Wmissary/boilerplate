#!/usr/bin/env node
import sade from "sade";
import { init } from "../src/command.js";

const prog = sade("boilerplate");

const PROJECT_NAME_OPTION = "project-name";

prog.version("0.0.1");

prog
  .command("init")
  .option("--project-name, -n", "Select project name")
  .option("--template, -t", "Select template")
  .option("--linter, -l", "Install template linter")
  .action((options) => {
    if (typeof options[PROJECT_NAME_OPTION] === "boolean") {
      options[PROJECT_NAME_OPTION] = undefined;
    }
    if (typeof options.template === "boolean") {
      options.template = undefined;
    }

    init({
      templateName: options.template,
      projectName: options[PROJECT_NAME_OPTION],
      linter: options.linter,
    });
  });

prog.parse(process.argv);

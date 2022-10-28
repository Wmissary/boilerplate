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
  .action((options) => {
    if (typeof options[PROJECT_NAME_OPTION] === "boolean") {
      options[PROJECT_NAME_OPTION] = undefined;
    }
    if (typeof options.template === "boolean") {
      options.template = undefined;
    }

    init(options[PROJECT_NAME_OPTION], options.template);
  });

prog.parse(process.argv);

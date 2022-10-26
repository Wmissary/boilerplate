#!/usr/bin/env node
import sade from "sade";
import { init } from "../src/command.js";

const prog = sade("boilerplate");

prog.version("0.0.1");

prog
  .command("init")
  .option("--project-name, -n", "Change the name of the project")
  .action((options) => {
    if (typeof options["project-name"] === "boolean") {
      options["project-name"] = undefined;
    }
    if (typeof options.template === "boolean") {
      options.template = undefined;
    }
    init(options["project-name"], options.template);
  });

prog.parse(process.argv);

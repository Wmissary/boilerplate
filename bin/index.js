#!/usr/bin/env node
import sade from "sade";

const prog = sade("boilerplate");

prog.version("0.0.1");

prog
  .command("init")
  .option("--project-name, -n", "Change the name of the project")
  .action((options) => {
    console.log(options);
  });

prog.parse(process.argv);

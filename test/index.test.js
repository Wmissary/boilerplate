// eslint-disable-next-line import/no-unresolved
import test from "node:test";
import assert from "node:assert";
import { spawnSync } from "node:child_process";

const CMD = "boilerplate";
const ARG = "init";
const PROJECT_NAME_ARG = "--project-name";
const PROJECT_NAME = "test-project";
const INVALID_PROJECT_NAME = "TBD";
const TEMPLATE_ARG = "--template";
const TEMPLATE_NAME = "node-vanilla";
const INVALID_TEMPLATE = "unknown";

test("Should prompts for the project name if none supplied", () => {
  const { stdout } = spawnSync(CMD, [ARG], {
    encoding: "utf8",
    shell: true,
  });

  assert.strictEqual(stdout.trim().includes("Project name:"), true);
});

test("Should prompts for the project name if only --project-name is supplied", () => {
  const { stdout } = spawnSync(CMD, [ARG, PROJECT_NAME_ARG], {
    encoding: "utf8",
    shell: true,
  });
  assert.strictEqual(stdout.trim().includes("Project name:"), true);
});

test("Should prompts for the project name if --project-name is invalid", () => {
  const { stdout } = spawnSync(
    CMD,
    [ARG, PROJECT_NAME_ARG, INVALID_PROJECT_NAME],
    {
      encoding: "utf8",
      shell: true,
    }
  );
  assert.strictEqual(
    stdout
      .trim()
      .includes(`"${INVALID_PROJECT_NAME}" is invalid. Project name:`),
    true
  );
});

test("Should prompts for the template if none supplied", () => {
  const { stdout } = spawnSync(CMD, [ARG, PROJECT_NAME_ARG, PROJECT_NAME], {
    encoding: "utf8",
    shell: true,
  });

  assert.strictEqual(stdout.trim().includes("Template:"), true);
});

test("Should prompts for the template if only --template is supplied", () => {
  const { stdout } = spawnSync(
    CMD,
    [ARG, PROJECT_NAME_ARG, PROJECT_NAME, TEMPLATE_ARG],
    {
      encoding: "utf8",
      shell: true,
    }
  );

  assert.strictEqual(stdout.trim().includes("Template:"), true);
});

test("Should prompts for the template if --template is invalid", () => {
  const { stdout } = spawnSync(
    CMD,
    [ARG, PROJECT_NAME_ARG, PROJECT_NAME, TEMPLATE_ARG, INVALID_TEMPLATE],
    {
      encoding: "utf8",
      shell: true,
    }
  );
  assert.strictEqual(
    stdout.trim().includes(`"${INVALID_TEMPLATE}" is invalid. Template:`),
    true
  );
});

test("Should prompts for the linter if --linter is not supply", () => {
  const { stdout } = spawnSync(
    CMD,
    [ARG, PROJECT_NAME_ARG, PROJECT_NAME, TEMPLATE_ARG, TEMPLATE_NAME],
    {
      encoding: "utf8",
      shell: true,
    }
  );

  assert.strictEqual(
    stdout.trim().includes(`Add linter to ${TEMPLATE_NAME}?`),
    true
  );
});

test("Should prompts for the cli command", () => {
  const { stdout } = spawnSync(
    CMD,
    [ARG, PROJECT_NAME_ARG, PROJECT_NAME, TEMPLATE_ARG, "node-cli", "--linter"],
    {
      encoding: "utf8",
      shell: true,
    }
  );
  assert.strictEqual(stdout.trim().includes("CLI command:"), true);
});

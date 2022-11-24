const kSetAvailableTemplates = new Set([
  {
    name: "Node Vanilla",
    directoryName: "node-vanilla",
    description: "A Node.js project",
    node: true,
    linterDependencies: new Set([
      "eslint",
      "eslint-plugin-n",
      "eslint-plugin-sonarjs",
      "eslint-plugin-unicorn",
      "eslint-plugin-import",
      "eslint-plugin-promise",
    ]),
  },
  {
    name: "Node CLI",
    directoryName: "node-cli",
    description: "A Node.js CLI project",
    node: true,
    linterDependencies: new Set([
      "eslint",
      "eslint-plugin-n",
      "eslint-plugin-sonarjs",
      "eslint-plugin-unicorn",
      "eslint-plugin-import",
      "eslint-plugin-promise",
    ]),
    dependencies: new Set(["sade"]),
  },
  {
    name: "HTML vanilla",
    directoryName: "html-vanilla",
    description: "A simple HTML project",
    node: false,
  },
]);

const kObjectSpawnSyncOptions = {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: true,
};

export { kSetAvailableTemplates, kObjectSpawnSyncOptions };

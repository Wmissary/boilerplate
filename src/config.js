export const AVAILABLE_TEMPLATES = new Set([
  {
    name: "Node Vanilla",
    templateDirectoryName: "node-vanilla",
    description: "A Node.js project",
    templateLinter: new Set([
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
    templateDirectoryName: "node-cli",
    description: "A Node.js CLI project",
    templateLinter: new Set([
      "eslint",
      "eslint-plugin-n",
      "eslint-plugin-sonarjs",
      "eslint-plugin-unicorn",
      "eslint-plugin-import",
      "eslint-plugin-promise",
    ]),
  },
  {
    name: "HTML vanilla",
    templateDirectoryName: "html-vanilla",
    description: "A simple HTML project",
    templateLinter: new Set(),
  },
]);

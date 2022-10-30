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
]);

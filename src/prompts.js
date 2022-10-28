import prompts from "prompts";

import { isValidProjectName, directoryIsEmpty } from "./utils.js";

const AVAILABLE_TEMPLATES = [
  {
    title: "Node vanilla",
    description: "A vanilla Node.js project",
    value: "node-vanilla",
  },
  {
    title: "Node CLI",
    description: "A Node.js CLI project",
    value: "node-cli",
  },
];

export const promptsQuestions = async (projectName, templateName) => {
  const questions = [
    {
      type: projectName ? undefined : "text",
      name: "name",
      message: "Project name:",
      validate: (value) => {
        return isValidProjectName(value) || `${value} is invalid`;
      },
    },
    {
      type: () => {
        if (projectName && !isValidProjectName(projectName)) {
          return "text";
        }
      },
      name: "name",
      message: `"${projectName}" is invalid. Project name:`,
      validate: (value) => {
        return isValidProjectName(value) || `${value} is invalid`;
      },
    },
    {
      type: templateName ? undefined : "select",
      name: "template",
      message: "Template:",
      choices: AVAILABLE_TEMPLATES,
    },
    {
      type: () => {
        if (
          templateName &&
          !AVAILABLE_TEMPLATES.some(
            (template) => template.value === templateName
          )
        ) {
          return "select";
        }
      },
      name: "template",
      message: `"${templateName}" is invalid. Template:`,
      choices: AVAILABLE_TEMPLATES,
    },
    {
      type: directoryIsEmpty(process.cwd()) ? undefined : "confirm",
      name: "confirm",
      message: "Current directory is not empty. Continue?",
    },
    {
      type: (previous) => (previous ? "confirm" : undefined),
      name: "confirmCleanDirectory",
      message: "Current directory is not empty. Empty it?",
    },
  ];

  return await prompts(questions);
};

import prompts from "prompts";

import { isValidProjectName, directoryIsEmpty } from "./utils.js";
import { AVAILABLE_TEMPLATES } from "./config.js";

const templates = new Set([]);

for (const template of AVAILABLE_TEMPLATES) {
  templates.add({
    title: template.name,
    description: template.description,
    value: template.templateDirectoryName,
  });
}

const onCancel = (prompt, answers) => {
  answers.cancelled = true;
  return false;
};

export const promptsQuestions = async (projectName, templateName, linter) => {
  const questions = [
    ...projectNameQuestions(projectName),
    ...templateSelectionQuestions(templateName),
    ...cliQuestions(),
    ...templateLinterQuestions(linter, templateName),
    ...directoryIsNotEmptyQuestions(),
  ];

  return await prompts(questions, { onCancel });
};

const projectNameQuestions = (projectName) => {
  return [
    {
      type: projectName ? undefined : "text",
      name: "name",
      message: "Project name:",
      validate: (value) => isValidProjectName(value) || `${value} is invalid`,
    },
    {
      type:
        projectName && !isValidProjectName(projectName) ? "text" : undefined,
      name: "name",
      message: `"${projectName}" is invalid. Project name:`,
      validate: (value) => isValidProjectName(value) || `${value} is invalid`,
    },
  ];
};

const templateSelectionQuestions = (templateName) => {
  return [
    {
      type: templateName ? undefined : "select",
      name: "template",
      message: "Template:",
      choices: [...templates],
    },
    {
      type:
        templateName &&
        ![...templates].some((template) => template.value === templateName)
          ? "select"
          : undefined,
      name: "template",
      message: `"${templateName}" is invalid. Template:`,
      choices: [...templates],
    },
  ];
};

const templateLinterQuestions = (templateLinter, templateName) => {
  return [
    {
      type: templateLinter ? undefined : "confirm",
      name: "linter",
      message: (previous, values) =>
        `Add linter to ${values.template ?? templateName}?`,
    },
  ];
};

const directoryIsNotEmptyQuestions = () => {
  return [
    {
      type: directoryIsEmpty(process.cwd()) ? undefined : "confirm",
      name: "confirm",
      message: "Current directory is not empty. Continue?",
    },
    {
      type: (previous, values) =>
        values.confirm === true ? "confirm" : undefined,
      name: "confirmCleanDirectory",
      message: "Current directory is not empty. Empty it?",
    },
  ];
};

const cliQuestions = () => {
  // TODO: Validate command
  return [
    {
      type: (previous, values) =>
        values.template === "node-cli" ? "text" : undefined,
      name: "command",
      message: "CLI command:",
    },
  ];
};

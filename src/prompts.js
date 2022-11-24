import prompts from "prompts";
import { isDirectoryEmpty, isValidProjectName } from "./utils.js";

const onCancel = (prompt, answers) => {
  answers.cancelled = true;
  return false;
};

export async function promptsQuestions(cliOptions, templates) {
  const { templateName, projectName, linter } = cliOptions;
  const questions = [
    ...templateQuestions(templateName, templates),
    ...projectNameQuestions(projectName, templateName, templates),
    ...linterQuestions(linter, templateName, templates),
    ...clearDirectoryQuestions(),
    ...cliQuestions(),
  ];
  return await prompts(questions, { onCancel });
}

function templateQuestions(templateName, templates) {
  const choices = [...templates].map((template) => ({
    title: template.name,
    value: template.directoryName,
    description: template.description,
  }));
  return [
    {
      type:
        templateName &&
        [...templates].some(
          (template) =>
            template.directoryName.toLowerCase() === templateName.toLowerCase()
        )
          ? undefined
          : "select",
      name: "templateName",
      message: "Template:",
      choices,
    },
  ];
}

function projectNameQuestions(projectName, templateName, templates) {
  return [
    {
      type: (_previous, values) => {
        const template = [...templates].find(
          (template) =>
            template.directoryName?.toLowerCase() ===
            (templateName?.toLowerCase() ?? values.templateName?.toLowerCase())
        );
        return (projectName && isValidProjectName(projectName)) ||
          template.node === false
          ? undefined
          : "text";
      },
      name: "projectName",
      message: "Project name:",
      validate: (value) => isValidProjectName(value) || `${value} is invalid`,
    },
  ];
}

function linterQuestions(linter, templateName, templates) {
  return [
    {
      type: (_previous, values) => {
        const template = [...templates].find(
          (template) =>
            template.directoryName?.toLowerCase() ===
            (templateName?.toLowerCase() ?? values.templateName?.toLowerCase())
        );
        if (template.node === false || linter) return;
        return template.node === true && template.linterDependencies.size > 0
          ? "confirm"
          : undefined;
      },
      name: "linter",
      message: "Linter:",
    },
  ];
}

function clearDirectoryQuestions() {
  return [
    {
      type: isDirectoryEmpty(process.cwd()) ? undefined : "confirm",
      name: "confirmContinue",
      message: "Directory is not empty. Continue?",
    },
    {
      type: (_previous, values) =>
        isDirectoryEmpty(process.cwd()) ||
        (!isDirectoryEmpty(process.cwd()) && values.confirmContinue === false)
          ? undefined
          : "confirm",
      name: "clearDirectory",
      message: "Clear directory?",
    },
  ];
}

function cliQuestions() {
  return [
    {
      type: (_previous, values) =>
        values.templateName === "node-cli" ? "text" : undefined,
      name: "cliCommand",
      message: "Enter your command to run the CLI",
    },
  ];
}

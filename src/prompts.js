import prompts from "prompts";

import { isValidProjectName } from "./utils.js";

const AVAILABLE_TEMPLATES = ["node", "node cli"];

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
        console.log(templateName);
        if (templateName && !AVAILABLE_TEMPLATES.includes(templateName)) {
          return "select";
        }
      },
      name: "template",
      message: `"${templateName}" is invalid. Template:`,
      choices: AVAILABLE_TEMPLATES,
    },
  ];

  return await prompts(questions);
};

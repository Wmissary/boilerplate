import prompts from "prompts";

const isValidProjectName = (projectName) => {
  return /^(?:@[\d*a-z~-][\d*._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/.test(
    projectName
  );
};

export const init = async (projectName, templateName) => {
  const questions = [
    {
      type: projectName ? undefined : "text",
      name: "projectName",
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
      name: "projectName",
      message: `"${projectName}" is invalid. Project name:`,
      validate: (value) => {
        return isValidProjectName(value) || `${value} is invalid`;
      },
    },
    {
      type: templateName ? undefined : "select",
      name: "templateName",
      message: "Template:",
      choices: ["CLI", "Vanilla"],
    },
    {
      type: () => {
        if (templateName && !["CLI", "Vanilla"].includes(templateName)) {
          return "select";
        }
      },
      name: "templateName",
      message: `"${templateName}" is invalid. Template:`,
      choices: ["CLI", "Vanilla"],
    },
  ];

  const answer = await prompts(questions);
};
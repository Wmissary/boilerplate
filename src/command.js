import { promptsQuestions } from "./prompts.js";

export const init = async (projectName, templateName) => {
  const { name = projectName, template = templateName } =
    await promptsQuestions(projectName, templateName);

  console.log(name, template);
};

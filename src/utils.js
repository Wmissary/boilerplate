export const isValidProjectName = (projectName) => {
  return /^(?:@[\d*a-z~-][\d*._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/.test(
    projectName
  );
};

import fs from "node:fs";
import path from "node:path";

function isValidProjectName(projectName) {
  return /^(?:@[\d*a-z~-][\d*._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/.test(
    projectName
  );
}

function copy(source, destination, linter) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    copyDirectory(source, destination, linter);
  } else {
    if (path.basename(source) === ".eslintrc.json" && linter === false) {
      return;
    }
    fs.copyFileSync(source, destination);
  }
}

function copyDirectory(sourceDirectory, destinationDirectory, linter) {
  fs.mkdirSync(destinationDirectory, { recursive: true });
  for (const file of fs.readdirSync(sourceDirectory)) {
    const sourceFile = path.join(sourceDirectory, file);
    const destinationFile = path.join(destinationDirectory, file);
    copy(sourceFile, destinationFile, linter);
  }
}

function isDirectoryEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

export { copy, isValidProjectName, isDirectoryEmpty };

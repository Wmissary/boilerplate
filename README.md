# Boilerplate

:construction: **Work in progress** :construction:

> **Compatibility Note:**
> Requires [Node.js](https://nodejs.org/) 18.9.1 or newer.

## **Installation**

Clone the repo and run :

```bash
npm link
```

## **Start Your Project**

Run:

```bash
boilerplate init
```

Then follow the prompts!

## **Usage**

```bash
boilerplate init [--options] 
```

> If you don't specify any options, the CLI will prompt you for the required information.

| Options | Alias | Description | Example |
| ----------- | ----------- | ----------- | ----------- |
| --name | -n | Specify the project name | `boilerplate init --name my-project` |
| --template | -t | Specify the template name | `boilerplate init --template node-vanilla` |
| --linter | -l | Add linter to the project | `boilerplate init --linter` |
| --help | -h | Show help | `boilerplate init --help` |

## **Templates**

### **node-vanilla**

A vanilla Node.js project template.

Linter & plugins:  

- [eslint](https://eslint.org/)
- [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-neslint-plugin-n)
- [eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs/)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn/)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import/)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise/)

### **node-cli**

A Node.js CLI project template.

Linter & plugins:  

- [eslint](https://eslint.org/)
- [eslint-plugin-n](https://www.npmjs.com/package/eslint-plugin-neslint-plugin-n)
- [eslint-plugin-sonarjs](https://www.npmjs.com/package/eslint-plugin-sonarjs/)
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn/)
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import/)
- [eslint-plugin-promise](https://www.npmjs.com/package/eslint-plugin-promise/)

### **html-vanilla**

A simple HTML project template.

Linter & plugins: None

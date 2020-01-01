## Versions
Node 12.13.0

## Production

1. `npm install` to install dependencies
2. `npm run build` to create a production bundle
3. Go to chrome://extension in Chrome
4. Turn on Developer mode and hit load unpacked
5. Choose the build folder

## Development

1. `npm run watch` will watch when files change and will automatically refresh the chrome extension when changes are detected

## Programming style

- Please use [Prettier](https://prettier.io/) when you can to keep things consistent.
- We use underscores for variable names (snake case) and functions vs camelCase.
- Always conform to the style of the file
- "Maintainable code is more important than clever code" - Guido van Rossum 

## Visual Studio Code

- These are useful extensions
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [TabNine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)

##Normalizing JSON files for Mac
- Run mac_normalize.py in terminal, entering in file path for a directory containing JSON files for windows shortcuts
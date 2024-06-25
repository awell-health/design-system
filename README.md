# Awell Design System
This is base compoennets sets used to build Awell products

## Documentation
https://awell-health.github.io/

## Development
To run project locally there are two options

#### With one command
`yarn dev` - command will run storybook and tailwind in paralllel

#### With separate commands
`yarn storybook` - to run storybook app
`yarn tailwind` - to watch and generate styles changes


## Deployment
Use yarn to set projects version:
`yarn version patch` 

by default, if you introduce bigger or breaking changes use `minor` or `major` param.

#### Pull Request
Once PR is merged two actions wil be triggered:
* NPM Release
* Build Storybook

#### Projects
Use `@awell-health/design-system` to include in your project. Attach `style.css` file from `dist` in your frontend app
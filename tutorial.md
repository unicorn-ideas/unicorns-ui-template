# Unicorns UI

## Tutorial

> Note: npm installation scripts are purposely verbose in this tutorial (beginner-friendly).
> They can be shorted to `npm i -S package` (save) or `npm i -D package` (save-dev).

### Package

Create an npm package by adding a `package.json` file. Try the `npm` CLI:

```bash
npm init
```

Drop in [prettier][prettier] - an opinionated code formatter for consistency.

```bash
curl -L https://raw.githubusercontent.com/cbillowes/prettier/main/install.sh | bash
```

```bash
npm install --save-dev prettier
```

Choose a [license](choosealicense.com) and add it to your `LICENSE` in your repo.

[.gitignore](.gitignore): hides things from Git so that it is only available to you.
It works well to ignore things like personal settings, auto-generated content,
sensitive data like auth keys & environment settings etc, and large files that can be shared some place else.

```bash
echo "/node_modules\n/build" >> .gitignore
```

```bash
mkdir -p src/components/Button
echo "import React from 'react';\n\nexport default ({ onClick, children }) => <button onClick={onClick}>{children}</button>" >> src/components/Button/index.js
echo "export { default as Button } from './components/Button';" >> src/index.js
```

### Babel

Install [Babel][babel] using **Webpack** instructions.
Babel is a JavaScript compiler so modern code can be understood by browsers.

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
```

```bash
cat <<EOT > babel.config.json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
EOT
```

### Webpack

```bash
npm install --save-dev webpack@latest webpack-cli@latest
```

```bash
npm install --save-dev clean-webpack-plugin license-webpack-plugin terser-webpack-plugin mini-css-extract-plugin
```

```bash
# https://github.com/unicorn-ideas/unicorns-ui-template/blob/main/webpack.config.js
touch webpack.config.js
```

```javascript
// https://github.com/unicorn-ideas/unicorns-ui-template/blob/main/package.json
{
   ...
   "main": "build/index.js",
   ...
}
```

### Dependencies

#### React

Install [React](react) & [React-DOM](react-dom). They will be dev dependencies and explicitly defined peer dependencies.
We don't want our component library to have a dependency on React.
The app itself decides what React to use albeit it be restricted to requirements from this library.

```bash
npm install --save-dev react react-dom
```

Add React & React DOM peer dependencies to tell the `package.json` to tell clients to satisfy that version.

```javascript
{
   ...,
   "peerDependencies": {
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
   },
   ...
}
```

#### Storybook

Add [storybook][storybook] - tool for building UI components and pages in isolation.
We will use `@next` as it is the next major release of Storybook which is compatible with the versions of React used in this tutorial.

```bash
npx sb@next init # equates to >= ^6.5.0-alpha.64
```

```bash
npm run storybook # from the root of the project
# http://localhost:6006/ + CTL+C to stop from terminal
```

```bash
rm -rf src/stories
```

```bash
cat <<EOT > src/components/Button/index.stories.js
import React from 'react';
import Component from './index';

export default {
  title: 'Components',
  component: Component,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Sut = ({ onClick, children, ...args }) => (
  <Component onClick={onClick} {...args}>
    {children}
  </Component>
);

export const Button = () => (
  <Sut onClick={() => console.log('42')}>Hello World</Sut>
);

EOT
```

> Port in use? `netstat -vanp tcp | grep "*."`

#### Tailwind

```bash
npm install --save-dev tailwindcss@latest postcss@latest autoprefixer@latest postcss-loader@latest
npx tailwindcss init -p
```

Edit `tailwind.config.js` to add the following:

```javascript
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```bash
cat <<EOT > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOT
---

[prettier]: https://prettier.io/
[choosealicense.com]: https://choosealicense.com/
[.gitignore]: https://www.toptal.com/developers/gitignore
[babel]: https://babeljs.io/
[react]: https://reactjs.org/tutorial/tutorial.html
[react-dom]: https://reactjs.org/docs/react-dom.html
[storybook]: https://storybook.js.org/
```

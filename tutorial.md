# Unicorns UI

## Tutorial

> Note: npm installation scripts are purposely verbose in this tutorial (beginner-friendly).
> They can be shorted to `npm i -S package` (save) or `npm i -D package` (save-dev).

### Package

Create an npm package by adding a `package.json` file. Try the `npm` CLI:

```bash
npm init
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
cat <<EOT >> babel.config.json
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

---

[choosealicense.com]: https://choosealicense.com/
[.gitignore]: https://www.toptal.com/developers/gitignore
[babel]: https://babeljs.io/

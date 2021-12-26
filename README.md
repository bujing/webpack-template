# Webpack Template

## Webpack

- [webpack](https://github.com/webpack/webpack) 静态模块打包工具，用于编译 `js` 模块，可通过 [webpack cli](https://webpack.js.org/api/cli/) 或 [node api](https://webpack.js.org/api/node/) 与之配合交互
- [webpack-cli](https://github.com/webpack/webpack-cli) 用于在命令行中运行 `webpack` 的工具
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 基于 `webpack`，提供实时编译的能力，仅用于开发模式
- [webpack-manifest-plugin](https://github.com/shellscape/webpack-manifest-plugin) 生成 `manifest` 文件的插件
- [webpack-merge](https://github.com/survivejs/webpack-merge) 合并 `webpack` 配置

## Babel

- [babel-loader](https://github.com/babel/babel-loader) `babel` 转译加载器
- [@babel/core](https://github.com/babel/babel) `babel` 转译核心，使用 `browserslist` 配置目标环境，可以限定需要转译的代码范围
- [@babel/preset-env](https://github.com/babel/babel) 转译新的 `js` 语法，例如箭头函数、解构赋值
- [@babel/plugin-transform-runtime](https://github.com/babel/babel) 重用 `babel` 注入的辅助代码以节省代码大小，`corejs: 2` 支持全局变量（如 `Promise`）和静态属性（如 `Number.isInteger`），`corejs: 3` 增加实例属性（如 `[].includes`）的支持

## Sass

- [style-loader](https://github.com/webpack-contrib/style-loader) 把 `css` 注入 `dom`，更推荐的方式是把 `css` 提取到单独的文件中
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 把 `css` 提取到单独的文件中
- [css-loader](https://github.com/webpack-contrib/css-loader) 解析引入的 `css` 文件，把 `css` 转化为 `CommonJS` 模块
- [postcss-loader](https://github.com/webpack-contrib/postcss-loader) 使用 `postcss` 处理 `css`
- [postcss](https://github.com/postcss/postcss) 允许使用 `js` 插件转换 `css` 的工具
- [postcss-preset-env](https://github.com/csstools/postcss-plugins) 根据 `browserslist` 指定的目标环境，对 `css` 进行兼容转换，包含添加浏览器前缀
- [sass-loader](https://github.com/webpack-contrib/sass-loader) 把 `sass` 编译成 `css`
- [sass](https://github.com/sass/dart-sass) `sass` 的 `dart` 实现

## TypeScript

- [typescript](https://github.com/Microsoft/TypeScript)
- [@babel/preset-typescript](https://github.com/babel/babel)
- [fork-ts-checker-webpack-plugin](https://github.com/TypeStrong/fork-ts-checker-webpack-plugin)

## ESLint

- [eslint](https://github.com/eslint/eslint)
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint)
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

## Stylelint

- [stylelint](https://github.com/stylelint/stylelint)
- [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)
- [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin)

## Prettier

- [prettier](https://github.com/prettier/prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [stylelint-config-prettier](https://github.com/prettier/stylelint-config-prettier)
- [stylelint-prettier](https://github.com/prettier/stylelint-prettier)

## Template

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 可基于模板生成 `html` 文件

## Other

- [rimraf](https://github.com/isaacs/rimraf) 删除目录

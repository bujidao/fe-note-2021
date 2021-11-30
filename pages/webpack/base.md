# 初始化webpack

## 安装包

### 三大件

webpack

webpack-cli

webpack-dev-server

### 处理JS

ES6、ES7、ES8

六件套

整个ES的转换
`babel-loader@7`、`babel-core`、`babel-preset-env`：

ES7 ES8
`babel-plugin-transform-runtime`

装饰器
`babel-plugin-transform-decorators`、`babel-plugin-transform-decorators-legacy`

### 处理CSS

四大件

基本
`sass-loader`、`node-sass`、`css-loader`

自动添加前缀
`postcss-loader`、`autoprefixer`

插入到js
`style-loader`

### 处理模板

`ejs-loader`:ejs tpl后缀

### 处理html

`html-webpack-plugin`

## webpack.config.js配置

`mode`: 指定环境

`entry`: html页面入口js

`output`: 输出
  1. `path`: 打包输出的文件夹
  1. `filename`: 相对于path的文件名

`module.rules`: (数组)
  1. `test`: 匹配文件
  1. `loader`: 使用的规则(数组)
  1. `exclude`: 

`plugins`: 插件，数组

``

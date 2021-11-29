# plugin

## 原理

`webpack`插件是一个具有 `apply` 方法的对象，这个 `apply` 方法会被 `webpack` `compiler` 调用，并且在整个编译声明周期内都可以访问 `compiler` 对象

原理：本质是一个对象，通过让 `webpack` 调用plugin 的 `apply` 方法，来实现扩展功能。

## 特性

* 是一个独立的模块
* 模块对外暴露一个js对象，通过在`webpack.config.js` 的 `plugins` 字段中实例化 `plugin` 对象实现对其调用
* 函数的原型`prototype`上定义一个注入`compiler` 对象的 `apply` 方法
* apply 函数中需要有通过 `compiler` 对象挂载的 `webpack` 事件钩子，钩子的回调中能拿到当前编译的 `compilation` 对象，如果是异步编译插件的话可以拿到回调 `callback`
* 完成自定义子编译流程并处理 `complition` 对象的内部数据
* 如果异步编译插件的话，数据处理完成后执行 `callback` 回调

## 编写 plugin 流程

1. webpack.config.js中配置选项
``` javascript
// webpack.config.js
const MyPlugins = require('/your/plugin/file/path')
module.exports = {
    plugins: [
      new MyPlugins({options})
    ]
}
```

1. MyPlugins.js
``` javascript
class MyPlugins {
    construct(options){
      init(options)
    }

    // webpack在整个编译期间，会调用plugins里面的apply方法
    apply(compiler) {
      compiler.hooks.emit.tap('my-plugin', (compilation) => {}
    }
}
```

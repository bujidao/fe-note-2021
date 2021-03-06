# 沙箱

在计算机安全中，**沙箱（Sandbox）是一种用于隔离正在运行程序的安全机制**，通常用于执行未经测试或不受信任的程序或代码，它会为待执行的程序创建一个独立的执行环境，内部程序的执行不会影响到外部程序的运行

## 有什么应用场景

* 执行 JSONP 请求回来的字符串时或引入不知名第三方 JS 库时，可能需要创造一个沙箱来执行这些代码。
* Vue 模板表达式的计算是运行在一个沙盒之中的，在模板字符串中的表达式只能获取部分全局对象，这一点官方文档有提到，详情可参阅源码。
* 在线代码编辑器，如 CodeSanbox 等在线代码编辑器在执行脚本时都会将程序放置在一个沙箱中，防止程序访问/影响主页面。
* 许多应用程序提供了插件（Plugin）机制，开发者可以书写自己的插件程序实现某些自定义功能。开发过插件的同学应该知道开发插件时会有很多限制条件，这些应用程序在运行插件时需要遵循宿主程序制定的运行规则，插件的运行环境和规则就是一个沙箱。例如下图是 Figma 插件的运行机制：

总而言之，只要遇到不可信的第三方代码，我们就可以使用沙箱将代码进行隔离，从而保障外部程序的稳定运行。如果不做任何处理地执行不可信代码，在前端中最直观的副作用/危害就是污染、篡改全局 window 状态，影响主页面功能甚至被 XSS 攻击。

## 实现一个沙箱

沙箱的目的是，阻断沙箱里面的代码访问指定以外的变量；

基于此，实现沙箱的思路是：手动生成一个执行环境，并把这个执行环境直接提供沙箱使用；

但是，如果沙箱里面的变量是复杂不确定的，由于沙箱寻找变量的时候，会根据作用链域一层一层往上找，也就无法实现沙箱对外部访问的控制；为了阻止这种情况，用到一个`Proxy`代理；

* demo

``` javascript
var obj = {
  name: 'hebo',
  age: '23',
  fun: function(str) {
    console.log(str)
  }
}
var white_list = ['console', 'Math']
var strr = 'world'
var codeStr = 'console.log(name);console.log(strr);console.log(fun(age));'

function mySandbox(code) {
  // 创建一个代理，拦截所有请求
  var proxyObj = new Proxy(obj, {
    has: function(target, key) {
      if (white_list.includes(key)) {
        return target.hasOwnProperty(key)
      }

      if (!target.hasOwnProperty(key)) {
        return undefined
      }

      return true
    },
  })
  var fun = new Function('proxyObj', 'with(proxyObj){'+code+'}')
  fun.call(proxyObj, proxyObj)
}

mySandbox(codeStr)
```

> [参考](https://zhuanlan.zhihu.com/p/428039764)

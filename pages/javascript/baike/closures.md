# 闭包

> 个人理解: 若子函数被占用,则父函数执行完成以后,不会释放内存,父函数的作用域链[[scope]]也不会释放

## 定义

MDN 对闭包的定义为：

> 闭包是指那些能够访问自由变量的函数。

那什么是自由变量呢？

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

由此，我们可以看出闭包共有两部分组成：

> 闭包 = 函数 + 函数能够访问的自由变量

Eg:
``` javascript
var a = 1;

function foo() {
  console.log(a);
}

foo();
```

foo 函数可以访问变量 a，但是 a 既不是 foo 函数的局部变量，也不是 foo 函数的参数，所以 a 就是自由变量。

那么，函数 foo + foo 函数访问的自由变量 a 不就是构成了一个闭包嘛……
还真是这样的！

### ECMAScript释义

ECMAScript中，闭包指的是：

* 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
* 从实践角度：以下函数才算是闭包：
  1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
  1. 在代码中引用了自由变量

接下来就来讲讲实践上的闭包。

## 分析

``` javascript
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f(){
    return scope;
  }
  return f;
}

var foo = checkscope();
foo();
```

首先我们要分析一下这段代码中执行上下文栈和执行上下文的变化情况。

另一个与这段代码相似的例子，在《JavaScript深入之执行上下文》中有着非常详细的分析。如果看不懂以下的执行过程，建议先阅读这篇文章。

这里直接给出简要的执行过程：

1. 进入全局代码，创建`全局执行上下文EC(G)`，全局执行上下文压入`执行上下文栈ECStack`
1. 创建全局变量对象VO(G)
1. 全局执行上下文初始化
1. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
1. checkscope 执行上下文初始化，创建变量对象、作用域链、this等
1. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
1. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
1. f 执行上下文初始化，创建变量对象、作用域链、this等
1. f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

了解到这个过程，我们应该思考一个问题，那就是：

当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

以上的代码，要是转换成 PHP，就会报错，因为在 PHP 中，f 函数只能读取到自己作用域和全局作用域里的值，所以读不到 checkscope 下的 scope 值。(这段我问的PHP同事……)

然而 JavaScript 却是可以的！

当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：

```
fContext = {
  Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```

对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

所以，让我们再看一遍实践角度上闭包的定义：

1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
1. 在代码中引用了自由变量

在这里再补充一个《JavaScript权威指南》英文原版对闭包的定义:

>This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature.

闭包在计算机科学中也只是一个普通的概念，大家不要去想得太复杂。

## 题型

接下来，看这道刷题必刷，面试必考的闭包题：

``` javascript
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function () {
    console.log(i);
  };
}

data[0]();
data[1]();
data[2]();
```

答案是都是 3，让我们分析一下原因：

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

```
globalContext = {
  VO: {
    data: [...],
    i: 3
  }
}
```

data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3。

data[1] 和 data[2] 是一样的道理。

所以让我们改成闭包看看：

``` javascript
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    return function(){
      console.log(i);
    }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

```
globalContext = {
  VO: {
    data: [...],
    i: 3
  }
}
```

跟没改之前一模一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
```
data[0]Context = {
    Scope: [AO, 匿名函数Context.AO globalContext.VO]
}
```
匿名函数执行上下文的 AO 为：

```
匿名函数Context = {
  AO: {
    arguments: {
      0: 0,
      length: 1
    },
    i: 0
  }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从匿名函数 Context.AO 中查找，这时候就会找 i 为 0，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值(值为3)，所以打印的结果就是 0。

data[1] 和 data[2] 是一样的道理。

## 视频讲解

<iframe height="600" src="//player.bilibili.com/player.html?aid=286340004&bvid=BV1xf4y1R7AH&cid=209899654&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

* 搭配图片

![搭配图片](/media/Snipaste_2021-11-12_14-43-29.png)

## 笔记

闭包：当前函数，形成一个私有的上下文，函数执行完，如果函数里面的某个东西，被当前上下文以外的内容占用了，则当前函数文不能被释放，则形成了闭包。（当前私有变量，也不会被销毁）

考虑维护全局纯净，可以借助闭包来实现

作用：
1. 保护变量不受外界的干扰
1. 保存私有变量

## 实际应用

闭包在实际开发中的应用

### 防抖函数

``` javascript
/**
 * 防抖函数
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
function debounce(func, wait) {
  var timeout
  return function() {
    if (timeout) clearTimeout(timeout)
    var canExe = !timeout 
    timeout = setTimeout(function() {
      timeout = null
    }, wait)
    if (canExe) func.apply(this, arguments)
  }
}

```

### 节流函数

``` javascript
/**
 * 节流函数
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
function throttle(func, wait) {
  var oldTs = 0;
  return function() {
    var newTs = Date.now()
    if (newTs - oldTs >= wait) {
      func.apply(this, arguments)
      oldTs = newTs
    }
  }
}

```

### getter和setter

``` javascript
function fn(){
    var name='hello'
    setName=function(n){
        name = n;
    }
    getName=function(){
        return name;
    }

    //将setName，getName作为对象的属性返回
    return {
        setName:setName,
        getName:getName
    }
}
var fn1 = fn();//返回对象，属性setName和getName是两个函数
console.log(fn1.getName());//getter
fn1.setName('world');//setter修改闭包里面的name
console.log(fn1.getName());//getter
```

### 沙箱

[沙箱 - 站内链接](/sandbox)

### 其他使用场景

[JS 闭包的 9 大经典使用场景](https://www.jianshu.com/p/9eb30b6af3a1)


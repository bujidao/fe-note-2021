# 闭包

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

1. 进入全局代码，创建全局执行上下文EC(G)，全局执行上下文压入执行上下文栈
1. 全局执行上下文初始化
1. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈
checkscope 执行上下文初始化，创建变量对象、作用域链、this等
checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出
执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈
f 执行上下文初始化，创建变量对象、作用域链、this等
f 函数执行完毕，f 函数上下文从执行上下文栈中弹出
了解到这个过程，我们应该思考一个问题，那就是：

当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊(即从执行上下文栈中被弹出)，怎么还会读取到 checkscope 作用域下的 scope 值呢？

以上的代码，要是转换成 PHP，就会报错，因为在 PHP 中，f 函数只能读取到自己作用域和全局作用域里的值，所以读不到 checkscope 下的 scope 值。(这段我问的PHP同事……)

然而 JavaScript 却是可以的！

当我们了解了具体的执行过程后，我们知道 f 执行上下文维护了一个作用域链：

fContext = {
  Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
对的，就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候，即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包这个概念。

所以，让我们再看一遍实践角度上闭包的定义：

即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
在代码中引用了自由变量
在这里再补充一个《JavaScript权威指南》英文原版对闭包的定义:

This combination of a function object and a scope (a set of variable bindings) in which the function’s variables are resolved is called a closure in the computer science literature.

闭包在计算机科学中也只是一个普通的概念，大家不要去想得太复杂。

## 视频

<iframe height="600" src="//player.bilibili.com/player.html?aid=286340004&bvid=BV1xf4y1R7AH&cid=209899654&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

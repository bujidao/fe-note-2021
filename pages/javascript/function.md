## this

!> 不管是什么场合，this都有一个共同点：它总是返回一个对象。简单说，this就是属性或方法“当前”所在的对象。

* JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方。

``` javascript
function f() {
  return '姓名：'+ this.name;
}

var A = {
  name: '张三',
  describe: f
};

var B = {
  name: '李四',
  describe: f
};

A.describe() // "姓名：张三"
B.describe() // "姓名：李四"
```

* 如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层。*对象是一种引用类型，故而不会指向上层*

``` javascript
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};
a.b.m() // undefined
```

* 注意事项

> 由于this的指向是不确定的，所以切勿在函数中包含多层的this


[mark](https://javascript.ruanyifeng.com/oop/this.html)

## call & apply & bind

> 改变当前函数的`this`指向， 绑定`this`

**异同**

<table>
  <tr>
    <th></th>
    <th>apply</th>
    <th>call</th>
    <th>bind</th>
  </tr>
  <tr>
    <td>含义</td>
    <td colspan=3>改变当前函数的this指向</td>
  </tr>
  <tr>
    <td>参数</td>
    <td>数组</td>
    <td>列表</td>
    <td>列表</td>
  </tr>
  <tr>
    <td>返回值</td>
    <td colspan='2'>返回未定义值，直接执行</td>
    <td>返回函数，手动调用才执行</td>
  </tr>
</table>

**示例**

``` javascript
function foo(){
  console.log(arguments[0], this.name)
}

var obj = {
  name: 'hebo'
}

var res = foo.bind(obj, 'bind')
var res2 = foo.call(obj, 'call')
var res3 = foo.apply(obj, ['apply'])

console.log(Object.prototype.toString.call(res)) // [object Function]
console.log(Object.prototype.toString.call(res2)) // [object Undefined]
console.log(Object.prototype.toString.call(res3)) // [object Undefined]

```

## IIFE
IIFE: Immediately-Invoked Function Expression 立即执行函数

**用处**
* 隐藏实现
* 不会污染全局命名空间
* 用它来编写`js`模块

``` javascript
;(function () {// ;的作用：用于结束上一条语句
  var a = 3
  function test() {
    console.log('test', a)
  }
  window.$ = function() { // 向外暴露全局方法
    return {
      test: test
    }
  }
})()

/*
1. $是一个函数 
2. $执行后返回一个对象
3. 执行对象里面的test方法
*/
window.$().test() // test 3
```

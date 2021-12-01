# prototype/__proto__

## 对应名称

* `prototype` : 原型
* `__proot__` : 原型链（节点）

## 从属关系

* `prototype` : 函数的一个属性：对象{}
* `__proto__` : 对象Object的一个属性：对象{}

对象的__proto__保存着该对象构造函数的prototype
``` javascript
function Test() {}

const test = new Test()

console.log(test.__proto__ === Test.prototype) // true

console.log(Test.prototype.__proto__ === Object.prototype) // true

console.log(Object.prototype.__proto__) // null


```


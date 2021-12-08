# prototype/__proto__

!> 原型存在的意义就是解决属性与方法共享的问题，减少不必要的内存消耗。

## prototype

> JS中每次创建一个函数，该函数就会自动带有一个prototype属性，该属性指向函数的原型对象。

``` javascript
function Test() {}
var test = new Test()

console.log(Test.prototype === test.__proto__) // true
```
上述例子中，函数`Test`的`prototype`指向了一个对象，而这个对象是调用构造函数时创建的实例的原型，也就是`test.__proto__`等于`Test.prototype`

## __proto__

每个js对象中都会存在的属性，这个属性，会指向该对象的原型，使用  `Object.getPrototypeOf`函数，作为获取对象原型的标准API

> 每一个对象数据类型(普通的对象、实例、prototype......)也天生自带一个属性__proto__，属性值是当前实例所属类的原型(prototype)。原型对象中有一个属性constructor, 它指向函数对象。

![](./media/prototype.webp)

## 对比

### 对应名称

* `prototype` : 原型
* `__proto__` : 原型链（节点）

### 从属关系

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

## 参考

[【深入理解 JavaScript 原型】](https://zhuanlan.zhihu.com/p/87667349)

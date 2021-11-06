## 原型

> JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
>
> 准确地说，这些属性和方法定义在Object的构造器函数(constructor functions)之上的prototype属性上，而非对象实例本身。

---

> 个人理解：构造函数体里面的，属于私有的变量，每次实例化的时候，这个实例都可以对这些变量进行个性化操作；原型里的变量，更像公共的属性，只要其中一个进行改变了，其他通过这个原型进行实例化的实例都会同步修改；

---

> 以下转自知乎[深入理解 JavaScript 原型](https://zhuanlan.zhihu.com/p/87667349)

---

[filename](./object-prototype.md ':include')

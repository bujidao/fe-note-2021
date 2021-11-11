# 变量提升

变量可以在声明之前进行初始化和使用。

?> 函数和变量相比，会被优先提升。这意味着函数会被提升到更靠前的位置。

## 只有声明被提升

!> JavaScript **只会提升声明，不会提升其初始化**。如果一个变量先被使用再被声明和赋值的话，使用时的值是 undefined。参见例子：

``` javascript
console.log(num); // Returns undefined
var num;
num = 6;
```

如果你先赋值、再使用、最后声明该变量，使用时能获取到所赋的值
``` javascript
num = 6;
console.log(num); // returns 6
var num;
```

再来看几个类似的例子：

``` javascript
// Example 1 - only y is hoisted
var x = 1;                 // 声明 + 初始化 x
console.log(x + " " + y);  // '1 undefined'
var y = 2;                 // 声明 + 初始化 y

// Example 2 - Hoists
var num1 = 3;                   // Declare and initialize num1
num2 = 4;                       // Initialize num2
console.log(num1 + " " + num2); //'3 4'
var num2;                       // Declare num2 for hoisting

// Example 3 - Hoists
a = 'Cran';              // Initialize a
b = 'berry';             // Initialize b
console.log(a + "" + b); // 'Cranberry'
var a, b;                // Declare both a & b for hoisting

```

## 函数声明提升

JavaScript 中的函数声明被提升到了函数定义。你可以在函数声明之前使用该函数:

``` javascript
hoisted(); // "foo"

function hoisted() {
  console.log("foo");
}

/* equal to*/
var hoisted; 

hoisted = function() {
  console.log("foo");
}
hoisted();
// "foo" 

```

> 注意 :函数表达式function expressions 不会被提升:

``` javascript
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
  console.log("bar");
};

/* equal to*/
notHoisted();
var notHoisted;
notHoisted = function() {
  console.log("bar");
};
```
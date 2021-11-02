
## 循环遍历

比较各种遍历的特点属性

?> **Tips**  参与遍历的方法：`filter`、`map`、`some`、`every`、`forEach`、`reduce`

---

### filter

* 不修改原数组
* 返回符合条件的元素的数组

> 创建一个新数组，其包含通过所提供函数实现的测试的所有元素

``` javascript
var arr = [1, 2, 3, 4, 5, 6]
let res = arr.filter(function(ele) {
  return ele > 3
})
console.log(res) // [4, 5, 7]
```

### forEach

* 不修改原数组
* 不返回任何值
* 只循环，相当于for
* 不能提前终止

> 对数组的每一个方法执行一遍给定的方法，不返回值，也不改变原数组

让每个元素做一些事情，具体做什么，随便

``` javascript
arrNum.forEach(function(ele){
  pickupSoup(ele)
})
```

> 注意：除了抛出异常以外，没有办法中止或跳出 forEach() 循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。

### map

* 不修改原数组
* 返回新数组
* 新数组是回调函数执行的结果

> 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
> 新数组是每一组执行函数以后的返回值

``` javascript
var arr = [1, 2, 3, 4, 5, 6]
var res1 = arr.map(function(ele) {
  return ele * 2
})
console.log(res1) // [2, 4, 6, 8, 10, 12]
```

### reduce

* 不修改原数组
* 返回汇总以后的结果

> 一个累计器，reducer(acc, cur, index, src)

``` javascript
var arr = [1, 2, 3]
var res = arr.reduce(function(acc, cur){
  return acc + cur
})
console.log(res) // 6
```

**demo**
```javascript
/**
 * 二维数组转一维数组
 * sourceArr 待转换数组
 */
function twoDimension2oneDimension(sourceArr) {
  return sourceArr.reduce(function(acc, cur, idx, src){
    return acc.concat(cur)
  })
}
```

### some

* 不修改原数组
* 至少有一个通过测试
* 返回布尔

> 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。

``` javascript

let arrNum = [11, 13, 15, 14, 12]
var res = arrNum.some(function(ele) {
  return ele == 14
})
console.log(res) // true
```

### every

* 不修改原数组
* 所有都通过测试
* 返回布尔类型

> 测试一个数组的`所有元素`是否通过某个方法的测试，并返回一个布尔类型

``` javascript
var arr = [1, 2, 3, 4, 5, 6]
var res1 = arr.every(function(ele) {
  return ele > 0
})
console.log(res1) // true (所有元素都大于0)

var res2 = arr.every(function(ele) {
  return ele > 3
})
console.log(res2) // false (部分元素不大于3)
```

### 总结

* 所有的遍历，都不会修改原数组
* 根据返回值，遍历可分为两大类
  * 有返回值
    * filter 返回数组
    * reduce 返回累计结果
    * every 返回布尔
    * some 返回布尔
    * map 返回回调函数执行以后的结果
  * 什么也不返回
    * forEach



## 易忘点

### slice

!> **译：**切成片、部分

* 不修改原数组
* 返回切片数组
* `slice[start, end)`

``` javascript
let arrCars = ['bmw', 'volvo', 'tesla', 'vw', 'benz']
var res = arrCars.slice(2, 4)
console.log(arrCars) // ['bmw', 'volvo', 'tesla', 'vw', 'benz']
console.log(res) // ['tesla', 'vw']
```

**demo**
``` javascript
/**
 * 一维数组转二维数组
 * sourceArr 待转换数组
 * subArrLen 二维数组长度
 */
function oneDimension2twoDimension(sourceArr, subArrLen) {
  var index = 0
  var newArr = []
  while(index < sourceArr.length) {
    newArr.push(sourceArr.slice(index, index += subArrLen))
  }
  return newArr
}
```

### splice

* 直接修改原数组
* 对原数组进行更新
* 返回删除的那部分
* `splice(start, deleteCount, addItem)`

``` javascript
/**
 * 从第二个位置开始操作，删除0个，新增1个('张三')
 * 操作后
 * 原数组：['bmw', 'volvo', '张三', 'tesla', 'vw', 'benz']
 * 返回部分：[]
 */
let arrCars = ['bmw', 'volvo', 'tesla', 'vw', 'benz']
var res = arrCars.splice(2, 0, '张三')

/**
 * 从第二个位置开始操作，删除1个，新增1个('张三')
 * 操作后
 * 原数组：['bmw', 'volvo', '张三', 'vw', 'benz']
 * 返回部分：['tesla']
 */
let arrCars = ['bmw', 'volvo', 'tesla', 'vw', 'benz']
var res = arrCars.splice(2, 1, '张三')

/**
 * 从第二个位置开始操作，删除1个，新增0个
 * 操作后
 * 原数组：['bmw', 'volvo', 'vw', 'benz']
 * 返回部分：['tesla']
 */
let arrCars = ['bmw', 'volvo', 'tesla', 'vw', 'benz']
var res = arrCars.splice(2, 1)
```

## 与其他数据类型的转换

### toString

> 将数组转换为字符串，中间用`,`分割

``` javascript
var arr = [1, 2, 3, 4, 5, 6]
let res = arr.toString()
console.log(res) // 1,2,3,4,5,6
```

### join

> 将数组转换为字符串，中间用指定分割符隔开

``` javascript
var arr = [1, 2, 3, 4, 5, 6]
let res = arr.join('---')
console.log(res) // 1---2---3---4---5---6
```

## 其他

### concat

> 不修改原数组

### Array.from()

> 从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

``` javascript
/**
 * 数组去重合并
 */
var arr1 = [1, 2 ,3]
var arr2 = [3, 4, 5]
var arr3 = [5, 6, 7]

function combine() {
  var arr = [].concat.apply([], arguments)
  return Array.from(new Set(arr))
}

var res2 = combine(arr1, arr2, arr3)
// res2: [1, 2, 3, 4, 5, 6, 7]
```

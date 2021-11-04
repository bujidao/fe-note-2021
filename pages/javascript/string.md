
## 低频

### charAt

> 返回指定位置的字符

#### 语法

``` javascript
str.charAt(index) // (0~length-1)
```

### charCodeAt

> 返回指定位置的字符的 UTF-16 代码单元

#### 语法

``` javascript
str.charCodeAt(index) // (0~length-1)
```

## 易忘点

### substring

!> **译：**子字符串

* 不修改原字符串
* 返回一个新的字符串
* `substring[start, end)`

``` javascript
var str = 'hello world'
var res = str.substring(2, 7)
console.log(str) // hello world
console.log(res) // llo w
```

### slice

!> **译：**分片

* 不修改原字符串
* 返回一个新的字符串
* `slice[start, end)`


``` javascript
var str = 'hello world'
var res = str.slice(2, 7)
console.log(str) // hello world
console.log(res) // llo w
```

## 与其他数据类型的转换

### split

!> **译：**分裂

* 不修改原字符串
* 根据指定分隔符分开

> 根据指定分隔符，将字符串转换为数组

``` javascript
var str = 'The quick brown fox jumps over the lazy dog.'
let res = str.split(' ')
console.log(res) // ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.']
```
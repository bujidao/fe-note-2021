# 算法

## 排序

## 乱序

### 乱序1

> Fisher–Yates shuffle 洗牌算法

``` javascript
Array.prototype.shuffle = function() {
  var array = this;
  var m = array.length,
      t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
```

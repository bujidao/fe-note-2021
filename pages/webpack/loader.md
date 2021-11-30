# loader

## 原理

原理：本质是一个函数，这个函数对资源进行转换，最后返回一个函数

注意：loader必须返回一段js代码，这样eval才能执行，否则报错

## 执行顺序

> 从右往左，从下往上

* 从右往左

``` javascript
// 1. less-loader把less转化成css，传给css-loader
// 2. css-loader把结果给style-loader
// 3. style-loader返回javascript代码字符串
{
    test:/\.less$/,
    use:[
      'style-loader','css-loader','less-loader'
    ]
}
```

* 从下往上

``` javascript
module: {
    rules: [
      {
        test: /\.less$/,
        use: 'less-loader',
        enforce: 'pre'
      },
     {
        test: /\.less$/,
        use: 'css-loader'
      },
     {
        test: /\.less$/,
        use: 'style-loader',
        enforce: 'post'
      }
    ]
  }
```

可以通过一个 enforce 属性，指定执行顺序，默认有以下几个值

1. pre 优先处理
1. normal 正常处理（默认）
1. inline 其次处理
1. post 最后处理

``` javascript
module: {
  rules: [
    {
      test: /\.less$/,
      use: 'less-loader',
      enforce: 'pre'
    },
    {
      test: /\.less$/,
      use: 'css-loader'
    },
    {
      test: /\.less$/,
      use: 'style-loader',
      enforce: 'post'
    }
  ]
}
```

## 自定义loader

`loader-utils` 可以获取自定义传入 `loader` 的配置项 `option`

``` javascript
// 比如：申明一个读取markdown文件内容的loader。
cosnt {getOptions} = require('loader-utils')
module.exports = function(source){
  //获取传入 loader 配置选项
  const options =  getOptions(this)
  return `module.exports=${source}`;
}

```


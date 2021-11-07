# Cookie\session\WebStorage <!-- {docsify-ignore} -->

比较几者之间的区别，以及优缺点的分析，最后提出更优的解决方案 WebStorage

## cookie

cookie的内容主要包括：名字、值、过期时间、路径和域。路径与域一起构成cookie的作用范围。

若不设置时间，则表示这个cookie的生命期为浏览器会话期间，关闭浏览器窗口，cookie就会消失。这种生命期为浏览器会话期的cookie被称为会话cookie。会话cookie一般不存储在硬盘而是保存在内存里，当然这个行为并不是规范规定的。

若设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再打开浏览器这些cookie仍然有效直到超过设定的过期时间。对于保存在内存里的cookie，不同的浏览器有不同的处理方式

## session 

当程序需要为某个客户端的请求创建一个session时，服务器首先检查这个客户端的请求里是否已包含了一个session标识（称为session id）；

如果已包含则说明以前已经为此客户端创建过session，服务器就按照session id把这个session检索出来使用（检索不到，会新建一个）；

如果客户端请求不包含session id，则为客户端创建一个session并且生成一个与此session相关联的session id，session id的值应该是一个既不会重复，又不容易被找到规律以仿造的字符串，这个session id将被在本次响应中返回给客户端保存。

每一次的session_id是不一样的

**保存这个session id的方式可以采用cookie，这样在交互过程中浏览器可以自动的按照规则把这个标识发送给服务器。**

## cookie 与 session 异同

<table>
<tr>
<th></th>
<th>cookie</th>
<th>session</th>
</tr>
<tr>
<td>存储大小</td>
<td>单个cookie数据不超过4k</td>
<td>没有限制</td>
</tr>
<tr>
<td>保存位置</td>
<td>
保存在本地
<br>
<ol>
<li>
已设置过期时间：本地硬盘
</li>
<li>
未设置过期时间：内存(会话结束销毁)
</li>
</ol>
</td>
<td>
<ul>
<li>
数据：保存在服务器(缺：占用服务器资源)
</li>
<li>
session_id：保存在会话cookie
</li>
</ul>
</td>
</tr>
<tr>
<td>默认保存时长</td>
<td>会话期间</td>
<td>
<ol>
<li>session_id: 保存在会话cookie中</li>
<li>session内容：默认30分钟</li>
</ol>
</td>
</tr>
<tr>
<td>保存方式</td>
<td>字符串</td>
<td>加密后的信息</td>
</tr>
<tr>
<td>安全性</td>
<td colspan="2">session 大于 cookie</td>
</tr>
<tr>
<td>单个站点保存数量</td>
<td>一般不超过20个cookie</td>
<td>没有限制，但是数量太多，会占用服务器资源</td>
</tr>
<tr>
<td>缺点</td>
<td>
<ol>
<li>每次请求都会带上，浪费带宽</li>
<li>安全性低</li>
<li>数据大小有限</li>
<li>用户可以操作（禁用）cookie，使功能受限</li>
</ol>
</td>
<td>
<ol>
<li>过多依赖 cookie, 如果禁用cookie，则要使用URL重写，不安全</li>
<li>占用服务器资源</li>
<li>创建Session变量随意性大，过度使用会导致难以维护</li>
</ol>
</td>
</tr>
</table>

## 更优解决方案 WebStorage

解决 `cookie` 和 `session` 中存在的问题

### WebStorage

!> WebStorage的目的是克服由 `cookie` 所带来的一些限制，当数据需要被严格控制在客户端时，不需要持续的将数据发回服务器。

WebStorage两个主要目标：
1. 提供一种在 `cookie` 之外存储会话数据的路径。
1. 提供一种存储大量可以跨会话存在的数据的机制。

HTML5的WebStorage提供了两种API：`localStorage`（本地存储）和`sessionStorage`（会话存储）。

### 基本特性

<table>
<tr>
<th style="width: 100px"></th>
<th>localStorage</th>
<th>sessionStorage</th>
</tr>
<tr>
<td>生命周期</td>
<td>永久，除非主动删除数据，否则数据永远不会消失。</td>
<td>仅在当前会话下有效。
<br>
sessionStorage引入了一个“浏览器窗口”的概念，sessionStorage是在同源的窗口中始终存在的数据。只要这个浏览器窗口没有关闭，即使刷新页面或者进入同源另一个页面，数据依然存在。但是sessionStorage在关闭了浏览器窗口后就会被销毁。同时独立的打开同一个窗口同一个页面，sessionStorage也是不一样的。</td>
</tr>
<tr>
<td>存储大小</td>
<td colspan="2">5M</td>
</tr>
<tr>
<td>存储位置</td>
<td colspan="2">都保存在客户端，不与服务器进行交互通信。</td>
</tr>
<tr>
<td>内容形式</td>
<td colspan="2">只能存储字符串类型</td>
</tr>
<tr>
<td>应用场景</td>
<td>常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据（令牌）</td>
<td>敏感账号一次性登录</td>
</tr>
</table>

### 优点

（1）存储空间更大：cookie为4KB，而WebStorage是5MB；

（2）节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样每次请求都会传送到服务器，所以减少了客户端和服务器端的交互，节省了网络流量；

（3）对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便；

（4）快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以速度更快；

（5）安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题；

（6）WebStorage提供了一些方法，数据操作比cookie方便：setItem (key, value) —— 保存数据，以键值对的方式储存信息。



<!-- <tr>
<td></td>
<td></td>
<td></td>
</tr>
<ol>
<li></li>
<li></li>
</ol> -->
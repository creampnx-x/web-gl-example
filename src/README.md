# example

导航由路由参数决定，如：

```text
http://www.example.com/web-gl/example?which=triangle
```

由于web-gl不需要进行DOM面的变换，所以由JS读取`query`，执行不同的方法来做到路由变换。

## todo

使用 `histroy.pushState` or `hash` 进行无刷新变换。

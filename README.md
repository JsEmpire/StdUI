# StdUI -- jquery.window(window插件)
##描述
这时一个简单的window插件
##依赖
jQuery
less(可选)
##使用
###引入js和CSS
```
<link rel="stylesheet/less" type="text/css" href="css/window.less">
<script type="text/javascript" language="JavaScript" src="libs/less/less.js"></script>
<script type="text/javascript" language="JavaScript" src="libs/jquery/jquery-1.12.2.js"></script>
```
>**Note**
>window.less一定要在less.js之前
或者
```
<link rel="stylesheet/less" type="text/css" href="css/window.css">
<script type="text/javascript" language="JavaScript" src="libs/jquery/jquery-1.12.2.js"></script>
```

###创建一个简单的Window
```html
<div id="mywin">
    123
</div>
```
```
var myWin = $('#mywin').window({
    title:'My Window',
    height:400,
    width:800,
    listeners:{
        afterRender:function(ok){
        }
    }
});
myWin.open();

```

###属性
**height**
[Number] 窗口高度
**width**
[Number] 窗口宽度
**title**
[String] 窗口标题
**buttons**
[Array] 按钮，可选值 ok cancel yes no
**okText**
[String] ok按钮文字，缺省为“确定”
**cancelText**
[String] cancel按钮文字，缺省为“取消”
**yesText**
[String] yes按钮文字，缺省为“是”
**noText**
[String] no按钮文字，缺省为“否”
**listeners**
[Object] 事件监听
```
listeners:{
    afterRender:function(ok){
    }
}
```
###事件
**beforeRender**
beforeRender(win) 在渲染窗口之前触发
**afterRender**
afterRender(win) 在渲染窗口之后触发
**onShow**
onShow(win) 显示窗口时触发
**onClose**
onClose(win) 关闭窗口时触发
**onOk**
onOk(win) OK按钮被点击后触发
**onCancel**
onCancel(win) Cancel按钮被点击后触发
**onYes**
onYes(win) Yes按钮被点击后触发
**onNo**
onNo(win) No按钮被点击后触发

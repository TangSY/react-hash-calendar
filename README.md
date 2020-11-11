[![Build Status](https://travis-ci.org/TangSY/react-hash-calendar.svg?branch=master)](https://travis-ci.org/TangSY/react-hash-calendar)
[![version](https://img.shields.io/npm/v/react-hash-calendar.svg)](https://www.npmjs.com/package/react-hash-calendar)
[![download](https://img.shields.io/npm/dt/react-hash-calendar.svg)](https://www.npmjs.com/package/react-hash-calendar)
[![HitCount](http://hits.dwyl.com/TangSY/react-hash-calendar.svg)](http://hits.dwyl.com/TangSY/react-hash-calendar)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![author](https://img.shields.io/badge/author-HashTang-orange.svg)](https://www.hxkj.vip)

# 按照惯例，先上效果图

![calendar.gif](https://www.hxkj.vip/demo/calendar/calendar.gif)
![dot.gif](https://www.hxkj.vip/demo/calendar/dot.gif)
![week.gif](https://www.hxkj.vip/demo/calendar/week.gif)

# react-hash-calendar

- 基于 vue 2.X 开发的日历组件
- 支持手势滑动操作
- 上下滑动 切换 周/月 模式
  > 【周模式中】 左右滑动可切换 上一周/下一周
  > 【月模式中】 左右滑动可切换 上一月/下一月

# 安装使用说明

```
npm i react-hash-calendar
```

# Demo

![demo_qrcode.png](https://www.hxkj.vip/demo/calendar/demo.webp)

或者请用浏览器的手机模式查看：[https://www.hxkj.vip/demo/calendar/](https://www.hxkj.vip/demo/calendar/)

- 🎉 觉得好用可以给一个 star 哦~~ 🎉

## github 地址：[https://github.com/TangSY/react-hash-calendar](https://github.com/TangSY/react-hash-calendar)

# API

| 属性             | 说明                                                                                                                                                                          |   类型   |      默认      | 是否必传 |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: | :------------: | :------: |
| visible          | 控制日历组件的显示或隐藏,需使用 `.sync` 修饰符                                                                                                                                | Boolean  |     false      |    否    |
| scrollChangeDate | 控制滑动的时候是否修改选中的日期                                                                                                                                              | Boolean  |      true      |    否    |
| model            | 日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式                                                                                                                |  String  |     inline     |    否    |
| defaultDatetime  | 指定默认时间。                                                                                                                                                                |   Date   |    当前时间    |    否    |
| format           | 确认日期时，回调事件返回的日期格式。如“YY/MM/DD hh:mm” 、“YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分”、“MM DD,YY at hh:mm F”                                                   |  String  | YY/MM/DD hh:mm |    否    |
| weekStart        | 以星期几作为日历每一周的起始星期。可选['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']                                                          |  String  |     sunday     |    否    |
| pickerType       | 选择器类型 datetime：日期+时间 date：日期 time：时间                                                                                                                          |  String  |    datetime    |    否    |
| showTodayButton  | 是否显示返回今日按钮                                                                                                                                                          | Boolean  |      true      |    否    |
| isShowWeekView   | 是否以周视图展示组件                                                                                                                                                          | Boolean  |     false      |    否    |
| isShowAction     | 是否显示日历组件操作栏（标题栏）                                                                                                                                              | Boolean  |      true      |    否    |
| disabledWeekView | 禁用周视图（设置为 true 后，无法上下滑动进行周/月切换）                                                                                                                       | Boolean  |     false      |    否    |
| disabledDate     | 设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）                                                                                                | Function |      ---       |    否    |
| disabledScroll   | 设置日历的禁止滑动方向。可选['left', 'right', 'up', 'down', 'horizontal', 'vertical', 'all', ''] 。可取其一控制单个方向。                                                     |  String  |       ''       |    否    |
| markDate         | 需要被标记的日期，可按不同颜色不同标记类型分组标记（不分组默认蓝色）。如：[{color: 'red',date: ['2019/02/25']},{color: 'blue',type: 'dot',date: ['2019/01/20']},'2019/03/20'] |  Array   |       []       |    否    |
| markType         | 标记图案类型 dot：小圆点（日期下方小圆点标记） circle：小圆圈（日期被小圆圈包围） dot+circle：同时使用小圆点与圆圈标记                                                        |  String  |      dot       |    否    |
| minuteStep       | 间隔时间。（分钟的步长）                                                                                                                                                      |  Number  |       1        |    否    |
| lang             | 选择的语言版本。可选值:['CN', 'EN']                                                                                                                                           |  String  |       CN       |    否    |

# 事件

| 事件名称    | 说明                                                                                      | 参数                               |
| :---------- | :---------------------------------------------------------------------------------------- | :--------------------------------- |
| change      | 日期改变时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 日期改变时，选中的日期)     |
| confirm     | 点击确认按钮时，触发该事件，dialog 模式中才有该按钮。（返回的日期格式取决于 format 属性） | (date: 点击确认按钮时，选中的日期) |
| click       | 点击日期时，触发该事件。（返回的日期格式取决于 format 属性）                              | (date: 当前点击的日期)             |
| touchstart  | 日历滑动 start 事件，同于原生该事件。                                                     | （event: touch 事件）              |
| touchmove   | 日历滑动 move 事件，同于原生该事件。                                                      | （event: touch 事件）              |
| touchend    | 日历滑动 end 事件，同于原生该事件。                                                       | （event: touch 事件）              |
| slidechange | 日历滑动的方向。返回值：right、left、up、down 。                                          | （direction: 滑动的方向）          |

# 插槽 Slot

| name    | 说明                                                                                                                                                                                                                                                                                                                                                 |
| :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| day     | 自定义日期内容。例如可用于添加农历之类的。参数为 { date, extendAttr }，其中 extendAttr 参数包含 `isMarked`（该日期是否被标记）、`isDisabledDate`（该日期是否被禁用）、`isToday`（该日期是否为今天）、`isChecked`（该日期是否被选中）、`isCurrentMonthDay`（该日期是否为本月日期）、`isFirstDayOfMonth`（该日期是否为当月第一天），可用于一些特殊需求 |
| week    | 自定义星期内容。例如可用于自定义星期样式等等。参数为 { week }                                                                                                                                                                                                                                                                                        |
| today   | 自定义 "今天" 按钮文字内容以及样式                                                                                                                                                                                                                                                                                                                   |
| confirm | 自定义 "确定" 按钮文字内容以及样式                                                                                                                                                                                                                                                                                                                   |
| action  | 自定义操作栏（标题栏）内容以及样式                                                                                                                                                                                                                                                                                                                   |

## Other

- 如果有其他问题， 或者功能上不兼容的。可以邮件沟通 t@tsy6.com，或者 github 提交 issue。

## 赞助

![pay.jpg](https://www.hxkj.vip/demo/calendar/pay.jpg)

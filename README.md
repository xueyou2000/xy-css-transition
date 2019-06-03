| ![IE](https://github.com/alrra/browser-logos/blob/master/src/edge/edge_48x48.png?raw=true) | ![Chrome](https://github.com/alrra/browser-logos/blob/master/src/chrome/chrome_48x48.png?raw=true) | ![Firefox](https://github.com/alrra/browser-logos/blob/master/src/firefox/firefox_48x48.png?raw=true) | ![Opera](https://github.com/alrra/browser-logos/blob/master/src/opera/opera_48x48.png?raw=true) | ![Safari](https://github.com/alrra/browser-logos/blob/master/src/safari/safari_48x48.png?raw=true) |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| IE 10+ ✔                                                                                   | Chrome 31.0+ ✔                                                                                     | Firefox 31.0+ ✔                                                                                       | Opera 30.0+ ✔                                                                                   | Safari 7.0+ ✔                                                                                      |

![NPM version](http://img.shields.io/npm/v/xy-css-transition.svg?style=flat-square)
![node version](https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square)
![npm download](https://img.shields.io/npm/dm/xy-css-transition.svg?style=flat-square)

[![xy-css-transition](https://nodei.co/npm/xy-css-transition.png)](https://npmjs.org/package/xy-css-transition)

# xy-css-transition

CSS 过渡组件, 包裹元素, 在其进入和离开时执行动画

## 安装

```bash
# yarn
yarn add xy-css-transition
```

## 使用例子

```tsx
import React from "react";
import ReactDOM from "react-dom";
import CssTransition from "xy-css-transition";
ReactDOM.render(
    <CSSTransition timeout={500} visible={visible}>
        <div className="block" />
    </CSSTransition>,
    container
);
```

## API

| 属性             | 说明                                      | 类型     | 默认值       |
| ---------------- | ----------------------------------------- | -------- | ------------ |
| timeout          | 过渡时间，需要与 css 里的过渡时间保持一直 | number   | -            |
| visible          | 显示动画/隐藏动画                         | boolean  | -            |
| name             | 过渡 css 样式名称                         | string   | `transition` |
| animateOnInit    | 第一次是否执行动画                        | boolean  | `false`      |
| onAppear         | 进入过渡开始事件                          | Function | -            |
| onAppearComplete | 进入过渡完毕事件                          | Function | -            |
| onLeave          | 离开过渡开始事件                          | Function | -            |
| onLeaveComplete  | 离开过渡完毕事件                          | Function | -            |

## 开发

```sh
yarn run start
```

## 例子

http://localhost:6006

## 测试

```
yarn run test
```

## 开源许可

xy-css-transition is released under the MIT license.

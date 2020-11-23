(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-hash-calendar"] = factory(require("react"));
	else
		root["react-hash-calendar"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__en__ = __webpack_require__(11);
/**
 * @Description:    统一导出所有语言文件
 * @Author:         TSY
 * @CreateDate:     2020/3/22 22:01
 */


/* harmony default export */ __webpack_exports__["default"] = ({
    CN: __WEBPACK_IMPORTED_MODULE_0__cn__["a" /* default */],
    EN: __WEBPACK_IMPORTED_MODULE_1__en__["a" /* default */],
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkPlatform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return formatDate; });
/*
 * @Description: 各种工具类
 * @Author: TSY
 * @Date: 2020-09-08 23:13:30
 * @LastEditTime: 2020-10-10 22:18:15
 */
/**
 * 判断安卓与IOS平台
 * @returns {string}
 */
var checkPlatform = function () {
    if (/android/i.test(navigator.userAgent)) {
        return '1';
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return '2';
    }
};
/**
 * 日期格式化
 * @param time {string}
 * @param format {string}
 * @returns {string}
 */
var formatDate = function (time, format, lang) {
    if (lang === void 0) { lang = 'CN'; }
    lang = lang.toUpperCase();
    var language = __webpack_require__(1).default[lang] || {};
    format =
        format || language.DEFAULT_DATE_FORMAT + " " + language.DEFAULT_TIME_FORMAT;
    var date = time ? new Date(time) : new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // 月份是从0开始的
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    }); /// /开个长度为10的数组 格式为 00 01 02 03
    var newTime = format
        .replace(/YY/g, year + '')
        .replace(/F/g, hour >= 12 ? 'pm' : 'am')
        .replace(/ss/g, preArr[sec] || sec + '')
        .replace(/mm/g, preArr[min] || min + '')
        .replace(/hh/g, hour > 12 && format.includes('F')
        ? hour - 12 + ''
        : format.includes('F')
            ? hour + ''
            : preArr[hour] || hour + '')
        .replace(/DD/g, preArr[day] || day + '')
        .replace(/MM/g, lang === 'EN' ? language.MONTH[month - 1] : preArr[month] || month);
    return newTime;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(17);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__language__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_constant__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_eq__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_styl__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_styl__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};







var yearNow = new Date().getFullYear();
var monthNow = new Date().getMonth();
var dayNow = new Date().getDate();
var defaultProps = {
    show: false,
    disabledWeekView: false,
    isShowWeekView: false,
    scrollChangeDate: true,
    firstDayOfMonthClassName: '',
    todayClassName: '',
    checkedDayClassName: '',
    disabledClassName: '',
    notCurrentMonthDayClassName: '',
    calendarTitleHeight: 60,
    defaultDate: new Date(),
    weekStart: 'Sunday',
    markType: 'dot',
    disabledDate: function (date) { return false; },
    disabledScroll: '',
    lang: 'CN',
};
var state = {
    language: { WEEK: [''], MONTH: [''] },
    currentChangeIsScroll: false,
    yearOfCurrentShow: yearNow,
    monthOfCurrentShow: monthNow,
    weekArray: __WEBPACK_IMPORTED_MODULE_2__utils_constant__["a" /* WEEK_LIST */],
    calendarWeek: ['日', '一', '二', '三', '四', '五', '六'],
    calendarOfMonth: [[{ year: yearNow, month: monthNow, day: dayNow }]],
    calendarOfMonthShow: [[{ year: yearNow, month: monthNow, day: dayNow }]],
    calendarDaysTotalLength: 42,
    lastMonthYear: 0,
    lastMonth: 0,
    nextMonthYear: 0,
    nextMonth: 0,
    checkedDate: { year: yearNow, month: monthNow, day: dayNow },
    weekStartIndex: 0,
    translateIndex: 0,
    transitionDuration: 0.3,
    touch: {
        x: 0,
        y: 0,
    },
    isTouching: false,
    calendarGroupHeight: 0,
    calendarWeekTitleHeight: 0,
    touchStartPositionX: 0,
    touchStartPositionY: 0,
    isShowWeek: false,
    calendarY: 0,
    selectedDayIndex: 0,
    lastWeek: [{ year: yearNow, month: monthNow, day: dayNow }],
    nextWeek: [{ year: yearNow, month: monthNow, day: dayNow }],
    isLastWeekInCurrentMonth: false,
    isNextWeekInCurrentMonth: false,
    markDateColorObj: {},
    markDateTypeObj: {},
};
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = state;
        _this.today = function () {
            var _a = _this.state, checkedDate = _a.checkedDate, isShowWeek = _a.isShowWeek, transitionDuration = _a.transitionDuration;
            _this.setState({
                checkedDate: __assign(__assign({}, checkedDate), { day: dayNow }),
                yearOfCurrentShow: yearNow,
                monthOfCurrentShow: monthNow,
            }, function () {
                _this.calculateCalendarOfThreeMonth();
            });
            if (isShowWeek) {
                setTimeout(function () {
                    _this.setState({ isTouching: true });
                    _this.showWeek();
                }, transitionDuration * 1000);
            }
        };
        _this.showWeek = function (checkedDate) {
            var _a, _b;
            var _c = _this.state, calendarOfMonth = _c.calendarOfMonth, _checkedDate = _c.checkedDate, calendarItemRef = _c.calendarItemRef, selectedDayIndex = _c.selectedDayIndex;
            checkedDate = checkedDate || _checkedDate;
            var calendarItemHeight = (calendarItemRef && calendarItemRef.offsetHeight) || 0;
            var daysArr = [];
            calendarOfMonth[1].forEach(function (item) {
                daysArr.push(item.day);
            });
            var dayIndexOfMonth = daysArr.indexOf(checkedDate.day);
            // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf
            if (checkedDate.day > 15) {
                dayIndexOfMonth = daysArr.lastIndexOf(checkedDate.day);
            }
            // 计算当前日期在第几行
            var indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7);
            var lastLine = indexOfLine - 1;
            console.log('showWeek -> calendarItemHeight', calendarItemHeight);
            _this.setState({
                calendarY: -(calendarItemHeight * lastLine),
                isShowWeek: true,
                calendarGroupHeight: calendarItemHeight,
            });
            var currentWeek = [];
            var sliceStart = lastLine * 7;
            console.log('showWeek -> lastLine', lastLine);
            var sliceEnd = sliceStart + 7;
            currentWeek = calendarOfMonth[1].slice(sliceStart, sliceEnd);
            console.log('showWeek -> currentWeek', currentWeek);
            var _selectedDayIndex = 0;
            var _isLastWeekInCurrentMonth = false;
            for (var i in currentWeek) {
                if (currentWeek[i].day === checkedDate.day) {
                    _selectedDayIndex = parseInt(i);
                }
            }
            _this.setState({ selectedDayIndex: _selectedDayIndex });
            var firstDayOfCurrentWeek = currentWeek[0];
            var lastDayOfCurrentWeek = currentWeek[6];
            var lastWeek;
            if (lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
                lastDayOfCurrentWeek.month === checkedDate.month) {
                lastWeek = calendarOfMonth[0].slice(21, 28);
            }
            else {
                if (firstDayOfCurrentWeek.day === 1) {
                    lastWeek = calendarOfMonth[0].slice(28, 35);
                }
                else {
                    lastWeek = calendarOfMonth[1].slice(sliceStart - 7, sliceEnd - 7);
                    if (lastWeek[selectedDayIndex] &&
                        lastWeek[selectedDayIndex].month === checkedDate.month) {
                        _isLastWeekInCurrentMonth = true;
                    }
                }
            }
            _this.setState({
                lastWeek: lastWeek,
                isLastWeekInCurrentMonth: _isLastWeekInCurrentMonth,
            });
            var _isNextWeekInCurrentMonth = false;
            var nextWeek;
            if (lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
                lastDayOfCurrentWeek.month !== checkedDate.month) {
                nextWeek = calendarOfMonth[2].slice(7, 14);
            }
            else {
                if (lastDayOfCurrentWeek.day ===
                    _this.daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]) {
                    nextWeek = calendarOfMonth[2].slice(0, 7);
                }
                else {
                    nextWeek = calendarOfMonth[1].slice(sliceStart + 7, sliceEnd + 7);
                    if (nextWeek[selectedDayIndex].month === checkedDate.month) {
                        _isNextWeekInCurrentMonth = true;
                    }
                }
            }
            (_a = _this.state.calendarOfMonthShow[0]).splice.apply(_a, __spreadArrays([sliceStart, 7], lastWeek));
            (_b = _this.state.calendarOfMonthShow[2]).splice.apply(_b, __spreadArrays([sliceStart, 7], nextWeek));
            _this.setState({
                nextWeek: nextWeek,
                isNextWeekInCurrentMonth: _isNextWeekInCurrentMonth,
            });
        };
        _this.showMonth = function () {
            var _a = _this.state, checkedDate = _a.checkedDate, calendarItemRef = _a.calendarItemRef;
            var calendarItemHeight = (calendarItemRef && calendarItemRef.offsetHeight) || 0;
            _this.setState({
                calendarY: 0,
                isShowWeek: false,
                isLastWeekInCurrentMonth: false,
                isNextWeekInCurrentMonth: false,
                calendarGroupHeight: calendarItemHeight * 6,
            });
            _this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
        };
        _this.weekTitleRef = function (ref) {
            if (!ref)
                return;
            _this.setState({ calendarWeekTitleHeight: ref.offsetHeight });
        };
        _this.calendarRef = function (ref) {
            if (!ref)
                return;
            _this.setState({ calendarRef: ref });
        };
        _this.calendarItemRef = function (ref) {
            if (!ref)
                return;
            _this.setState({ calendarItemRef: ref });
            var height = ref.offsetHeight;
            _this.setState({
                calendarGroupHeight: height * 6,
            });
        };
        _this.touchStart = function (event) {
            var touchStartCallback = _this.props.touchStartCallback;
            touchStartCallback && touchStartCallback(event);
            _this.setState({
                touchStartPositionX: event.touches[0].clientX,
                touchStartPositionY: event.touches[0].clientY,
                touch: { x: 0, y: 0 },
                isTouching: true,
            });
        };
        _this.touchMove = function (event) {
            event.stopPropagation();
            var _a = _this.state, touchStartPositionX = _a.touchStartPositionX, touchStartPositionY = _a.touchStartPositionY, calendarRef = _a.calendarRef;
            var calendarHeight = (calendarRef && calendarRef.offsetHeight) || 0;
            var calendarWidth = (calendarRef && calendarRef.offsetWidth) || 0;
            var _b = _this.props, disabledWeekView = _b.disabledWeekView, touchMoveCallback = _b.touchMoveCallback;
            touchMoveCallback && touchMoveCallback(event);
            var moveX = event.touches[0].clientX - touchStartPositionX;
            var moveY = event.touches[0].clientY - touchStartPositionY;
            if (Math.abs(moveX) > Math.abs(moveY)) {
                if ((moveX < 0 && !_this.isCanScroll('left')) ||
                    (moveX > 0 && !_this.isCanScroll('right'))) {
                    return;
                }
                _this.setState({ touch: { x: moveX / calendarWidth, y: 0 } });
            }
            else {
                // 禁用周视图（禁止上下滑动）
                if (disabledWeekView ||
                    (moveY < 0 && !_this.isCanScroll('up')) ||
                    (moveY > 0 && !_this.isCanScroll('down'))) {
                    return;
                }
                _this.setState({ touch: { x: 0, y: moveY / calendarHeight } });
            }
        };
        _this.touchEnd = function (event) {
            var _a = _this.state, touch = _a.touch, isShowWeek = _a.isShowWeek, transitionDuration = _a.transitionDuration, calendarRef = _a.calendarRef;
            var calendarHeight = (calendarRef && calendarRef.offsetHeight) || 0;
            var _b = _this.props, slideChangeCallback = _b.slideChangeCallback, touchEndCallback = _b.touchEndCallback;
            touchEndCallback && touchEndCallback(event);
            _this.setState({ isTouching: false });
            if (Math.abs(touch.x) > Math.abs(touch.y) && Math.abs(touch.x) > 0.2) {
                _this.setState({ currentChangeIsScroll: true }, function () {
                    if (touch.x > 0) {
                        slideChangeCallback && slideChangeCallback('right');
                        _this.getLastMonth();
                        if (isShowWeek) {
                            setTimeout(function () {
                                _this.setState({ isTouching: true });
                                _this.setState({ currentChangeIsScroll: true }, function () {
                                    _this.getLastWeek();
                                });
                            }, transitionDuration * 1000);
                        }
                    }
                    else if (touch.x < 0) {
                        slideChangeCallback && slideChangeCallback('left');
                        _this.getNextMonth();
                        if (isShowWeek) {
                            setTimeout(function () {
                                _this.setState({ isTouching: true });
                                _this.setState({ currentChangeIsScroll: true }, function () {
                                    _this.getNextWeek();
                                });
                            }, transitionDuration * 1000);
                        }
                    }
                });
            }
            if (Math.abs(touch.y) > Math.abs(touch.x) &&
                Math.abs(touch.y * calendarHeight) > 50) {
                if (touch.y > 0 && isShowWeek) {
                    slideChangeCallback && slideChangeCallback('down');
                    _this.showMonth();
                }
                else if (touch.y < 0 && !isShowWeek) {
                    slideChangeCallback && slideChangeCallback('up');
                    _this.showWeek();
                }
            }
            else {
                _this.setState({ touch: { x: 0, y: 0 } });
            }
        };
        // 显示上一周
        _this.getLastWeek = function () {
            var _a = _this.state, lastWeek = _a.lastWeek, selectedDayIndex = _a.selectedDayIndex, currentChangeIsScroll = _a.currentChangeIsScroll;
            var scrollChangeDate = _this.props.scrollChangeDate;
            var _checkedDate = lastWeek[selectedDayIndex];
            _this.showWeek(_checkedDate);
            if (_this.formatDisabledDate(_checkedDate))
                return;
            if (!scrollChangeDate && currentChangeIsScroll) {
                _this.setState({ currentChangeIsScroll: false });
                return;
            }
            _this.setState({ checkedDate: _checkedDate });
        };
        // 显示下一周
        _this.getNextWeek = function () {
            var _a = _this.state, nextWeek = _a.nextWeek, selectedDayIndex = _a.selectedDayIndex, currentChangeIsScroll = _a.currentChangeIsScroll;
            var scrollChangeDate = _this.props.scrollChangeDate;
            var _checkedDate = nextWeek[selectedDayIndex];
            _this.showWeek(_checkedDate);
            if (_this.formatDisabledDate(_checkedDate))
                return;
            if (!scrollChangeDate && currentChangeIsScroll) {
                _this.setState({ currentChangeIsScroll: false });
                return;
            }
            _this.setState({ checkedDate: _checkedDate });
        };
        // 获取上个月日历
        _this.getLastMonth = function () {
            var _a = _this.state, yearOfCurrentShow = _a.yearOfCurrentShow, monthOfCurrentShow = _a.monthOfCurrentShow, lastMonthYear = _a.lastMonthYear, lastMonth = _a.lastMonth, isLastWeekInCurrentMonth = _a.isLastWeekInCurrentMonth;
            _this.setState(function (preState) { return ({
                translateIndex: preState.translateIndex + 1,
            }); });
            var _yearOfCurrentShow = yearOfCurrentShow;
            var _monthOfCurrentShow = monthOfCurrentShow;
            if (!isLastWeekInCurrentMonth) {
                _yearOfCurrentShow = lastMonthYear;
                _monthOfCurrentShow = lastMonth;
            }
            _this.setState({
                yearOfCurrentShow: _yearOfCurrentShow,
                monthOfCurrentShow: _monthOfCurrentShow,
            });
            _this.calculateCalendarOfThreeMonth(_yearOfCurrentShow, _monthOfCurrentShow);
        };
        // 获取下个月日历
        _this.getNextMonth = function () {
            var _a = _this.state, yearOfCurrentShow = _a.yearOfCurrentShow, monthOfCurrentShow = _a.monthOfCurrentShow, nextMonthYear = _a.nextMonthYear, nextMonth = _a.nextMonth, isNextWeekInCurrentMonth = _a.isNextWeekInCurrentMonth;
            _this.setState(function (preState) { return ({
                translateIndex: preState.translateIndex - 1,
            }); });
            var _yearOfCurrentShow = yearOfCurrentShow;
            var _monthOfCurrentShow = monthOfCurrentShow;
            if (!isNextWeekInCurrentMonth) {
                _yearOfCurrentShow = nextMonthYear;
                _monthOfCurrentShow = nextMonth;
            }
            _this.setState({
                yearOfCurrentShow: _yearOfCurrentShow,
                monthOfCurrentShow: _monthOfCurrentShow,
            });
            _this.calculateCalendarOfThreeMonth(_yearOfCurrentShow, _monthOfCurrentShow);
        };
        // 是否可以滑动
        _this.isCanScroll = function (dire) {
            var disabledScroll = _this.props.disabledScroll;
            var scrollObj = {
                up: ['all', 'up', 'vertical'],
                down: ['all', 'down', 'vertical'],
                left: ['all', 'left', 'horizontal'],
                right: ['all', 'right', 'horizontal'],
            };
            var checkedScrollArr = scrollObj[dire];
            return !checkedScrollArr.some(function (item) { return item === disabledScroll; });
        };
        _this.formatDisabledDate = function (date) {
            var disabledDate = _this.props.disabledDate;
            var fDate = new Date(date.year + "/" + (date.month + 1) + "/" + date.day);
            return disabledDate(fDate);
        };
        _this.isFirstDayOfMonth = function (date, index) {
            return date.day === 1 && !_this.isNotCurrentMonthDay(date, index);
        };
        _this.isNotCurrentMonthDay = function (date, index) {
            var calendarOfMonth = _this.state.calendarOfMonth;
            if (!calendarOfMonth[index])
                return false;
            var dateOfCurrentShow = calendarOfMonth[index][15]; // 本月中间的日期一定为本月
            if (!dateOfCurrentShow)
                return false;
            return (date.year !== dateOfCurrentShow.year ||
                date.month !== dateOfCurrentShow.month);
        };
        _this.markDateColor = function (date, type) {
            var _a = _this.state, markDateTypeObj = _a.markDateTypeObj, markDateColorObj = _a.markDateColorObj;
            var dateString = date.year + "/" + _this.fillNumber(date.month + 1) + "/" + _this.fillNumber(date.day);
            var markDateTypeString = markDateTypeObj[dateString] || '';
            if (markDateTypeString.indexOf(type) === -1)
                return '';
            return markDateColorObj[dateString];
        };
        // 小于10，在前面补0
        _this.fillNumber = function (val) {
            return val > 9 ? val : '0' + val;
        };
        _this.isToday = function (date) {
            return (yearNow === date.year && monthNow === date.month && dayNow === date.day);
        };
        _this.isCheckedDay = function (date) {
            if (_this.formatDisabledDate(date))
                return false;
            var checkedDate = _this.state.checkedDate;
            return (checkedDate.year === date.year &&
                checkedDate.month === date.month &&
                checkedDate.day === date.day);
        };
        _this.clickCalendarDay = function (e, date) {
            if (!date)
                return;
            if (_this.formatDisabledDate(date))
                return;
            var dateClickCallback = _this.props.dateClickCallback;
            _this.setState({
                checkedDate: { year: date.year, month: date.month, day: date.day },
            }, function () {
                var _a = _this.state, lastMonth = _a.lastMonth, lastMonthYear = _a.lastMonthYear, nextMonth = _a.nextMonth, nextMonthYear = _a.nextMonthYear, isShowWeek = _a.isShowWeek;
                if (date.month === lastMonth && date.year === lastMonthYear) {
                    _this.getLastMonth();
                }
                if (date.month === nextMonth && date.year === nextMonthYear) {
                    _this.getNextMonth();
                }
                if (isShowWeek) {
                    _this.showWeek();
                }
            });
            dateClickCallback && dateClickCallback(date);
        };
        _this.calculateCalendarOfThreeMonth = function (year, month) {
            if (year === void 0) { year = yearNow; }
            if (month === void 0) { month = monthNow; }
            var _a = _this.state, currentChangeIsScroll = _a.currentChangeIsScroll, checkedDate = _a.checkedDate;
            var scrollChangeDate = _this.props.scrollChangeDate;
            var _b = _this.getNearYearAndMonth(year, month), lastMonthYear = _b.lastMonthYear, lastMonth = _b.lastMonth, nextMonthYear = _b.nextMonthYear, nextMonth = _b.nextMonth;
            _this.setState({
                lastMonthYear: lastMonthYear,
                lastMonth: lastMonth,
                nextMonthYear: nextMonthYear,
                nextMonth: nextMonth,
            });
            var firstMonth = _this.calculateCalendarOfMonth(lastMonthYear, lastMonth);
            var secondMonth = _this.calculateCalendarOfMonth(year, month);
            var thirdMonth = _this.calculateCalendarOfMonth(nextMonthYear, nextMonth);
            var calendarOfMonth = [];
            calendarOfMonth.push(firstMonth, secondMonth, thirdMonth);
            _this.setState({
                calendarOfMonth: calendarOfMonth,
                calendarOfMonthShow: JSON.parse(JSON.stringify(calendarOfMonth)),
            });
            if (!scrollChangeDate && currentChangeIsScroll) {
                _this.setState({
                    currentChangeIsScroll: false,
                });
                return;
            }
            // 改变日期选择的日期
            var tempDate;
            var day = checkedDate.day;
            if (day > 30 || (day > 28 && month === 1)) {
                day = _this.daysOfMonth(year)[month];
            }
            tempDate = { day: day, year: year, month: month };
            if (_this.formatDisabledDate(tempDate))
                return;
            _this.setState({
                checkedDate: { day: tempDate.day, year: year, month: month },
            });
        };
        _this.calculateCalendarOfMonth = function (year, month) {
            if (year === void 0) { year = yearNow; }
            if (month === void 0) { month = monthNow; }
            var calendarOfCurrentMonth = [];
            var _a = _this.state, weekStartIndex = _a.weekStartIndex, calendarDaysTotalLength = _a.calendarDaysTotalLength;
            var _b = _this.getNearYearAndMonth(year, month), lastMonthYear = _b.lastMonthYear, lastMonth = _b.lastMonth, nextMonthYear = _b.nextMonthYear, nextMonth = _b.nextMonth;
            // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期
            var dayOfWeek = _this.getDayOfWeek(year, month);
            var lastMonthDays = _this.daysOfMonth(year)[lastMonth]; // 上个月的总天数
            if (dayOfWeek < weekStartIndex) {
                dayOfWeek = 7 - weekStartIndex + dayOfWeek;
            }
            else {
                dayOfWeek -= weekStartIndex;
            }
            for (var i = 0; i < dayOfWeek; i++) {
                calendarOfCurrentMonth.push({
                    year: lastMonthYear,
                    month: lastMonth,
                    day: lastMonthDays - (dayOfWeek - 1 - i),
                });
            }
            // 当月日期
            for (var i = 0; i < _this.daysOfMonth(year)[month]; i++) {
                calendarOfCurrentMonth.push({ year: year, month: month, day: i + 1 });
            }
            // 在日历后面填充下个月的日期，补齐6行7列
            var fillDays = calendarDaysTotalLength - calendarOfCurrentMonth.length;
            for (var i = 0; i < fillDays; i++) {
                calendarOfCurrentMonth.push({
                    year: nextMonthYear,
                    month: nextMonth,
                    day: i + 1,
                });
            }
            return calendarOfCurrentMonth;
        };
        // 获取月份某一天是星期几
        _this.getDayOfWeek = function (year, month, day) {
            if (year === void 0) { year = yearNow; }
            if (month === void 0) { month = monthNow; }
            if (day === void 0) { day = 1; }
            var dayOfMonth = new Date(year, month, day); // 获取当月的第day天
            var dayOfWeek = dayOfMonth.getDay(); // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
            return dayOfWeek;
        };
        _this.daysOfMonth = function (year) {
            return [31, 28 + _this.isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        };
        // 判断是否为闰年
        _this.isLeap = function (year) {
            return year % 4 === 0
                ? year % 100 !== 0
                    ? 1
                    : year % 400 === 0
                        ? 1
                        : 0
                : 0;
        };
        _this.getNearYearAndMonth = function (year, month) {
            var lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份
            var lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份
            var nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份
            var nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份
            return { lastMonthYear: lastMonthYear, lastMonth: lastMonth, nextMonthYear: nextMonthYear, nextMonth: nextMonth };
        };
        return _this;
    }
    Calendar.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, lang = _a.lang, weekStart = _a.weekStart, onRef = _a.onRef, defaultDate = _a.defaultDate, isShowWeekView = _a.isShowWeekView, disabledWeekView = _a.disabledWeekView;
        var _b = this.state, weekArray = _b.weekArray, checkedDate = _b.checkedDate, isShowWeek = _b.isShowWeek;
        var language = __WEBPACK_IMPORTED_MODULE_1__language__["default"][lang];
        var calendarWeek = language.WEEK;
        var weekStartIndex = weekArray.indexOf(weekStart);
        var start = calendarWeek.slice(weekStartIndex);
        var end = calendarWeek.slice(0, weekStartIndex);
        onRef && onRef(this);
        if (isShowWeekView && disabledWeekView) {
            throw new Error("'isShowWeekView' and 'disabledWeekView' can't be used at the same time");
        }
        if (isShowWeekView) {
            setTimeout(function () {
                _this.showWeek();
            });
        }
        if (defaultDate) {
            this.setState({
                checkedDate: __assign(__assign({}, checkedDate), { year: defaultDate.getFullYear(), month: defaultDate.getMonth(), day: defaultDate.getDate() }),
            }, function () {
                _this.calculateCalendarOfThreeMonth(defaultDate.getFullYear(), defaultDate.getMonth());
                if (isShowWeek) {
                    _this.showWeek();
                }
            });
        }
        this.setState({
            language: language,
            weekStartIndex: weekStartIndex,
            calendarWeek: __spreadArrays(start, end),
        });
    };
    Calendar.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        var prevMarkDate = prevProps.markDate, prevShow = prevProps.show, prevIsShowWeekView = prevProps.isShowWeekView;
        var _a = this.props, markType = _a.markType, markDate = _a.markDate, show = _a.show, isShowWeekView = _a.isShowWeekView, heightCallback = _a.heightCallback, dateChangeCallback = _a.dateChangeCallback;
        var prevWeekStartIndex = prevState.weekStartIndex, prevCalendarGroupHeight = prevState.calendarGroupHeight, prevCheckedDate = prevState.checkedDate;
        var _b = this.state, checkedDate = _b.checkedDate, weekStartIndex = _b.weekStartIndex, calendarItemRef = _b.calendarItemRef, calendarWeekTitleHeight = _b.calendarWeekTitleHeight, markDateTypeObj = _b.markDateTypeObj, isShowWeek = _b.isShowWeek;
        var calendarItemHeight = (calendarItemRef && calendarItemRef.offsetHeight) || 0;
        var calendarGroupHeight = isShowWeek
            ? calendarItemHeight
            : calendarItemHeight * 6;
        if (markDate &&
            (!Object(__WEBPACK_IMPORTED_MODULE_3__utils_eq__["a" /* eq */])(prevMarkDate, markDate) || Object(__WEBPACK_IMPORTED_MODULE_3__utils_eq__["a" /* eq */])(markDateTypeObj, {})) &&
            !Object(__WEBPACK_IMPORTED_MODULE_3__utils_eq__["a" /* eq */])(markDate, [])) {
            markDate.forEach(function (item, index) {
                if (!item.color) {
                    var obj = { color: '', date: [] };
                    obj.color = '#1c71fb';
                    if (typeof item === 'string' || typeof item === 'number') {
                        item = [item];
                    }
                    obj.date = item || [];
                    markDate[index] = obj;
                }
                markDate[index].type = item.type || markType || '';
                markDate[index].date = _this.dateFormat(markDate[index].date);
            });
            var _markDateColorObj_1 = {};
            var _markDateTypeObj_1 = {};
            markDate.forEach(function (item) {
                if (Array.isArray(item.date)) {
                    item.date.forEach(function (date) {
                        _markDateColorObj_1[date] = item.color;
                        _markDateTypeObj_1[date] = item.type;
                    });
                }
            });
            this.setState({
                markDateColorObj: _markDateColorObj_1,
                markDateTypeObj: _markDateTypeObj_1,
            });
        }
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__utils_eq__["a" /* eq */])(prevCheckedDate, checkedDate)) {
            dateChangeCallback && dateChangeCallback(checkedDate);
        }
        if (prevWeekStartIndex !== weekStartIndex) {
            this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
        }
        if (prevShow !== show) {
            this.calculateCalendarOfThreeMonth(checkedDate.year, checkedDate.month);
            this.showMonth();
        }
        if (prevIsShowWeekView !== isShowWeekView) {
            if (isShowWeekView) {
                setTimeout(function () {
                    _this.showWeek();
                });
            }
            else {
                setTimeout(function () {
                    _this.showMonth();
                });
            }
        }
        console.log('Calendar -> componentDidUpdate -> prevCalendarGroupHeight', prevCalendarGroupHeight);
        console.log('Calendar -> componentDidUpdate -> calendarGroupHeight', calendarGroupHeight);
        if (prevCalendarGroupHeight !== calendarGroupHeight) {
            heightCallback &&
                heightCallback(calendarGroupHeight + calendarWeekTitleHeight);
            this.setState({ calendarGroupHeight: calendarGroupHeight });
        }
    };
    // 日期格式转换
    Calendar.prototype.dateFormat = function (dateArr) {
        dateArr.forEach(function (date, index) {
            dateArr[index] = Object(__WEBPACK_IMPORTED_MODULE_4__utils_util__["b" /* formatDate */])(date, 'YY/MM/DD');
        });
        return dateArr;
    };
    Calendar.prototype.render = function () {
        var _this = this;
        var _a = this.props, calendarTitleHeight = _a.calendarTitleHeight, show = _a.show, weekSlot = _a.weekSlot, daySlot = _a.daySlot, disabledClassName = _a.disabledClassName, firstDayOfMonthClassName = _a.firstDayOfMonthClassName, todayClassName = _a.todayClassName, checkedDayClassName = _a.checkedDayClassName, notCurrentMonthDayClassName = _a.notCurrentMonthDayClassName;
        var _b = this.state, calendarWeek = _b.calendarWeek, calendarItemRef = _b.calendarItemRef, calendarOfMonthShow = _b.calendarOfMonthShow, translateIndex = _b.translateIndex, isTouching = _b.isTouching, isShowWeek = _b.isShowWeek, touch = _b.touch, calendarY = _b.calendarY, transitionDuration = _b.transitionDuration;
        var calendarItemHeight = (calendarItemRef && calendarItemRef.offsetHeight) || 0;
        var calendarGroupHeight = isShowWeek
            ? calendarItemHeight
            : calendarItemHeight * 6;
        var weekNode = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_week", ref: this.weekTitleRef }, calendarWeek.map(function (item) { return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_item", key: "week-" + item },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p", { className: "calendar_day" }, (weekSlot && weekSlot(item)) || item))); })));
        var calendarItemNode = function (item, mIndex) {
            var language = _this.state.language;
            return item.map(function (date, index) { return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: __WEBPACK_IMPORTED_MODULE_5_classnames___default()('calendar_item', _this.formatDisabledDate(date) &&
                    (disabledClassName || 'calendar_item_disable')), ref: _this.calendarItemRef, key: "date-" + index, onClick: function (e) { return _this.clickCalendarDay(e, date); } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: __WEBPACK_IMPORTED_MODULE_5_classnames___default()('calendar_day', _this.isFirstDayOfMonth(date, mIndex)
                        ? firstDayOfMonthClassName || 'calendar_first_today'
                        : '', _this.isToday(date) ? todayClassName || 'calendar_day_today' : '', _this.isCheckedDay(date)
                        ? checkedDayClassName || 'calendar_day_checked'
                        : '', _this.isNotCurrentMonthDay(date, mIndex)
                        ? notCurrentMonthDayClassName || 'calendar_day_not'
                        : '', _this.markDateColor(date, 'circle') ? 'calendar_mark_circle' : ''), style: { borderColor: _this.markDateColor(date, 'circle') } }, (daySlot &&
                    daySlot(date, {
                        isMarked: !!(_this.markDateColor(date, 'circle') ||
                            _this.markDateColor(date, 'dot')),
                        isDisabledDate: _this.formatDisabledDate(date),
                        isToday: _this.isToday(date),
                        isChecked: _this.isCheckedDay(date),
                        isCurrentMonthDay: !_this.isNotCurrentMonthDay(date, mIndex),
                        isFirstDayOfMonth: _this.isFirstDayOfMonth(date, mIndex),
                    })) ||
                    (_this.isFirstDayOfMonth(date, mIndex)
                        ? language.MONTH && language.MONTH[date.month]
                        : date.day)),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { style: { background: _this.markDateColor(date, 'dot') }, className: "calendar_dot" }))); });
        };
        var calendarGroupNode = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", { style: { transform: "translate3d(" + -translateIndex * 100 + "%, 0, 0)" } }, calendarOfMonthShow.map(function (item, index) { return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", { className: "calendar_group_li", key: "group-" + index, style: {
                transform: "translate3d(" + (index - 1 + translateIndex + (isTouching ? touch.x : 0)) * 100 + "%, " + calendarY + "px, 0)",
                transitionDuration: (isTouching ? 0 : transitionDuration) + "s",
            } }, calendarItemNode(item, index))); })));
        var calendarBodyNode = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_group", style: { height: calendarGroupHeight + "px" }, ref: this.calendarRef, onTouchStart: this.touchStart, onTouchMove: this.touchMove, onTouchEnd: this.touchEnd }, calendarGroupNode));
        return show ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_body", style: { marginTop: calendarTitleHeight + 'px' } },
            weekNode,
            calendarBodyNode)) : null;
    };
    Calendar.defaultProps = defaultProps;
    return Calendar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));
/* harmony default export */ __webpack_exports__["a"] = (Calendar);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_util__ = __webpack_require__(2);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var defaultProps = {
    show: false,
    defaultTime: new Date(),
    minuteStep: 1,
};
var state = {
    hashID: [''],
    hashClass: '',
    timeRange: [''],
    timeOptions: {
        minHours: 24,
        minMinutes: 59,
        maxHours: 0,
        maxMinutes: 0,
    },
    checkedDate: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    },
    timeHeight: 0,
    timeStartY: 0,
    timeStartUp: 0,
};
var TimePicker = /** @class */ (function (_super) {
    __extends(TimePicker, _super);
    function TimePicker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = state;
        _this.initTimeArray = function () {
            var minuteStep = _this.props.minuteStep;
            var _a = _this.state, checkedDate = _a.checkedDate, hashClass = _a.hashClass, hashID = _a.hashID;
            var hours = [];
            var timeArray = [];
            for (var i = 0; i < 24; i++) {
                hours.push(i);
            }
            var minutes = [];
            for (var i = 0; i < 60; i++) {
                if (i % minuteStep === 0) {
                    minutes.push(i);
                }
            }
            timeArray.push(hours, minutes);
            _this.setState({ timeArray: timeArray });
            var checkHours = checkedDate.hours;
            var checkMinutes = checkedDate.minutes;
            var timeEle = document.querySelector("." + hashClass);
            if (!timeEle)
                return;
            var _timeHeight = getComputedStyle(timeEle).height || '';
            var timeHeight = parseFloat(_timeHeight.split('px')[0]);
            _this.setState({ timeHeight: timeHeight });
            var hoursUp = (2 - checkHours) * timeHeight;
            var hourEle = document.querySelector("#" + hashID[0]);
            var minuteEle = document.querySelector("#" + hashID[1]);
            if (!hourEle || !minuteEle)
                return;
            var minutesUp = (2 - checkMinutes / minuteStep) * timeHeight;
            hourEle.style.webkitTransform = 'translate3d(0px,' + hoursUp + 'px,0px)';
            minuteEle.style.webkitTransform =
                'translate3d(0px,' + minutesUp + 'px,0px)';
        };
        _this.timeTouchStart = function (e) {
            e.preventDefault();
            var timeStartY = e.changedTouches[0].pageY;
            _this.setState({ timeStartY: timeStartY });
            var eventEl = e.currentTarget;
            var transform = eventEl.style.webkitTransform;
            if (transform) {
                var timeStartUp = parseFloat(transform.split(' ')[1].split('px')[0]);
                _this.setState({ timeStartUp: timeStartUp });
            }
        };
        _this.timeTouchMove = function (e, index) {
            var _a = _this.state, timeStartY = _a.timeStartY, timeStartUp = _a.timeStartUp;
            var moveEndY = e.changedTouches[0].pageY;
            var Y = moveEndY - timeStartY;
            var eventEl = e.currentTarget;
            eventEl.style.webkitTransform =
                'translate3d(0px,' + (Y + timeStartUp) + 'px,0px)';
            if (Object(__WEBPACK_IMPORTED_MODULE_3__utils_util__["a" /* checkPlatform */])() === '2') {
                _this.timeTouchEnd(e, index);
                return false;
            }
        };
        _this.timeTouchEnd = function (e, index) {
            var _a = _this.props, minuteStep = _a.minuteStep, timeChangeCallback = _a.timeChangeCallback;
            var _b = _this.state, checkedDate = _b.checkedDate, timeStartUp = _b.timeStartUp, timeHeight = _b.timeHeight, timeArray = _b.timeArray;
            var eventEl = e.currentTarget;
            var transform = eventEl.style.webkitTransform;
            var endUp = timeStartUp;
            if (transform) {
                endUp = parseFloat(eventEl.style.webkitTransform.split(' ')[1].split('px')[0]);
            }
            var distance = Math.abs(endUp - timeStartUp);
            var upCount = Math.floor(distance / timeHeight) || 1;
            var halfWinWith = timeHeight / 2;
            var up = timeStartUp;
            if (endUp <= timeStartUp) {
                // 向上滑动 未过临界值
                if (distance <= halfWinWith) {
                    up = timeStartUp;
                }
                else {
                    up = timeStartUp - timeHeight * upCount;
                    if (timeArray && up < -(timeArray[index].length - 3) * timeHeight) {
                        up = -(timeArray[index].length - 3) * timeHeight;
                    }
                }
            }
            else {
                // 向下滑动 未过临界值
                if (distance <= halfWinWith) {
                    up = timeStartUp;
                }
                else {
                    up = timeStartUp + timeHeight * upCount;
                    if (up > timeHeight * 2) {
                        up = timeHeight * 2;
                    }
                }
            }
            var _checkedDate;
            if (index === 0) {
                var hours = 2 - Math.round(up / timeHeight);
                _checkedDate = __assign(__assign({}, checkedDate), { hours: hours });
            }
            else {
                var minute = 2 - Math.round(up / timeHeight);
                _checkedDate = __assign(__assign({}, checkedDate), { minutes: minute * minuteStep });
            }
            _this.setState({ checkedDate: _checkedDate });
            timeChangeCallback && timeChangeCallback(_checkedDate);
            eventEl.style.webkitTransition = 'transform 300ms';
            eventEl.style.webkitTransform = 'translate3d(0px,' + up + 'px,0px)';
        };
        _this.isBeSelectedTime = function (time, index) {
            // 是否为当前选中的时间
            var checkedDate = _this.state.checkedDate;
            return ((index === 0 && time === checkedDate.hours) ||
                (index === 1 && time === checkedDate.minutes));
        };
        // 小于10，在前面补0
        _this.fillNumber = function (val) {
            return val > 9 ? val : '0' + val;
        };
        return _this;
    }
    TimePicker.prototype.componentDidMount = function () {
        var _a = this.props, defaultTime = _a.defaultTime, timeChangeCallback = _a.timeChangeCallback;
        var checkedDate = this.state.checkedDate;
        this.setState({
            hashID: [
                "time" + Math.floor(Math.random() * 1000000),
                "time" + Math.floor(Math.random() * 1000000),
            ],
            hashClass: "time_item_" + Math.floor(Math.random() * 1000000),
        });
        if (defaultTime) {
            var _checkedDate = __assign(__assign({}, checkedDate), { hours: defaultTime.getHours(), minutes: defaultTime.getMinutes() });
            this.setState({ checkedDate: _checkedDate });
            timeChangeCallback && timeChangeCallback(_checkedDate);
        }
    };
    TimePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        var showPrev = prevProps.show;
        var show = this.props.show;
        if (show !== showPrev && show) {
            setTimeout(function () {
                _this.initTimeArray();
            });
        }
    };
    TimePicker.prototype.render = function () {
        var _this = this;
        var show = this.props.show;
        var _a = this.state, timeArray = _a.timeArray, hashID = _a.hashID, hashClass = _a.hashClass;
        var timeItemNode = function (timeArr, parentIndex) {
            return timeArr.map(function (time, index) { return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: __WEBPACK_IMPORTED_MODULE_2_classnames___default()('time_item', { time_item_show: _this.isBeSelectedTime(time, parentIndex) }, hashClass), key: index }, _this.fillNumber(time))); });
        };
        var timeContentNode = function (timeArray) {
            return (timeArray &&
                timeArray.map(function (item, index) { return (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "time_content", id: hashID[index], key: index, onTouchStart: _this.timeTouchStart, onTouchMove: function (event) {
                        _this.timeTouchMove(event, index);
                    }, onTouchEnd: function (event) {
                        _this.timeTouchEnd(event, index);
                    } }, timeItemNode(item, index))); }));
        };
        return show ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "time_body" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "time_group" }, timeContentNode(timeArray)))) : null;
    };
    TimePicker.defaultProps = defaultProps;
    return TimePicker;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));
/* harmony default export */ __webpack_exports__["a"] = (TimePicker);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datetimePicker__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReactHashCalendar", function() { return __WEBPACK_IMPORTED_MODULE_0__datetimePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return __WEBPACK_IMPORTED_MODULE_1__calendar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timePicker__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TimePicker", function() { return __WEBPACK_IMPORTED_MODULE_2__timePicker__["a"]; });




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__calendar__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timePicker__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__language__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_styl__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__style_styl__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};







var defaultProps = {
    model: 'inline',
    pickerType: 'datetime',
    format: '',
    visible: false,
    isShowAction: true,
    showTodayButton: true,
    defaultDatetime: new Date(),
    disabledDate: function (date) { return false; },
    lang: 'CN',
    // calendar props
    disabledWeekView: false,
    isShowWeekView: false,
    scrollChangeDate: true,
    firstDayOfMonthClassName: '',
    todayClassName: '',
    checkedDayClassName: '',
    disabledClassName: '',
    notCurrentMonthDayClassName: '',
    weekStart: 'Sunday',
    markType: 'dot',
    disabledScroll: '',
    // timePicker props
    minuteStep: 1,
};
var state = {
    language: {
        CONFIRM: '',
        TODAY: '',
        WEEK: [''],
        MONTH: [''],
        DEFAULT_DATE_FORMAT: 'YY年MM月DD日',
        DEFAULT_TIME_FORMAT: 'hh:mm',
    },
    checkedDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
    },
    isShowCalendar: false,
    isShowDatetimePicker: false,
    calendarBodyHeight: 0,
    calendarContentHeight: 0,
    calendarTitleHeight: 0,
    calendarTitleRefHeight: 0,
    firstTimes: true,
};
var ReactHashCalendar = /** @class */ (function (_super) {
    __extends(ReactHashCalendar, _super);
    function ReactHashCalendar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = state;
        // 显示时间选择控件
        _this.showTime = function () {
            _this.setState({ isShowCalendar: false });
        };
        _this.showCalendar = function () {
            _this.setState({ isShowCalendar: true });
        };
        _this.show = function () {
            var onVisibleChange = _this.props.onVisibleChange;
            _this.setState({ isShowDatetimePicker: true });
            _this.setState({ isShowCalendar: true });
            onVisibleChange && onVisibleChange(true);
        };
        _this.close = function () {
            var onVisibleChange = _this.props.onVisibleChange;
            _this.setState({ isShowDatetimePicker: false });
            onVisibleChange && onVisibleChange(false);
        };
        _this.today = function () {
            var disabledDate = _this.props.disabledDate;
            if (disabledDate(new Date()))
                return;
            var calendarRef = _this.state.calendarRef;
            calendarRef && calendarRef.today();
        };
        _this.confirm = function () {
            var _a = _this.props, format = _a.format, model = _a.model, lang = _a.lang, dateConfirmCallback = _a.dateConfirmCallback;
            var checkedDate = _this.state.checkedDate;
            var date = new Date(checkedDate.year + "/" + (checkedDate.month + 1) + "/" + checkedDate.day + " " + checkedDate.hours + ":" + checkedDate.minutes);
            if (format) {
                date = Object(__WEBPACK_IMPORTED_MODULE_4__utils_util__["b" /* formatDate */])(date, format, lang);
            }
            dateConfirmCallback && dateConfirmCallback(date);
            if (model === 'dialog') {
                _this.close();
            }
        };
        _this.dateChange = function (date) {
            var checkedDate = _this.state.checkedDate;
            _this.setState({
                checkedDate: __assign(__assign({}, checkedDate), date),
            });
        };
        _this.timeChange = function (time) {
            var checkedDate = _this.state.checkedDate;
            _this.setState({
                checkedDate: __assign(__assign({}, checkedDate), time),
            });
        };
        _this.heightChange = function (height) {
            console.log('heightChange -> height', height);
            var _a = _this.state, firstTimes = _a.firstTimes, calendarTitleHeight = _a.calendarTitleHeight;
            var model = _this.props.model;
            if (!firstTimes && model === 'dialog')
                return;
            _this.setState({
                calendarBodyHeight: height,
                calendarContentHeight: height + calendarTitleHeight,
                firstTimes: false,
            });
        };
        // 小于10，在前面补0
        _this.fillNumber = function (val) { return (val > 9 ? val : '0' + val); };
        _this.calendarTitleRef = function (ref) {
            if (!ref)
                return;
            var height = ref.offsetHeight;
            _this.setState({
                calendarTitleRefHeight: height,
            });
        };
        _this.stopEvent = function (e) {
            e.stopPropagation();
        };
        _this.onCalendarRef = function (ref) {
            _this.setState({
                calendarRef: ref,
            });
        };
        // 监听手指开始滑动事件
        _this.touchStart = function (event) {
            var touchStartCallback = _this.props.touchStartCallback;
            touchStartCallback && touchStartCallback(event);
        };
        // 监听手指开始滑动事件
        _this.touchMove = function (event) {
            var touchMoveCallback = _this.props.touchMoveCallback;
            touchMoveCallback && touchMoveCallback(event);
        };
        // 监听手指开始滑动事件
        _this.touchEnd = function (event) {
            var touchEndCallback = _this.props.touchEndCallback;
            touchEndCallback && touchEndCallback(event);
        };
        // 滑动方向改变
        _this.slideChange = function (direction) {
            var slideChangeCallback = _this.props.slideChangeCallback;
            slideChangeCallback && slideChangeCallback(direction);
        };
        _this.dateClick = function (date) {
            var checkedDate = _this.state.checkedDate;
            var _a = _this.props, dateClickCallback = _a.dateClickCallback, format = _a.format, lang = _a.lang;
            var _checkedDate = __assign(__assign({}, checkedDate), date);
            var fDate = new Date(_checkedDate.year + "/" + (_checkedDate.month + 1) + "/" + _checkedDate.day + " " + _checkedDate.hours + ":" + _checkedDate.minutes);
            if (format) {
                fDate = Object(__WEBPACK_IMPORTED_MODULE_4__utils_util__["b" /* formatDate */])(fDate, format, lang);
            }
            _this.setState({
                checkedDate: _checkedDate,
            });
            dateClickCallback && dateClickCallback(fDate);
        };
        return _this;
    }
    ReactHashCalendar.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, model = _a.model, lang = _a.lang, onVisibleChange = _a.onVisibleChange;
        if (model === 'inline') {
            this.setState({ isShowDatetimePicker: true });
            onVisibleChange && onVisibleChange(true);
        }
        this.setState({ language: __WEBPACK_IMPORTED_MODULE_5__language__["default"][lang] });
        setTimeout(function () {
            _this.setState({ isShowCalendar: true });
        });
    };
    ReactHashCalendar.prototype.componentDidUpdate = function (prevProps) {
        var pickerType = prevProps.pickerType;
        var _a = this.props, isShowAction = _a.isShowAction, visible = _a.visible;
        var _b = this.state, isShowCalendar = _b.isShowCalendar, isShowDatetimePicker = _b.isShowDatetimePicker, calendarTitleRefHeight = _b.calendarTitleRefHeight, calendarBodyHeight = _b.calendarBodyHeight, calendarTitleHeight = _b.calendarTitleHeight, calendarContentHeight = _b.calendarContentHeight;
        if (isShowCalendar && pickerType === 'time') {
            this.showTime();
        }
        if (visible && !isShowDatetimePicker) {
            this.show();
        }
        if (calendarTitleHeight !== calendarTitleRefHeight ||
            calendarContentHeight !== calendarTitleRefHeight + calendarBodyHeight) {
            if (!isShowAction) {
                this.setState({ calendarTitleHeight: 0 });
            }
            else {
                this.setState({
                    calendarTitleHeight: calendarTitleRefHeight,
                    calendarContentHeight: calendarTitleRefHeight + calendarBodyHeight,
                });
            }
        }
    };
    ReactHashCalendar.prototype.formatDate = function (time, format) {
        var lang = this.props.lang;
        return Object(__WEBPACK_IMPORTED_MODULE_4__utils_util__["b" /* formatDate */])(time, format, lang);
    };
    ReactHashCalendar.prototype.render = function () {
        var _a = this.props, model = _a.model, isShowAction = _a.isShowAction, disabledDate = _a.disabledDate, showTodayButton = _a.showTodayButton, pickerType = _a.pickerType, todaySlot = _a.todaySlot, actionSlot = _a.actionSlot, confirmSlot = _a.confirmSlot, defaultDatetime = _a.defaultDatetime;
        var _b = this.state, calendarTitleHeight = _b.calendarTitleHeight, calendarContentHeight = _b.calendarContentHeight, isShowDatetimePicker = _b.isShowDatetimePicker, isShowCalendar = _b.isShowCalendar, checkedDate = _b.checkedDate, language = _b.language;
        console.log('render -> calendarContentHeight', calendarContentHeight);
        var dateNode = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('calendar_title_date_year', {
                calendar_title_date_active: isShowCalendar,
            }), onClick: this.showCalendar }, this.formatDate(checkedDate.year + "/" + (checkedDate.month + 1) + "/" + checkedDate.day, language.DEFAULT_DATE_FORMAT)));
        var timeNode = (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span", { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('calendar_title_date_time', {
                calendar_title_date_active: !isShowCalendar,
            }), onClick: this.showTime }, this.formatDate(checkedDate.year + "/" + (checkedDate.month + 1) + "/" + checkedDate.day + " " + this.fillNumber(checkedDate.hours) + ":" + this.fillNumber(checkedDate.minutes), language.DEFAULT_TIME_FORMAT)));
        var actionNode = actionSlot || (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_title", ref: this.calendarTitleRef },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_title_date" },
                pickerType !== 'time' ? dateNode : '',
                pickerType !== 'date' ? timeNode : ''),
            showTodayButton ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('calendar_confirm', {
                    today_disable: disabledDate(new Date()),
                }), onClick: this.today }, todaySlot || language.TODAY)) : null,
            model === 'dialog' ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_confirm", onClick: this.confirm }, confirmSlot || language.CONFIRM)) : null));
        return isShowDatetimePicker ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('hash-calendar', {
                calendar_inline: model === 'inline',
            }), style: {
                height: (model === 'inline' ? calendarContentHeight : undefined) + "px",
            }, onClick: this.close },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "calendar_content", style: { height: calendarContentHeight + "px" }, onClick: this.stopEvent },
                isShowAction ? actionNode : null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__calendar__["a" /* default */], __assign({ onRef: this.onCalendarRef }, this.props, { defaultDate: defaultDatetime, calendarTitleHeight: calendarTitleHeight, show: isShowCalendar, slideChangeCallback: this.slideChange, dateChangeCallback: this.dateChange, heightCallback: this.heightChange, touchStartCallback: this.touchStart, touchMoveCallback: this.touchMove, touchEndCallback: this.touchEnd, dateClickCallback: this.dateClick })),
                pickerType !== 'date' ? (__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__timePicker__["a" /* default */], __assign({ show: !isShowCalendar }, this.props, { defaultTime: defaultDatetime, timeChangeCallback: this.timeChange }))) : null))) : null;
    };
    ReactHashCalendar.defaultProps = defaultProps;
    return ReactHashCalendar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component));
/* harmony default export */ __webpack_exports__["a"] = (ReactHashCalendar);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * @Description:中文
 * @Author: TSY
 * @Date: 2020-09-08 23:12:02
 * @LastEditTime: 2020-09-09 22:22:01
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    CONFIRM: '确定',
    TODAY: '今天',
    WEEK: ['日', '一', '二', '三', '四', '五', '六'],
    MONTH: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
    ],
    DEFAULT_DATE_FORMAT: 'YY年MM月DD日',
    DEFAULT_TIME_FORMAT: 'hh:mm',
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @Description:   英文
 * @Author:         TSY
 * @CreateDate:     2020/3/22 21:59
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    CONFIRM: 'CONFIRM',
    TODAY: 'TODAY',
    WEEK: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    MONTH: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    DEFAULT_DATE_FORMAT: 'MM DD,YY',
    DEFAULT_TIME_FORMAT: 'at hh:mm F'
});


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SCROLL_DIRECTION_LIST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WEEK_LIST; });
/* unused harmony export DIRECTION_LIST */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__type__ = __webpack_require__(13);
/*
 * @Description:
 * @Author: TSY
 * @Date: 2020-10-28 23:32:59
 * @LastEditTime: 2020-10-28 23:35:13
 */

var SCROLL_DIRECTION_LIST = Object(__WEBPACK_IMPORTED_MODULE_0__type__["a" /* tuple */])('left', 'right', 'up', 'down');
var WEEK_LIST = Object(__WEBPACK_IMPORTED_MODULE_0__type__["a" /* tuple */])('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var DIRECTION_LIST = Object(__WEBPACK_IMPORTED_MODULE_0__type__["a" /* tuple */])('', 'all', 'left', 'right', 'up', 'down', 'horizontal', 'vertical');


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tuple; });
/* unused harmony export tupleNum */
// https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
var tuple = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};
var tupleNum = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args;
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return eq; });
var toString = Object.prototype.toString;
function isFunction(obj) {
    return toString.call(obj) === '[object Function]';
}
var eq = function (a, b, aStack, bStack) {
    // === 结果为 true 的区别出 +0 和 -0
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
    if (a == null || b == null)
        return false;
    // 判断 NaN
    // eslint-disable-next-line
    if (a !== a)
        return b !== b;
    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object')
        return false;
    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack);
};
function deepEq(a, b, aStack, bStack) {
    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b;
        case '[object Number]':
            // eslint-disable-next-line
            if (+a !== +a)
                return +b !== +b;
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b;
    }
    var areArrays = className === '[object Array]';
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a != 'object' || typeof b != 'object')
            return false;
        var aCtor = a.constructor, bCtor = b.constructor;
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (aCtor === bCtor &&
            !(isFunction(aCtor) &&
                aCtor instanceof aCtor &&
                isFunction(bCtor) &&
                bCtor instanceof bCtor) &&
            'constructor' in a &&
            'constructor' in b) {
            return false;
        }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b;
        }
    }
    aStack.push(a);
    bStack.push(b);
    // 数组判断
    if (areArrays) {
        length = a.length;
        if (length !== b.length)
            return false;
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    }
    // 对象判断
    else {
        var keys = Object.keys(a), key;
        length = keys.length;
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            key = keys[length];
            if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    aStack.pop();
    bStack.pop();
    return true;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".click_item:active {\n  background: #eee;\n}\n.mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.5);\n  z-index: 999;\n}\n.pulldown-wrapper {\n  top: -150px;\n}\n.iconfont {\n  font-size: 34px;\n  font-size: 4.533333333333333vw;\n}\n.hash-calendar .calendar_body {\n  position: relative;\n  width: 100%;\n  margin-top: 13.333333333333334vw;\n}\n.hash-calendar .calendar_week {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 0;\n  display: flex;\n  align-items: center;\n  background: #fff;\n  color: #898989;\n  z-index: 2;\n}\n.hash-calendar .calendar_group {\n  position: absolute;\n  top: 9.333333333333334vw;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  overflow: hidden;\n  transition: height 0.3s;\n  -webkit-transition: height 0.3s;\n}\n.hash-calendar .calendar_group ul {\n  height: 100%;\n}\n.hash-calendar .calendar_group_li {\n  position: absolute;\n  top: 0;\n  left: 0.533333333333333vw;\n  bottom: 0;\n  right: 0;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  background: #fff;\n  will-change: transform;\n}\n.hash-calendar .calendar_item {\n  width: 14.13333335%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n}\n.hash-calendar .calendar_item_disable {\n  background-color: #f5f7fa;\n  opacity: 1;\n  cursor: not-allowed;\n  color: #c0c4cc;\n}\n.hash-calendar .calendar_day {\n  width: 8vw;\n  height: 8vw;\n  border-radius: 50%;\n  font-size: 28px;\n  font-size: 3.733333333333334vw;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 1.066666666666667vw;\n}\n.hash-calendar .calendar_first_today {\n  color: #1c71fb;\n}\n.hash-calendar .calendar_first_today span {\n  font-size: 20px;\n  font-size: 2.666666666666667vw;\n  margin-top: 0.4vw;\n}\n.hash-calendar .calendar_day_today {\n  background: #f4f4f4;\n}\n.hash-calendar .calendar_mark_circle {\n  border: 1px solid #1c71fb;\n}\n.hash-calendar .calendar_day_not {\n  color: #c0c4cc;\n}\n.hash-calendar .calendar_day_checked {\n  background: #1c71fb;\n  color: #fff;\n}\n.hash-calendar .calendar_dot {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".click_item:active {\n  background: #eee;\n}\n.mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.5);\n  z-index: 999;\n}\n.pulldown-wrapper {\n  top: -150px;\n}\n.iconfont {\n  font-size: 34px;\n  font-size: 4.533333333333333vw;\n}\n.hash-calendar .time_body {\n  width: 100%;\n  margin-top: 13.333333333333334vw;\n}\n.hash-calendar .time_group {\n  width: 100%;\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  height: 48vw;\n  margin-top: 13.333333333333334vw;\n  -webkit-overflow-scrolling: touch;\n  overflow: hidden;\n}\n.hash-calendar .time_content {\n  touch-action: none;\n  padding: 0 5.333333333333334vw;\n  -webkit-overflow-scrolling: touch;\n}\n.hash-calendar .time_item {\n  padding: 2.666666666666667vw 0;\n  color: #898989;\n}\n.hash-calendar .time_item_show {\n  color: #4c4c4c;\n}\n.hash-calendar .time_disabled {\n  color: #f00;\n}\n", ""]);

// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/stylus-loader/index.js!./style.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, ".click_item:active {\n  background: #eee;\n}\n.mask {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.5);\n  z-index: 999;\n}\n.pulldown-wrapper {\n  top: -150px;\n}\n.iconfont {\n  font-size: 34px;\n  font-size: 4.533333333333333vw;\n}\n.hash-calendar {\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  background: rgba(0,0,0,0.6);\n  z-index: 999;\n}\n.hash-calendar.calendar_inline {\n  position: relative;\n  width: 100%;\n  height: auto;\n  background: none;\n  height: 94.66666666666667vw;\n  z-index: 1;\n}\n.hash-calendar .calendar_content {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  padding-bottom: 3.466666666666666vw;\n  flex-wrap: wrap;\n  background: #fff;\n  height: 94.66666666666667vw;\n  overflow: hidden;\n}\n.hash-calendar .calendar_title {\n  position: absolute;\n  width: 100%;\n  left: 0;\n  top: 0;\n  background: #f4f4f4;\n  border-bottom: 1px solid #f4f4f4;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  z-index: 1;\n}\n.hash-calendar .calendar_title_date {\n  color: #898989;\n  background: #fff;\n  padding: 4vw 2vw;\n}\n.hash-calendar .calendar_title_date_active {\n  color: #4c4c4c;\n  font-weight: bold;\n}\n.hash-calendar .calendar_title_date_time {\n  margin-left: 2.666666666666667vw;\n}\n.hash-calendar .calendar_confirm {\n  color: #1c71fb;\n  margin-right: 4.533333333333333vw;\n}\n.hash-calendar .today_disable {\n  color: #c0c4cc;\n}\n", ""]);

// exports


/***/ })
/******/ ]);
});
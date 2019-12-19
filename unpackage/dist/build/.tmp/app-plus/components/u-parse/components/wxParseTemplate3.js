(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate3"],{"4c7a":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return t.e("components/u-parse/components/wxParseTemplate4").then(t.bind(null,"b9a1"))},a=function(){return t.e("components/u-parse/components/wxParseImg").then(t.bind(null,"064e"))},o=function(){return t.e("components/u-parse/components/wxParseVideo").then(t.bind(null,"f5ff"))},u=function(){return t.e("components/u-parse/components/wxParseAudio").then(t.bind(null,"55df"))},s={name:"wxParseTemplate3",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:a,wxParseVideo:o,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=s},7684:function(e,n,t){"use strict";t.r(n);var r=t("4c7a"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=a.a},f3bf:function(e,n,t){"use strict";t.r(n);var r=t("f8ca"),a=t("7684");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);var u=t("2877"),s=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);n["default"]=s.exports},f8ca:function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return a})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate3-create-component',
    {
        'components/u-parse/components/wxParseTemplate3-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("f3bf"))
        })
    },
    [['components/u-parse/components/wxParseTemplate3-create-component']]
]);                

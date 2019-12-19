(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/u-parse/components/wxParseTemplate4"],{1848:function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},a=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return a})},"3e32":function(e,n,t){"use strict";t.r(n);var r=t("c548"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=a.a},b9a1:function(e,n,t){"use strict";t.r(n);var r=t("1848"),a=t("3e32");for(var o in a)"default"!==o&&function(e){t.d(n,e,function(){return a[e]})}(o);var u=t("2877"),s=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);n["default"]=s.exports},c548:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=function(){return t.e("components/u-parse/components/wxParseTemplate5").then(t.bind(null,"c665"))},a=function(){return t.e("components/u-parse/components/wxParseImg").then(t.bind(null,"064e"))},o=function(){return t.e("components/u-parse/components/wxParseVideo").then(t.bind(null,"f5ff"))},u=function(){return t.e("components/u-parse/components/wxParseAudio").then(t.bind(null,"55df"))},s={name:"wxParseTemplate4",props:{node:{}},components:{wxParseTemplate:r,wxParseImg:a,wxParseVideo:o,wxParseAudio:u},methods:{wxParseATap:function(e){var n=e.currentTarget.dataset.href;if(n){var t=this.$parent;while(!t.preview||"function"!==typeof t.preview)t=t.$parent;t.navigate(n,e)}}}};n.default=s}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/u-parse/components/wxParseTemplate4-create-component',
    {
        'components/u-parse/components/wxParseTemplate4-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("b9a1"))
        })
    },
    [['components/u-parse/components/wxParseTemplate4-create-component']]
]);                

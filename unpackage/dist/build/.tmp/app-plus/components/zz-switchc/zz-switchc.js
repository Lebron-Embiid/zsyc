(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zz-switchc/zz-switchc"],{"068b":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return u})},"5d96":function(t,e,n){},"7b04":function(t,e,n){"use strict";n.r(e);var i=n("d5ea"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=u.a},bf8b:function(t,e,n){"use strict";n.r(e);var i=n("068b"),u=n("7b04");for(var a in u)"default"!==a&&function(t){n.d(e,t,function(){return u[t]})}(a);n("e469");var c=n("2877"),s=Object(c["a"])(u["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},d5ea:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"switchComponent",props:{value:{type:Boolean,default:!1},bgcolor:{type:String,default:"#ff9900"},width:{type:Number,default:52},text:{type:String,default:""},sid:{type:Number,default:0}},data:function(){return{isChecked:this.value}},computed:{direction:function(){return this.text?this.text.split("|"):[]}},watch:{value:function(t){this.isChecked=t},isChecked:function(t){var e="";t&&(e=this.text.split("|")[0]),t||(e=this.text.split("|")[1]);var n={sid:this.sid,value:t,text:e};this.$emit("change",n)}},methods:{toggle:function(t){this.isChecked=!this.isChecked}}};e.default=i},e469:function(t,e,n){"use strict";var i=n("5d96"),u=n.n(i);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zz-switchc/zz-switchc-create-component',
    {
        'components/zz-switchc/zz-switchc-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("bf8b"))
        })
    },
    [['components/zz-switchc/zz-switchc-create-component']]
]);                

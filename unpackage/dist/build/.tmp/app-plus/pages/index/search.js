(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/search"],{"1a23":function(e,t,o){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},r=[];o.d(t,"a",function(){return n}),o.d(t,"b",function(){return r})},"2a00":function(e,t,o){},3415:function(e,t,o){"use strict";(function(e){o("a6c6"),o("921b");n(o("66fd"));var t=n(o("9bc1"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("6e42")["createPage"])},"4ab9":function(e,t,o){"use strict";o.r(t);var n=o("e8b5"),r=o.n(n);for(var a in n)"default"!==a&&function(e){o.d(t,e,function(){return n[e]})}(a);t["default"]=r.a},"8d7c":function(e,t,o){"use strict";var n=o("2a00"),r=o.n(n);r.a},"9bc1":function(e,t,o){"use strict";o.r(t);var n=o("1a23"),r=o("4ab9");for(var a in r)"default"!==a&&function(e){o.d(t,e,function(){return r[e]})}(a);o("8d7c");var i=o("2877"),s=Object(i["a"])(r["default"],n["a"],n["b"],!1,null,null,null);t["default"]=s.exports},e8b5:function(e,t,o){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){return o.e("components/mehaotian-search-revision/mehaotian-search-revision").then(o.bind(null,"bd2d"))},a={data:function(){return{defaultKeyword:"",keyword:"",oldKeywordList:[],hotKeywordList:[],keywordList:[],forbid:"",isShowKeywordList:!1}},onLoad:function(){this.init()},components:{mSearch:r},methods:{init:function(){this.loadDefaultKeyword(),this.loadOldKeyword(),this.loadHotKeyword()},blur:function(){e.hideKeyboard()},loadDefaultKeyword:function(){this.defaultKeyword="默认关键字"},loadOldKeyword:function(){var t=this;e.getStorage({key:"OldKeys",success:function(e){var o=JSON.parse(e.data);t.oldKeywordList=o}})},loadHotKeyword:function(){this.hotKeywordList=["键盘","鼠标","显示器","电脑主机","蓝牙音箱","笔记本电脑","鼠标垫","USB","USB3.0"]},inputChange:function(t){var o=this,n=t.detail?t.detail.value:t;if(!n)return this.keywordList=[],void(this.isShowKeywordList=!1);this.isShowKeywordList=!0,e.request({url:"https://suggest.taobao.com/sug?code=utf-8&q="+n,success:function(e){o.keywordList=o.drawCorrelativeKeyword(e.data.result,n)}})},drawCorrelativeKeyword:function(e,t){for(var o=e.length,n=[],r=0;r<o;r++){var a=e[r],i=a[0].replace(t,"<span style='color: #9f9f9f;'>"+t+"</span>");i="<div>"+i+"</div>";var s={keyword:a[0],htmlStr:i};n.push(s)}return n},setkeyword:function(e){this.keyword=e.keyword},oldDelete:function(){var t=this;e.showModal({content:"确定清除历史搜索记录？",success:function(o){o.confirm?(console.log(n("用户点击确定"," at pages\\index\\search.vue:155")),t.oldKeywordList=[],e.removeStorage({key:"OldKeys"})):o.cancel&&console.log(n("用户点击取消"," at pages\\index\\search.vue:161"))}})},hotToggle:function(){this.forbid=this.forbid?"":"_forbid"},doSearch:function(t){t=t||(this.keyword?this.keyword:this.defaultKeyword),this.keyword=t,this.saveKeyword(t),e.showToast({title:t,icon:"none",duration:2e3}),plus.runtime.openURL(encodeURI("taobao://s.taobao.com/search?q="+t))},saveKeyword:function(t){var o=this;e.getStorage({key:"OldKeys",success:function(r){console.log(n(r.data," at pages\\index\\search.vue:193"));var a=JSON.parse(r.data),i=a.indexOf(t);-1==i?a.unshift(t):(a.splice(i,1),a.unshift(t)),a.length>10&&a.pop(),e.setStorage({key:"OldKeys",data:JSON.stringify(a)}),o.oldKeywordList=a},fail:function(n){var r=[t];e.setStorage({key:"OldKeys",data:JSON.stringify(r)}),o.oldKeywordList=r}})}}};t.default=a}).call(this,o("6e42")["default"],o("0de9")["default"])}},[["3415","common/runtime","common/vendor"]]]);
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/detail"],{"2e8e":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},n=[];s.d(e,"a",function(){return i}),s.d(e,"b",function(){return n})},"4f06":function(t,e,s){},"4f5e":function(t,e,s){"use strict";var i=s("4f06"),n=s.n(i);n.a},"7aa4":function(t,e,s){"use strict";s.r(e);var i=s("c67c"),n=s.n(i);for(var a in i)"default"!==a&&function(t){s.d(e,t,function(){return i[t]})}(a);e["default"]=n.a},"944f":function(t,e,s){"use strict";s.r(e);var i=s("2e8e"),n=s("7aa4");for(var a in n)"default"!==a&&function(t){s.d(e,t,function(){return n[t]})}(a);s("4f5e");var o=s("2877"),c=Object(o["a"])(n["default"],i["a"],i["b"],!1,null,"170a6d27",null);e["default"]=c.exports},c67c:function(t,e,s){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){return Promise.all([s.e("common/vendor"),s.e("components/u-parse/u-parse")]).then(s.bind(null,"b5e5"))},a={data:function(){return{beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,showBack:!0,swiperList:[],currentSwiper:0,anchorlist:[],selectAnchor:0,serviceClass:"",specClass:"",shareClass:"",goodsData:{id:"",name:"",price:"",stock:"",number:1},goods_id:"",selectSpec:null,isKeep:!1,content:"",url:"",btn:0}},components:{uParse:n},onLoad:function(e){var s=this;this.url=this.$http.url,console.log(t(e.cid," at pages\\index\\detail.vue:244")),void 0!=e.name&&(i.setNavigationBarTitle({title:e.name}),this.goods_id=e.cid),this.$http.getStoreDetails({g_id:e.cid}).then(function(t){var e=t.data;s.goodsData.id=e.id,s.goodsData.name=e.name,s.goodsData.price=e.price,s.goodsData.old_price=e.old_price,s.goodsData.stock=e.stock,s.swiperList=e.pic_list,s.content=null==e.content?"":e.content})},onShow:function(){this.calcAnchor()},onPageScroll:function(t){this.selectAnchor=t.scrollTop>=this.anchorlist[2].top?2:t.scrollTop>=this.anchorlist[1].top?1:0;var e=375;t.scrollTop=t.scrollTop>e?375:t.scrollTop,this.afterHeaderOpacity=t.scrollTop*(1/e),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=t.scrollTop>0?10:11,this.afterHeaderzIndex=t.scrollTop>0?11:10},methods:{swiperChange:function(t){this.currentSwiper=t.detail.current},share:function(){this.shareClass="show"},hideShare:function(){var t=this;this.shareClass="hide",setTimeout(function(){t.shareClass="none"},150)},keep:function(){this.isKeep=!this.isKeep},joinCart:function(){this.btn=0,this.showSpec(!1)},buy:function(){this.btn=1,this.showSpec(!1)},toRatings:function(){i.navigateTo({url:"/pages/index/ratings"})},toConfirmation:function(){var t=[],e={id:this.goodsData.id,img:"../../static/img/p1.jpg",name:this.goodsData.name,spec:"规格:"+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};t.push(e),i.setStorage({key:"buylist",data:t,success:function(){i.navigateTo({url:"/pages/index/confirmation"})}})},showComments:function(e){console.log(t(e," at pages\\index\\detail.vue:359"))},setSelectSpec:function(t){this.selectSpec=t},sub:function(){this.goodsData.number<=1||this.goodsData.number--},add:function(){this.goodsData.number++},back:function(){i.navigateBack()},showService:function(){console.log(t("show"," at pages\\index\\detail.vue:407")),this.serviceClass="show"},hideService:function(){var t=this;this.serviceClass="hide",setTimeout(function(){t.serviceClass="none"},200)},showSpec:function(e){console.log(t("show"," at pages\\index\\detail.vue:420")),this.specClass="show",this.specCallback=e},specCallback:function(){},finishSpec:function(){var t=this;this.specClass="hide",0==this.btn?this.$http.addCar({g_id:this.goodsData.id,num:this.goodsData.number}).then(function(e){1==e.data.status?i.showToast({title:"已加入购物车"}):t.$api.msg(e.data.message)}):i.navigateTo({url:"/pages/index/confirmation?id="+this.goodsData.id+"&num="+this.goodsData.number})},hideSpec:function(){var t=this;this.specClass="hide",setTimeout(function(){t.specClass="none"},200)},discard:function(){}}};e.default=a}).call(this,s("0de9")["default"],s("6e42")["default"])},fcbd:function(t,e,s){"use strict";(function(t){s("a6c6"),s("921b");i(s("66fd"));var e=i(s("944f"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("6e42")["createPage"])}},[["fcbd","common/runtime","common/vendor"]]]);
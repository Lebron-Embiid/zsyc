<template>
	<view class="content">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<!-- <mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch> -->
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<text class="back" @tap="back">返回</text>
			<view class="input-box">
				<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
				 <image src="/static/icon/clear.svg" v-if="keyword!=''" @tap.stop="clearKeywords" mode="widthFix"></image>
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> 
			
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-list-box online_content" v-if="hava_goods == true" scroll-y>
				<!-- <view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword"> -->
					<!-- <view class="keyword-text" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="/static/icon/arrow.png" mode="widthFix"></image>
					</view> -->
					<view class="content_item" @tap="toDetail(row.goods_id)" v-for="row in keywordList" :key="row.goods_id">
						<image :src="url+row.original_img" mode="widthFix"></image>
						<view class="ci_center">
							<view class="ci_title">{{row.goods_name}}</view>
							<view class="ci_type" style="color: #f00;font-size: 32rpx;margin-bottom: 0;">￥{{row.shop_price}}</view>
						</view>
					</view>
				<!-- </view> -->
			</scroll-view>
			<view class="no-keyword" v-if="hava_goods == false">
				没有搜到相关商品
			</view>
			<!-- <scroll-view class="keyword-box" scroll-y> -->
				<!-- <view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="/static/icon/delete.svg"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view> -->
				<!-- <view class="keyword-block"> -->
					<!-- <view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'/static/HM-search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view> -->
				<!-- </view> -->
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				hava_goods: null,
				url: ''
			}
		},
		onLoad() {
			this.init();
		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		methods: {
			clearKeywords(){
				this.keyword = '';
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?cid='+id
				})
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
			init() {
				this.url = this.$http.url;
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "默认关键词";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				// this.hotKeywordList = ['键盘', '鼠标', '显示器', '电脑主机', '蓝牙音箱', '笔记本电脑', '鼠标垫', 'USB', 'USB3.0'];
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail?event.detail.value:event;
				console.log(keyword);
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				if(keyword == ''){
					this.defaultKeyword = '默认关键字';
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				// uni.request({
				// 	url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
				// 	success: (res) => {
				// 		this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
				// 	}
				// });
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key) {
				 // ? this.keyword : this.defaultKeyword
				key = key ? key : this.keyword;
				this.keyword = key;
				if(key == ''){
					this.$api.msg('请输入搜索关键字');
					return;
				}
				this.saveKeyword(key); //保存为历史 
				// uni.showToast({
				// 	title: key,
				// 	icon: 'none',
				// 	duration: 2000
				// });
				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				let params = {
					token: uni.getStorageSync('token'),
					q: this.keyword,
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.searchGoods(params).then((data)=>{
					this.keywordList = data.data.result.goods_list;
					if(this.keywordList != null){
						this.hava_goods = true;
					}else{
						this.hava_goods = false;
					}
					console.log(this.hava_goods);
				})
				// //#ifdef APP-PLUS
				// plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + key));
				// //#endif
				// //#ifdef H5
				// window.location.href = 'taobao://s.taobao.com/search?q=' + key
				// //#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	.status_bar{
		background: rgb(242,242,242);
	}
	view{display:block;}
	.search-box {width:95%;background-color:rgb(242,242,242);padding:15upx 2.5%;display:flex;justify-content:space-between;align-items: stretch;}
	.search-box .back{
		width: 10%;
		color: #999;
		font-size: 28rpx;
		height: 60rpx;
		line-height: 60rpx;
		margin-right: 10rpx;
	}
	.search-box .mSearch-input-box{width: 100%;}
	.search-box .input-box {width:85%;flex-shrink:1;display:flex;justify-content:center;align-items:center;position: relative;}
	.search-box .input-box image{position: absolute;right: 10rpx;width: 40rpx;height: 40rpx;}
	.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:28upx;color:#fff;background:linear-gradient(to right,#ff9801,#ff570a);border-radius:60upx;}
	.search-box .input-box>input {width:100%;height:60upx;font-size:32upx;border:0;border-radius:60upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
	.placeholder-class {color:#9e9e9e;}
	.search-keyword {width:100%;background-color:rgb(242,242,242);}
	.keyword-list-box {height:calc(100vh - 120upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
	
	.online_content .content_item{display: flex;align-items: center;}
	.online_content .content_item .ci_center{width: 75%;}
	.online_content .content_item image{width: 150rpx;height: 150rpx !important;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
	.keyword-entry image {width:60upx;height:60upx;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {height:calc(100vh - 110upx);border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:10upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:40upx;height:40upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:60upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:28upx;background-color:rgb(242,242,242);color:#6b6b6b;}
</style>

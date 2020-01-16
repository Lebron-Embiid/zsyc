<template>
	<view class="find">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif --> 
		<view class="page_bg"></view>
		<view class="find_search_box">
			<view class="search_box">
				<image class="icon" src="/static/icon/search.png" mode="widthFix"></image>
				<input type="text" @input="doSearch" v-model="keywords" placeholder="请输入关键词进行搜索" />
				<image @tap="clearInput" v-if="keywords != ''" class="clear" src="/static/icon/clear.svg" mode="widthFix"></image>
			</view>
		</view>
		<view class="list_nav" v-if="keywords==''">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @tap="navbarTap(index,item.cat_id)">{{item.cat_name}}</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_box">
			<view class="find_content_box" @tap="toDetail(item.article_id)" v-for="(item,index) in findList" :key='index'>
				<!-- <view class="find_content_item">
					<view class="find_title">{{item.title}}</view>
					<view class="find_desc">{{item.description}}</view>
					<image class="pic" :src="url+item.thumb" mode="widthFix"></image>
					<view class="find_bottom">
						<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.click}}</view>
						<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.collect}}</view>
					</view>
				</view> -->
				<view class="find_content_item1">
					<view class="fci_left">
						<view class="find_title">{{item.title}}</view>
						<view class="find_desc">{{item.description}}</view>
						<view class="find_bottom">
							<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.click}}</view>
							<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.collect}}</view>
						</view>
					</view>
					<view class="fci_right">
						<image :src="url+item.thumb" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="no-keyword" v-if="hava_goods == true && keywords != ''">
				没有搜到相关商品
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navbar:[],
				currentTab:0,
				keywords: '',
				findList: [
					// {
					// 	title: '2个步骤挑到满意枕头',
					// 	src: '/static/img/find_img1.jpg',
					// 	look: '28.30万',
					// 	like: '9575',
					// 	type: 1
					// }
				],
				page: 1,
				url: '',
				hava_goods: null
			}
		},
		onLoad(opt) {
			this.url = this.$http.url;
		},
		onShow() {
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.articleClass(params).then((data)=>{
				this.navbar = data.data.result;
				let params1 = {
					cid: this.navbar[this.currentTab].cat_id,
					page: 1,
					limit: 10
				};
				let sign1 = this.$sign.getSign(params1,this.AppSecret);
				params1.sign = sign1;
				this.$http.articleList(params1).then((data)=>{
					this.findList = data.data.result;
				})
			})
		},
		methods:{
			doSearch(e){
				this.keywords = e.detail.value;
				if(this.keywords == ''){
					let params = {};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.articleClass(params).then((data)=>{
						this.navbar = data.data.result;
						let params1 = {
							cid: this.navbar[this.currentTab].cat_id,
							page: 1,
							limit: 10
						};
						let sign1 = this.$sign.getSign(params1,this.AppSecret);
						params1.sign = sign1;
						this.$http.articleList(params1).then((data)=>{
							this.findList = data.data.result;
						})
					})
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					name: this.keywords,
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.searchArticle(params).then((data)=>{
					this.findList = data.data.result;
					if(this.findList.length == 0){
						this.hava_goods = true;
					}else{
						this.hava_goods = false;
					}
					console.log(this.hava_goods);
				})
			},
			navbarTap(e,id){
				console.log(e,id)
				this.currentTab = e;
				let params = {
					cid: id,
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleList(params).then((data)=>{
					this.findList = data.data.result;
					console.log(this.findList);
				})
			},
			clearInput(){
				this.keywords = '';
				let params = {};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleClass(params).then((data)=>{
					this.navbar = data.data.result;
					let params1 = {
						cid: this.navbar[this.currentTab].cat_id,
						page: 1,
						limit: 10
					};
					let sign1 = this.$sign.getSign(params1,this.AppSecret);
					params1.sign = sign1;
					this.$http.articleList(params1).then((data)=>{
						this.findList = data.data.result;
					})
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/find/detail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.find{
		background: #eee;
	}
	.no-keyword{
		background: #eee;
	}
	.find_search_box{
		padding: 15rpx 50rpx;
		box-sizing: border-box;
		background: #f90;
		.search_box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 66rpx;
			background: #f6d7a9;
			border-radius: 10rpx;
			padding: 0 15rpx;
			.icon{
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
			input{
				display: block;
				width: 85%;
				font-size: 28rpx;
				color: #666;
			}
			.clear{
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-left: 10rpx;
			}
		}
	}
	.scroll_box{
		height: 77vh;
	}
</style>

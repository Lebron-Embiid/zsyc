<template>
	<view class="my_collect">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我的收藏"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="collect_scroll" @scrolltolower="loadMoreCollect">
			<view class="collect_box" v-if="currentTab == 0">
				<view class="collect_item" v-for="(item,index) in collectList" :key="index" @tap="toGoodsDetail(item.goods_id)">
					<image :src="url+item.original_img" mode="widthFix"></image>
					<view class="collect_right">
						<view class="cr_title">{{item.goods_name}}</view>
						<view class="cr_info">库存：{{item.store_count}}</view>
						<view class="cr_price">￥{{item.shop_price}}</view>
					</view>
				</view>
			</view>
			<view class="find_content_box" v-if="currentTab == 1" @tap="toActicleDetail(item.article_id)" v-for="(item,index) in collectList" :key='index'>
				<!-- <view class="find_content_item">
					<view class="find_title">{{item.title}}</view>
					<view class="find_desc">{{item.description}}</view>
					<image class="pic" :src="url+item.thumb" mode="widthFix"></image>
					<view class="find_bottom">
						<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.look}}</view>
						<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.like}}</view>
					</view>
				</view> -->
				<view class="find_content_item1">
					<view class="fci_left">
						<view class="find_title">{{item.title}}</view>
						<view class="find_desc">{{item.description}}</view>
						<view class="find_bottom">
							<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.look}}</view>
							<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.like}}</view>
						</view>
					</view>
					<view class="fci_right">
						<image :src="url+item.thumb" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				// {name:"店铺"},
				navbar: [{name:"商品"},{name:"文章"}],
				currentTab: 0,
				page: 1,
				collectList: [],
				url: '',
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			this.url = this.$http.url;
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCollectGoods(params).then((data)=>{
				this.collectList = data.data.result;
			})
		},
		methods:{
			toGoodsDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?cid='+id
				})
			},
			toActicleDetail(id){
				uni.navigateTo({
					url: '/pages/find/detail?id='+id
				})
			},
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				this.page = 1;
				let params = {
					token: uni.getStorageSync('token'),
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				if(e == 0){
					this.$http.getUserCollectGoods(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else if(e == 1){
					this.$http.getUserCollectArticle(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else{
					this.$http.getUserCollectStore(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}
			},
			loadMoreCollect(){
				this.page++;
				let params = {
					token: uni.getStorageSync('token'),
					page: this.page,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				if(this.currentTab == 0){
					this.$http.getUserCollectGoods(params).then((data)=>{
						if(data.data.result.length == 0){
							this.loadingType = 'noMore';
							return;
						}
						this.collectList = this.collectList.concat(data.data.result);
					})
				}else if(this.currentTab == 1){
					this.$http.getUserCollectArticle(params).then((data)=>{
						if(data.data.result.length == 0){
							this.loadingType = 'noMore';
							return;
						}
						this.collectList = this.collectList.concat(data.data.result);
					})
				}else{
					this.$http.getUserCollectStore(params).then((data)=>{
						if(data.data.result.length == 0){
							this.loadingType = 'noMore';
							return;
						}
						this.collectList = this.collectList.concat(data.data.result);
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.my_collect{
		background: #eee;
	}
	.collect_scroll{
		height: 85vh;
		.collect_box{
			.collect_item{
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				background: #fff;
				&:last-child{
					border-bottom: 0;
				}
				image{
					display: block;
					width: 180rpx;
					height: 180rpx !important;
					margin-right: 20rpx;
				}
				.collect_right{
					width: 60%;
					.cr_title{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: #333;
						font-size: 32rpx;
					}
					.cr_info{
						color: #999;
						font-size: 28rpx;
						margin: 10rpx 0 15rpx;
					}
					.cr_price{
						color: #f52f3e;
						font-size: 32rpx;
					}
				}
			}
		}
	}
</style>

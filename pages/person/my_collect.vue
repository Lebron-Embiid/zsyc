<template>
	<view class="my_collect">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我的收藏"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="collect_scroll" @scrolltolower="loadMoreCollect">
			<view class="collect_box" v-if="currentTab == 0">
				<view class="collect_item">
					<image src="/static/img/collect_img.jpg" mode="widthFix"></image>
					<view class="collect_right">
						<view class="cr_title">安岳柠檬 8粒装</view>
						<view class="cr_info">金黄饱满 柠香扑鼻</view>
						<view class="cr_price">￥29</view>
					</view>
				</view>
			</view>
			<view class="find_content_box" v-if="currentTab == 1" @tap="toDetail(item.article_id)" v-for="(item,index) in collectList" :key='index'>
				<view class="find_content_item" v-if="item.type == 1">
					<view class="find_title">{{item.title}}</view>
					<view class="find_desc">{{item.description}}</view>
					<image class="pic" :src="url+item.thumb" mode="widthFix"></image>
					<view class="find_bottom">
						<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.look}}</view>
						<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.like}}</view>
					</view>
				</view>
				<view class="find_content_item1" v-else>
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
				navbar: [{name:"商品"},{name:"攻略"}],
				currentTab: 0,
				page: 0,
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
				page: 0,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCollectStore(params).then((data)=>{
				this.collectList = data.data.result;
			})
		},
		methods:{
			toDetail(id){
				
			},
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				if(e == 0){
					this.$http.getUserCollectStore(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else if(e == 1){
					this.$http.getUserCollectGoods(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else{
					this.$http.getUserCollectArticle(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}
			},
			loadMoreCollect(){
				
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

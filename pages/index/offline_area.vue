<template>
	<view class="offline_area">
		<uni-nav-bar left-icon="back" title="线下提货专区"></uni-nav-bar>
		<view class="fixed_box">
			<image src="/static/icon/fixed.png" mode="widthFix"></image>
			{{city}}
		</view>
		<view class="filter_nav_box">
			<picker @change="bindProvinceChange" :range="provinces">
				<view class="filter_nav_item">
					<text>{{province_txt}}</text>
					<image class="icon" src="/static/icon/down.png" mode="widthFix"></image>
				</view>
			</picker>
			<picker @change="bindCityChange" :range="citys">
				<view class="filter_nav_item">
					<text>{{city_txt}}</text>
					<image class="icon" src="/static/icon/down.png" mode="widthFix"></image>
				</view>
			</picker>
			<picker @change="bindAreaChange" :range="areas">
				<view class="filter_nav_item">
					<text>{{area_txt}}</text>
					<image class="icon" src="/static/icon/down.png" mode="widthFix"></image>
				</view>
			</picker>
			<picker @change="bindAddressChange" :range="address">
				<view class="filter_nav_item">
					<text>{{address_txt}}</text>
					<image class="icon" src="/static/icon/down.png" mode="widthFix"></image>
				</view>
			</picker>
			<!-- <view class="filter_nav_item">
				<text>民治</text>
				<image class="icon" src="/static/icon/down.png" mode="widthFix"></image>
				<view>
					<image class="icon rotate" :src="down_icon_on" mode="widthFix"></image>
					<image class="icon" :src="down_icon" mode="widthFix"></image>
				</view>
			</view> -->
			<view class="filter_nav_item" @tap="changeListType">
				<image class="list_icon" src="/static/icon/list.png" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="offline_scroll">
			<view class="offline_box" :class="[changeList == 1?'list':'']">
				<view class="offline_item" @tap="toStore(item.store_id)" v-for="(item,index) in offlineList" :key="index">
					<image :src="url+item.store_logo" mode="widthFix"></image>
					<view class="off_box">
						<view class="off_title">{{item.store_name}}</view>
						<view class="off_coupon">{{item.coupon}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				city: '深圳',
				loadingType: 'more',
				down_icon_on: '/static/icon/down1.png',
				down_icon: '/static/icon/down.png',
				offlineList: [
					// {
					// 	src: '/static/img/rec_img3.png',
					// 	title: '波司登官方旗舰店',
					// 	coupon: '满1000减290'
					// }
				],
				provinces: ['广东'],
				citys: ['深圳'],
				areas: ['龙华'],
				address: ['民治'],
				province_txt: '广东',
				city_txt: '深圳',
				area_txt: '龙华',
				address_txt: '民治',
				changeList: 0,
				page: 1,
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			bindProvinceChange(e){
				this.province_txt = this.provinces[e.detail.value];
			},
			bindCityChange(e){
				this.city_txt = this.citys[e.detail.value];
			},
			bindAreaChange(e){
				this.area_txt = this.areas[e.detail.value];
			},
			bindAddressChange(e){
				this.address_txt = this.address[e.detail.value];
			},
			changeListType(){
				if(this.changeList == 0){
					this.changeList = 1;
				}else{
					this.changeList = 0;
				}
			},
			toStore(id){
				uni.navigateTo({
					url: '/pages/index/store?id='+id
				})
			},
			loadMore() {
				this.page++;
				let params = {
					token: uni.getStorageSync('token'),
					page: this.page,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getStreet(params).then((data)=>{
					if(data.data.result.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.offlineList = this.offlineList.concat(data.data.result);
				})
			}
		},
		onLoad() {
			this.url = this.$http.url;
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getStreet(params).then((data)=>{
				this.offlineList = data.data.result;
			})
		},
		onShow() {
			let that = this;
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					console.log(res);
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					// that.city = res.address;
			    }
			})
		}
	}
</script>

<style scoped lang="scss">
	.fixed_box{
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		color: #666;
		font-size: 28rpx;
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		image{
			display: block;
			width: 34rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
	}
	.filter_nav_box{
		background: #fafafa;
		padding: 10rpx;
		box-sizing: border-box;
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #eee;
		.filter_nav_item{
			color: #666;
			font-size: 32rpx;
			background: #fdfdfd;
			width: 140rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 70%;
				text-align: center;
			}
			.icon{
				display: block;
				width: 16rpx;
				height: 10rpx;
				margin-left: 10rpx;
				&.rotate{
					transform: rotate(180deg);
					margin-bottom: 6rpx;
				}
			}
			.list_icon{
				display: block;
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.offline_scroll{
		height: 80vh;		
	}
	.offline_box{
		padding: 30rpx 30rpx 0;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		.offline_item{
			display: block;
			width: 48%;
			margin-bottom: 20rpx;
			text-align: center;
			image{
				display: block;
				width: 100%;
				height: 260rpx !important;
			}
			.off_title{
				color: #333;
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin-bottom: 10rpx;
			}
			.off_coupon{
				color: #f00;
				font-size: 28rpx;
			}
		}
		&.list{
			padding: 10rpx 0 0;
			.offline_item{
				width: 100%;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				margin-bottom: 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				&:active{
					background: #eee;
				}
				image{
					width: 140rpx;
					height: 140rpx !important;
					margin-right: 30rpx;
				}
				.off_box{
					width: 60%;
					text-align: left;
				}
			}
		}
	}
</style>

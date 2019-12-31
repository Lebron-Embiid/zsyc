<template>
	<view class="person">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->  
		<view class="person_top">
			<view class="pt_left">
				<image src="/static/avatar/avatar.png" mode="widthFix"></image>
				<view class="pl_info">
					<view class="pl_name">小靓</view>
					<!-- <view class="pl_person">联合创始人{{personInfo.nickname}}</view> -->
				</view>
			</view>
			<view class="pt_center">
				<!-- <view>昵称：</view> -->
				<view>余额：￥{{personInfo.user_money}}</view>
				<view>额度：v 150000</view>
				<view>套餐资格：1</view>
				<view>套餐名额：2</view>
			</view>
			<view class="pt_right">
				<view class="pr_box">
					<image src="/static/icon/setting.png" mode="widthFix"></image>
					<image src="/static/icon/mess.png" mode="widthFix"></image>
				</view>
				<!-- <text>每日签到 &gt;</text> -->
				<button type="primary" size="mini" @tap="logout">退出登录</button>
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="my_order_box">
			<view class="my_title" @tap="toOrder">我的订单<image src="/static/icon/arrow.png" mode="widthFix"></image></view>
			<view class="order_box">
				<view class="order_item" v-for="(item,index) in orderNavs" :key="index" @tap="clickNav(index)">
					<view><image :src="item.icon" mode="widthFix"></image><text v-if="item.num!=0">{{item.num}}</text></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="my_order_box">
			<view class="my_title" @tap="toMealOrder">套餐订单<image src="/static/icon/arrow.png" mode="widthFix"></image></view>
			<view class="order_box">
				<view class="order_item" v-for="(item,index) in mealNavs" :key="index" @tap="clickNav(index)">
					<view><image :src="item.icon" mode="widthFix"></image><text v-if="item.num!=0">{{item.num}}</text></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="common_use_box">
			<view class="my_title">常用功能</view>
			<view class="use_box">
				<view class="use_item" @tap="clickUse(index)" v-for="(item,index) in useList" :key="index">
					<view><image :src="item.icon" mode="widthFix"></image></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				personInfo:{},
				orderNavs: [
					{
						icon: '/static/icon/order_icon1.png',
						title: '待付款',
						url: '/pages/person/order?id=1',
						num: 1
					},{
						icon: '/static/icon/order_icon2.png',
						title: '待发货',
						url: '/pages/person/order?id=2',
						num: 0
					},{
						icon: '/static/icon/order_icon3.png',
						title: '待收货',
						url: '/pages/person/order?id=3',
						num: 0
					},{
						icon: '/static/icon/order_icon4.png',
						title: '待评价',
						url: '/pages/person/order?id=4',
						num: 0
					},{
						icon: '/static/icon/order_icon6.png',
						title: '已完成',
						url: '/pages/person/order?id=5',
						num: 0
					}
				],
				mealNavs: [
					{
						icon: '/static/icon/order_icon1.png',
						title: '待付款',
						url: '/pages/person/order?id=1',
						num: 0
					},{
						icon: '/static/icon/order_icon2.png',
						title: '待发货',
						url: '/pages/person/order?id=2',
						num: 0
					},{
						icon: '/static/icon/order_icon3.png',
						title: '待收货',
						url: '/pages/person/order?id=3',
						num: 2
					},{
						icon: '/static/icon/order_icon4.png',
						title: '待评价',
						url: '/pages/person/order?id=4',
						num: 0
					},{
						icon: '/static/icon/order_icon5.png',
						title: '提货码',
						url: '/pages/person/offline_order?id=2',
						num: 0
					}
				],
				useList: [
					{
						icon: '/static/icon/use_icon1.png',
						title: '套餐选购',
						url: '/pages/meal/meal'
					},{
						icon: '/static/icon/use_icon2.png',
						title: '资格购买',
						url: '/pages/person/qualify'
					},{
						icon: '/static/icon/use_icon3.png',
						title: '我的收益',
						url: ''
					},{
						icon: '/static/icon/use_icon4.png',
						title: '账户安全',
						url: ''
					},{
						icon: '/static/icon/use_icon5.png',
						title: '在线客服',
						url: ''
					},{
						icon: '/static/icon/use_icon6.png',
						title: '帮助中心',
						url: ''
					},{
						icon: '/static/icon/use_icon7.png',
						title: '意见反馈',
						url: ''
					},{
						icon: '/static/icon/use_icon8.png',
						title: '我的收藏',
						url: '/pages/person/my_collect'
					}
				]
			}
		},
		onLoad() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.personInfo = data.data.result;
			})
		},
		methods:{
			logout(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定退出登录？',
					success:function(res){
						if(res.confirm){
							that.$api.msg("退出成功");
							uni.removeStorageSync('token');
							// uni.clearStorageSync();
							// uni.removeStorageSync('sessionkey');
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/login/login'
								})
							},1500)
						}
					}
				})
			},
			toOrder(){
				uni.navigateTo({
					url: '/pages/person/order'
				})
			},
			toMealOrder(){
				uni.navigateTo({
					url: '/pages/person/offline_order'
				})
			},
			clickNav(idx){
				uni.navigateTo({
					url: this.orderNavs[idx].url
				})
			},
			clickUse(idx){
				if(idx == 0){
					uni.switchTab({
						url: this.useList[idx].url
					})
				}else{
					uni.navigateTo({
						url: this.useList[idx].url
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.status_bar{
		background: #ff7d0b;
	}
	.person_top{
		background: url('~@/static/img/person_bg.jpg') center center no-repeat;
		background-size: 100% 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #fff;
		.pt_left{
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			margin-right: 20rpx;
			image{
				display: block;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				margin-bottom: 10rpx;
			}
		}
		.pt_center{
			width: 60%;
			font-size: 28rpx;
			view{
				margin-bottom: 5rpx;
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
		.pt_right{
			text-align: right;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			align-self: stretch;
			.pr_box{
				display: flex;
				justify-content: flex-end;
				align-items: flex-start;
				image{
					display: block;
					width: 48rpx;
					height: 48rpx;
					margin-left: 30rpx;
				}
			}
			text{
				display: inline-block;
				padding: 5rpx 15rpx 8rpx;
				box-sizing: border-box;
				border: 1px solid #fff;
				border-radius: 10rpx;
				font-size: 28rpx;
				margin: 30rpx 0 40rpx;
			}
			button{
				display: flex;
				align-self: flex-end;
				font-size: 24rpx;
				background: #f90;
				padding: 0 30rpx;
				margin: 0;
				color: #fff;
				&:after{
					border: 0;
				}
			}
		}
	}
	.my_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		color: #333;
		font-size: 32rpx;
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
	}
	.my_order_box{
		padding: 0 30rpx;
		box-sizing: border-box;
		.order_box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			.order_item{
				width: 20%;
				padding: 10rpx 0;
				color: #333;
				font-size: 28rpx;
				text-align: center;
				view{
					position: relative;
					height: 60rpx;
					display: flex;
					align-items: center;
					margin-bottom: 15rpx;
					image{
						display: block;
						width: 52rpx;
						height: 52rpx;
						margin: 0 auto;
					}
					text{
						position: absolute;
						width: 30rpx;
						height: 30rpx;
						line-height: 30rpx;
						border-radius: 50%;
						background: #f00;
						color: #fff;
						font-size: 24rpx;
						text-align: center;
						right: 20rpx;
						top: -10rpx;
					}
				}
			}
		}
	}
	.common_use_box{
		padding: 0 30rpx 30rpx;
		box-sizing: border-box;
		.use_box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			.use_item{
				width: 25%;
				padding: 30rpx 0;
				border-bottom: 1px solid #eee;
				color: #666;
				font-size: 28rpx;
				text-align: center;
				view{
					width: 66rpx;
					height: 66rpx;
					margin: 0 auto 20rpx;
					image{
						display: block;
						max-width: 100%;
						max-height: 66rpx;
					}
				}
			}
		}
	}
</style>

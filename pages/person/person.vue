<template>
	<view class="person">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif -->  
		<view class="person_top">
			<view class="pt_left">
				<view class="pl_top">
					<image :src="personInfo.head_pic" mode="widthFix"></image>
					<view class="pl_info">
						<view class="pl_name">{{personInfo.nickname}}</view>
						<view class="pl_person">{{personInfo.level_name}}</view>
					</view>
				</view>
				<view class="pl_bottom">
					<!-- <view>昵称：</view> -->
					<view>余额：￥{{parseInt(personInfo.user_money)}}</view>
					<view>额度：v 150000</view>
					<view>套餐资格：{{personInfo.user_count}}</view>
					<view>已购套餐：{{personInfo.us_count}}</view>
				</view>
			</view>
			<view class="pt_right">
				<view class="pr_box">
					<image src="/static/icon/setting.png" @tap="toSettings" mode="widthFix"></image>
					<image src="/static/icon/mess.png" @tap="toMessage" mode="widthFix"></image>
				</view>
				<view class="txt" @tap="toOrderList">资格订单&gt;</view>
				<view class="txt" @tap="toLines">额度管理&gt;</view>
				<!-- <button type="primary" size="mini" @tap="logout">退出登录</button> -->
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="common_use_box">
			<view class="my_title">常用功能 
				<view>
					<block v-if="personInfo.level != 5">
						<button type="primary" size="mini" @tap="toLevel">会员升级</button>
					</block>
					<button type="primary" size="mini" @tap="toRecommend">推荐会员</button>
				</view>
			</view>
			<view class="use_box">
				<view class="use_item" @tap="clickUse(index)" v-for="(item,index) in useList" :key="index">
					<view><image :src="item.icon" mode="widthFix"></image></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="my_order_box">
			<view class="my_title" @tap="toOrder">商品订单<image src="/static/icon/arrow.png" mode="widthFix"></image></view>
			<view class="order_box white">
				<view class="order_item" v-for="(item,index) in orderNavs" :key="index" @tap="clickNav(index)">
					<view><image :src="item.icon" mode="widthFix"></image><text v-if="item.num!=0">{{item.num}}</text></view>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
		<view class="my_order_box pb30">
			<view class="my_title" @tap="toMealOrder">套餐订单<image src="/static/icon/arrow.png" mode="widthFix"></image></view>
			<view class="order_wrap_box">
				<view class="ob_title">线上发货订单</view>
				<view class="order_box">
					<view class="order_item" v-for="(item,index) in mealNavs" :key="index" @tap="clickMeal(index)">
						<view><image :src="item.icon" mode="widthFix"></image><text v-if="item.num!=0">{{item.num}}</text></view>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="ob_title">线下提货订单</view>
				<view class="order_box">
					<view class="order_item" v-for="(item,index) in mealNavs2" :key="index" @tap="clickMeal2(index)">
						<view><image :src="item.icon" mode="widthFix"></image><text v-if="item.num!=0">{{item.num}}</text></view>
						<text>{{item.title}}</text>
					</view>
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
				recInfo: '',
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
						url: '/pages/person/online_order?id=1',
						num: 0
					},{
						icon: '/static/icon/order_icon2.png',
						title: '待发货',
						url: '/pages/person/online_order?id=2',
						num: 0
					},{
						icon: '/static/icon/order_icon3.png',
						title: '待收货',
						url: '/pages/person/online_order?id=3',
						num: 2
					},{
						icon: '/static/icon/order_icon4.png',
						title: '已完成',
						url: '/pages/person/online_order?id=4',
						num: 0
					},{
						icon: '/static/icon/order_icon5.png',
						title: '换货',
						url: '/pages/person/online_order?id=2',
						num: 0
					}
				],
				mealNavs2: [
					{
						icon: '/static/icon/order_icon1.png',
						title: '待付款',
						url: '/pages/person/offline_order?id=1',
						num: 0
					},{
						icon: '/static/icon/order_icon2.png',
						title: '待提货',
						url: '/pages/person/offline_order?id=2',
						num: 0
					},{
						icon: '/static/icon/order_icon4.png',
						title: '已完成',
						url: '/pages/person/offline_order?id=4',
						num: 0
					},{
						icon: '/static/icon/order_icon5.png',
						title: '换货',
						url: '/pages/person/offline_order?id=3',
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
						url: '/pages/person/my_income'
					},{
						icon: '/static/icon/use_icon4.png',
						title: '账户安全',
						url: '/pages/person/account'
					},{
						icon: '/static/icon/use_icon5.png',
						title: '在线客服',
						url: '/pages/person/chat'
					},{
						icon: '/static/icon/use_icon6.png',
						title: '帮助中心',
						url: '/pages/person/help_center'
					},{
						icon: '/static/icon/use_icon7.png',
						title: '意见反馈',
						url: '/pages/person/feedback'
					},{
						icon: '/static/icon/use_icon8.png',
						title: '我的收藏',
						url: '/pages/person/my_collect'
					}
				]
			}
		},
		onLoad() {
			
		},
		onShow() {
			let params1 = {
				token: uni.getStorageSync('token')
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.getParentCount(params1).then((data)=>{
				this.recInfo = data.data.result;
			})
			
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.personInfo = data.data.result;
				// '/public/image/toux-icon.png'
				if(data.data.result.head_pic != null){
					this.personInfo.head_pic = this.$http.url+data.data.result.head_pic;
				}else{
					this.personInfo.head_pic = '/static/avatar/avatar.png';
				}
				getApp().globalData.user_id = data.data.result.user_id;
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
					url: '/pages/person/online_order'
				})
			},
			clickNav(idx){
				uni.navigateTo({
					url: this.orderNavs[idx].url
				})
			},
			clickMeal(idx){
				uni.navigateTo({
					url: this.mealNavs[idx].url
				})
			},
			clickMeal2(idx){
				uni.navigateTo({
					url: this.mealNavs2[idx].url
				})
			},
			clickUse(idx){
				console.log(this.recInfo);
				if(idx == 1){
					if(this.recInfo == null || this.recInfo == []){
						uni.navigateTo({
							url: '/pages/person/sell?count='+this.personInfo.user_count
						})
					}else{
						uni.navigateTo({
							url: this.useList[idx].url+'?count='+this.personInfo.user_count+'&level='+this.personInfo.level
						})
					}
				}else{
					uni.navigateTo({
						url: this.useList[idx].url
					})
				}
			},
			toSettings(){
				uni.navigateTo({
					url: '/pages/person/settings'
				})
			},
			toMessage(){
				uni.navigateTo({
					url: '/pages/person/message'
				})
			},
			toLevel(){
				uni.navigateTo({
					url: '/pages/person/upgrade_member'
				})
			},
			toRecommend(){
				uni.navigateTo({
					url: '/pages/person/recommendMember'
				})
			},
			toLines(){
				uni.navigateTo({
					url: '/pages/person/transfer_lines'
				})
			},
			toOrderList(){
				uni.navigateTo({
					url: '/pages/person/order_list'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.gray-place{
		background: #fafafa;
	}
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
		flex-wrap: wrap;
		color: #fff;
		.pt_left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			width: 75%;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			// margin-right: 20rpx;
			.pl_top{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				image{
					display: block;
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.pl_info{
					width: 60%;
					text-align: left;
					.pl_name{
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.pl_person{
						font-size: 28rpx;
						font-weight: normal;
						margin-top: 5rpx;
					}
				}
			}
			.pl_bottom{
				width: 100%;
				font-size: 28rpx;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				flex-wrap: wrap;
				text-align: left;
				margin-top: 15rpx;
				view{
					width: 50%;
					margin-top: 5rpx;
					&:last-child{
						margin-bottom: 0;
					}
				}
			}
		}
		.pt_right{
			width: 25%;
			text-align: right;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;
			align-self: flex-start;
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
			.txt{
				display: inline-block;
				padding: 5rpx 12rpx 8rpx;
				box-sizing: border-box;
				border: 1px solid #fff;
				border-radius: 10rpx;
				font-size: 28rpx;
				margin: 20rpx 0 0;
			}
			button{
				display: flex;
				align-self: flex-end;
				font-size: 24rpx;
				background: #f90;
				padding: 0 30rpx;
				margin: 0 0 20rpx;
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
		button{
			margin: 0;
			background: #f90;
			color: #fff;
			font-size: 28rpx;
			margin-left: 20rpx;
			&:after{
				border: 0;
			}
		}
	}
	.my_order_box{
		padding: 0 30rpx;
		box-sizing: border-box;
		&.pb30{
			padding-bottom: 30rpx;
		}
		.order_wrap_box{
			.ob_title{
				color: #333;
				font-size: 28rpx;
				padding: 15rpx 0;
			}
		}
		.order_box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 0;
			background: #fafafa;
			&.white{
				background: #fff;
			}
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
		padding: 0 30rpx;
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
				&:nth-child(n+5){
					border-bottom: 0;
				}
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

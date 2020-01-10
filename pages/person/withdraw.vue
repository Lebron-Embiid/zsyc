<template>
	<view class="withdraw">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要提现"></uni-nav-bar>
		<view class="order_address" @tap="selectAccount">
			<view class="oa_left" v-if="has_account==false">
				<view class="no_title">请选择提现账号</view>
			</view>
			<view class="oa_left" v-else>
				<view class="oa_default">
					<text class="default">默认</text>
				</view>
				<view class="oa_title_box">
					<view class="oa_title">账户类型：银行卡</view>
					<view class="oa_title">账号：45616412314564</view>
					<view class="oa_title">开户行：工商银行</view>
					<view class="oa_title">户名：张XX</view>
				</view>
			</view>
			<image src="/static/icon/arrow.png" mode="widthFix"></image>
		</view>
		<view class="recharge_box">
			<input type="number" placeholder="" v-model="withdraw_num" />
			<view class="till">请输入整数，单笔提现不超过<text>50000</text>元</view>
			<button @tap="submit" type="primary" size="mini">确认提现</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				withdraw_num: '',
				has_account: true
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			// let params = {token: uni.getStorageSync('token')};
			// let sign = this.$sign.getSign(params,this.AppSecret);
			// params.sign = sign;
			// this.$http.carConfirm(params).then((data)=>{
			// 	this.recinfo = data.data.result.addressList;
			// 	if(this.recinfo == null){
			// 		this.has_account = false;
			// 	}else{
			// 		this.has_account = true;
			// 	}
			// })
		},
		onShow() {
			// if(uni.getStorageSync('selectAccount') != ''){
			// 	uni.getStorage({
			// 		key:'selectAccount',
			// 		success: (e) => {
			// 			console.log(e);
			// 			this.recinfo = e.data;
			// 			this.has_account = true;
			// 		}
			// 	})
			// }else{
			// 	this.has_account = false;
			// }
		},
		methods:{
			selectAccount(){
				uni.navigateTo({
					url: '/pages/person/cash_list?type=select'
				})
			},
			submit(){
				uni.navigateTo({
					url: '/pages/person/withdraw_apply'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.withdraw{
		background: #eee;
	}
	.recharge_box{
		padding: 100rpx 100rpx 0;
		box-sizing: border-box;
		input{
			display: block;
			width: 100%;
			height: 88rpx;
			background: #fff;
			border: 1px solid #ccc;
			padding: 0 10rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
		.till{
			color: #999;
			font-size: 26rpx;
			text-align: center;
			text{
				color: #f00;
				margin: 0 10rpx;
			}
		}
		button{
			color: #fff;
			font-size: 32rpx;
			background-color: #f60;
			display: block;
			margin: 0 auto;
			width: 280rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 100rpx;
			&:after{
				border: 0;
			}
		}
	}
	
	.order_address{
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		&:active{
			background: #fafafa url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		}
		.oa_left{
			width: 90%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.no_title{
				font-size: 32rpx;
			}
			.oa_default{
				width: 120rpx;
				.default{
					font-size: 22rpx;
					background-color: #fff;
					color: #ff2a3a;
					border: 1px solid #ff2a3a;
					padding: 5rpx 15rpx 5rpx;
					border-radius: 5rpx;
				}
			}
			.oa_title_box{
				.oa_title{
					color: #999;
					font-size: 28rpx;
					margin-bottom: 5rpx;
					text{
						margin-left: 15rpx;
					}
				}
			}
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
	}
</style>

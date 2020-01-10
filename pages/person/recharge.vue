<template>
	<view class="recharge">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要充值"></uni-nav-bar>
		<view class="recharge_box">
			<input type="number" placeholder="" v-model="recharge_num" />
			<button @tap="submit" type="primary" size="mini">确认充值</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				recharge_num: ''
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			submit(){
				uni.navigateTo({
					url: '/pages/car/pay'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.recharge{
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
			margin-bottom: 100rpx;
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
			&:after{
				border: 0;
			}
		}
	}
</style>

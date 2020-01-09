<template>
	<view class="apply_record">
		<uni-nav-bar left-icon="back" title="会员申请记录"></uni-nav-bar>
		<view class="record_box">
			<view class="record_item">
				<view>旧等级  新等级</view>
				<text>状态</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				page: 0
			}
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token'),
				page: this.page,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.applyLevelList(params).then((data)=>{
				
			})
		},
		components:{
			uniNavBar
		}
	}
</script>

<style scoped lang="scss">
	.record_box{
		.record_item{
			padding: 30rpx;
			box-sizing: border-box;
			color: #666;
			font-size: 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			text{
				color: #f00;
				font-size: 32rpx;
			}
		}
	}
</style>

<template>
	<view class="agreement">
		<uni-nav-bar left-icon="back" title="用户服务协议"></uni-nav-bar>
		<view class="agreement_box">
			<!-- <view class="agree_title">{{title}}</view> -->
			<block v-if="content!=''">
				<u-parse :content="content"></u-parse>
			</block>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from '@/components/u-parse/u-parse.vue'
	export default{
		data(){
			return{
				// title: '用户协议',
				content: ''
			}
		},
		components:{
			uniNavBar,
			uParse
		},
		onLoad() {
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getAgreement(params).then((data)=>{
				this.content = data.data.result.content;
			})
		}
	}
</script>

<style scoped lang="scss">
	.agreement_box{
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
		font-size: 28rpx;
		.agree_title{
			color: #333;
			font-size: 32rpx;
			text-align: center;
			margin-bottom: 20rpx;
		}
	}
</style>

<template>
	<view class="withdraw_apply">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="提现申请"></uni-nav-bar>
		<view class="logist_content">
			<view class="logist_box">
				<view class="logist_item" v-for="(item,index) in withdrawList" :key="index">
					<view class="li_box">
						<view class="li_time">{{util.formatTime(item.add_time)}}</view>
						<view class="li_title">【提现申请】
							<block v-if="item.status == 0">
								已提交申请，正在受理
							</block>
							<block v-if="item.status == 1">
								申请通过审核，安排转账，请留意账户情况。
							</block>
							<block v-if="item.status == 2">
								申请失败，请咨询客服。
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="apply_till">当你账户收到准确资金，请点击提现确认按钮，可进行下一笔提现操作。若有异议请点击客服申诉进行沟通。</view>
		<button @tap="submit" type="primary">提现确认</button>
		<button @tap="toCustomer" type="primary" class="red">客服申诉</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				withdrawList: [
					{
						add_time: 1578380070,
						status: 0
					},{
						add_time: 1578380070,
						status: 1
					},{
						add_time: 1578380070,
						status: 2
					}
				],
				util: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.util = util;
		},
		methods:{
			submit(){
				
			},
			toCustomer(){
				uni.navigateTo({
					url: '/pages/person/chat'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.withdraw_apply{
		background: #eee;
		button{
			color: #fff;
			font-size: 32rpx;
			background: #f60;
			width: 350rpx;
			height: 90rpx;
			line-height: 90rpx;
			margin-bottom: 20rpx;
			&:after{
				border: 0;
			}
			&.red{
				background: #900;
			}
		}
	}
	.apply_till{
		color: #999;
		font-size: 26rpx;
		margin: 40rpx 0;
		padding: 0 30rpx 0 70rpx;
		box-sizing: border-box;
	}
	.logist_content{
		background: #eee;
		.logist_box{
			padding: 0 30rpx;
			.logist_item{
				padding-left: 40rpx;
				padding-top: 30rpx;
				position: relative;
				:before{
					content: "";
					display: block;
					width: 1px;
					height: 100%;
					position: absolute;
					left: 13rpx;
					top: 0;
					background: #E2E2E2;
					z-index: 1;
				}
				:after{
					content: "";
					display: block;
					width: 13px;
					height: 13px;
					border-radius: 50%;
					background: #fff;
					box-sizing: border-box;
					border: 1px solid #ccc;
					position: absolute;
					left: 0;
					top: 60rpx;
					z-index: 2;
				}
				.li_box{
					background: #fff;
					border-radius: 10rpx;
					padding: 25rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #F1F1F1;
					.li_title{
						color: #333;
						font-size: 32rpx;
					}
					.li_time{
						color: #999;
						font-size: 28rpx;
						margin-bottom: 5rpx;
					}
				}
				// &:first-of-type{
				// 	.li_box{
				// 		.li_title{
				// 			color: #fa3d34;
				// 		}
				// 	}
				// 	:after{
				// 		background: #fa3d34;
				// 	}
				// }
			}
		}
	}
</style>

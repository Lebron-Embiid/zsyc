<template>
	<view class="process">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="查看回复（卖家）"></uni-nav-bar>
		<view class="logist_content">
			<view class="logist_box">
				<view class="logist_item" v-for="(item,index) in replyList" :key="index">
					<view class="li_box">
						<view class="li_time">{{item.time}}</view>
						<view class="li_title">{{item.content}}</view>
					</view>
				</view>
				<block v-if="replyList == '' || replyList.length == 0">
					<view class="not_have">暂无数据</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				replyList:[
					{
						content: '【我】没有收到款',
						time: '2018.08.18 08:08'
					},{
						content: '【买家】NICK：已提交申诉，上传支付凭证',
						time: '2018.08.18 08:08'
					},{
						content: '【我】已确认订单',
						time: '2018.08.18 08:08'
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			
		},
		onLoad(opt) {
			
		}
	}
</script>

<style scoped lang="scss">
	.not_have{
		margin: 50rpx auto 0;
	}
	.process{
		background: #eee;
	}
	.logist_content{
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
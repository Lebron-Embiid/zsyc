<template>
	<view class="activity notice">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="通知消息"></uni-nav-bar>
		<view class="activity_box">
			<view class="activity_item" v-for="(item,index) in noticeList" :key="index">
				<text class="act_time">{{item.time}}</text>
				<view class="act_box">
					<view class="act_title">{{item.title}}</view>
					<view class="act_desc">{{item.desc}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				noticeList: [
					{
						time: '活动日期',
						title: '通知消息标题',
						desc: '消息通知的内容描述：描述内容请控制在两行以内，超过两行的部分请用... >>'
					},{
						time: '活动日期',
						title: '通知消息标题',
						desc: '消息通知的内容描述：描述内容请控制在两行以内，超过两行的部分请用... >>'
					}
				]
			}
		},
		components:{
			uniNavBar
		}
	}
</script>

<style scoped lang="scss">
	.activity_box{
		padding: 30rpx;
		box-sizing: border-box;
		background: #eee;
		.activity_item{
			text-align: center;
			margin-bottom: 30rpx;
			.act_time{
				display: inline-block;
				padding: 8rpx 20rpx 8rpx;
				background: #ccc;
				border-radius: 5rpx;
				color: #fff;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
			.act_box{
				padding: 30rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 5rpx;
				text-align: left;
				.act_title{
					color: #333;
					font-size: 36rpx;
					margin-bottom: 20rpx;
				}
				.act_desc{
					color: #999;
					font-size: 32rpx;
				}
			}
		}
	}
</style>

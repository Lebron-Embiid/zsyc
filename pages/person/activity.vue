<template>
	<view class="activity">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="优惠活动"></uni-nav-bar>
		<view class="activity_box">
			<view class="activity_item" :class="[item.is_over==1?'over':'']" v-for="(item,index) in activityList" :key="index">
				<text class="act_time">{{item.time}}</text>
				<view class="act_box">
					<view class="act_title">{{item.title}}</view>
					<view class="img_box">
						<image :src="item.img" mode="widthFix"></image>
					</view>
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
				activityList: [
					{
						time: '09.13 09:00',
						is_over: 0,
						title: '活动标题请不要超过一行',
						img: '/static/img/online_banner.jpg',
						desc: '活动内容的描述：描述内容请控制在两行以内，超过两行的部分请用...'
					},{
						time: '09.13 09:00',
						is_over: 1,
						title: '活动标题请不要超过一行',
						img: '/static/img/online_banner.jpg',
						desc: '活动内容的描述：描述内容请控制在两行以内，超过两行的部分请用...'
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
			margin-bottom: 40rpx;
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
				.img_box{
					position: relative;
					image{
						display: block;
						width: 100%;
						margin-bottom: 10rpx;
					}
				}
				.act_desc{
					color: #999;
					font-size: 32rpx;
				}
			}
			&.over{
				.act_title,.act_desc{
					color: #ccc;
				}
				.img_box:after{
					content: '活动结束';
					position: absolute;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					color: #fff;
					font-size: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: rgba(0,0,0,.5);
				}
			}
		}
	}
</style>

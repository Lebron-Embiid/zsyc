<template>
	<view class="logistics">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="物流信息"></uni-nav-bar>
		<view class="logistics_top">
			<image src="/static/icon/log_car.png" mode="widthFix"></image>
			<view class="log_top_info">
				<view>物流公司<text>顺丰</text></view>
				<view>物流单号<text>SKD35167634135</text></view>
			</view>
		</view>
		<view class="logist_list_box">
			<view class="logist_list">
				<view class="logist_item" v-for="(item,index) in logists" :key="index">
					<!-- <view class="li_box"> -->
						<view class="log_title">{{item.log_title}}</view>
						<view class="log_time">{{item.log_time}}</view>
						<image v-if="index==0" src="/static/icon/log_icon2.png" mode="widthFix"></image>
						<image v-else src="/static/icon/log_icon1.png" mode="widthFix"></image>
					<!-- </view> -->
				</view>
			</view>
			<block v-if="logists == '' || logists.length == 0">
				<view class="not_have">暂无数据</view>
			</block>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				logists:[
					{
						log_title: '您的订单已到达[深圳宝安分拨中心]',
						log_time: '2019-12-24 15:58'
					},{
						log_title: '您的订单已到达[广州增城分拨中心]',
						log_time: '2019-12-24 11:15'
					},{
						log_title: '配送员李伟已揽收完成',
						log_time: '2019-12-23 16:23'
					},{
						log_title: '第三方卖家已开始拣货',
						log_time: '2019-12-23 12:15'
					},{
						log_title: '您提交了订单，请等待卖家发货',
						log_time: '2019-12-23 10:23'
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
	.logistics_top{
		padding: 30rpx;
		box-sizing: border-box;
		background: url('~@/static/img/log_bg.png') center center no-repeat;
		background-size: 100% 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: #666;
		font-size: 32rpx;
		.log_top_info{
			view{
				margin-bottom: 10rpx;
				&:last-child{
					margin-bottom: 0;
				}
				text{
					color: #232323;
					margin-left: 20rpx;
				}
			}
		}
		image{
			display: block;
			width: 66rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
	}
	.logist_list_box{
		padding: 40rpx;
		box-sizing: border-box;
		background: #fff;
		.logist_list{
			padding-left: 35rpx;
			border-left: 1px solid #ccc;
			box-sizing: border-box;
			.logist_item{
				margin-bottom: 40rpx;
				position: relative;
				color: #333;
				font-size: 32rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.log_title{
					margin-bottom: 10rpx;
				}
				.log_time{
					color: #999;
					font-size: 28rpx;
					font-weight: bold;
				}
				image{
					display: block;
					width: 22rpx;
					height: 28rpx;
					position: absolute;
					left: -47rpx;
					top: 0;
				}
			}
		}
	}
</style>
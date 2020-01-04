<template>
	<view class="my_income">
		<uni-nav-bar left-icon="back" title="推荐会员"></uni-nav-bar>
		<view class="income_bg">
			<image class="bg" src="/static/img/income_bg.png" mode="widthFix"></image>
			<view class="layer">
				<image class="avatar" src="/static/avatar/avatar.png" mode="widthFix"></image>
				<view class="income_price">我的收益 <text>995599</text> 元</view>
			</view>
		</view>
		<view class="message_box">
			<view class="message_item" @tap="toIncome(index,item.type)" v-for="(item,index) in incomeList" :key="index">
				<view class="icon_box">
					<image class="icon" :src="item.icon" mode="widthFix"></image>
				</view>
				<view class="msg_content">
					<view class="msg_box">
						<view class="msg_title">{{item.type}}<view>已推：<text>{{item.number}}</text>人</view></view>
						<view class="msg_info">总收益：<text>{{item.income}}</text>元</view>
					</view>
					<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image>
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
				incomeList: [
					{
						icon: '/static/icon/income_icon1.png',
						type: '推荐会员收益',
						number: 500,
						income: 88888
					},{
						icon: '/static/icon/income_icon2.png',
						type: '推荐直营店收益',
						number: 500,
						income: 88888
					},{
						icon: '/static/icon/income_icon3.png',
						type: '推荐分公司收益',
						number: 500,
						income: 88888
					},{
						icon: '/static/icon/income_icon4.png',
						type: '推荐联合创始人收益',
						number: 500,
						income: 88888
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			
		},
		methods:{
			toIncome(idx,type){
				uni.navigateTo({
					url: '/pages/person/income_list?type='+type+'&idx='+idx
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.income_bg{
		position: relative;
		.bg{
			display: block;
			width: 100%;
		}
		.layer{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			text-align: left;
			.avatar{
				display: block;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin: 100rpx auto 0;
			}
			.income_price{
				width: 50%;
				transform: translateX(80%);
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
				display: inline-flex;
				align-items: center;
				text{
					font-size: 50rpx;
					margin: 0 5rpx 0 10rpx;
				}
			}
		}
	}
	.message_box{
		padding-top: 20rpx;
		.message_item{
			&:active{
				background: #eee;
			}
			.icon_box{
				.icon{
					max-width: 60rpx;
					max-height: 74rpx !important;
				}
			}
			.msg_content{
				.msg_box{
					.msg_title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						view{
							color: #666;
							font-size: 28rpx;
							text{
								color: #f00;
								font-size: 32rpx;
								margin: 0 5rpx;
							}
						}
					}
					.msg_info{
						text{
							color: #f00;
							font-size: 32rpx;
							margin: 0 5rpx;
						}
					}
				}
			}
			&:last-child{
				.msg_content{
					border-bottom: 1px solid #eee;
				}
			}
		}
	}
</style>

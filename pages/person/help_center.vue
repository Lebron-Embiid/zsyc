<template>
	<view class="help_center">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="帮助中心"></uni-nav-bar>
		<view class="help_box">
			<view class="help_title">常见问题</view>
			<view class="help_item" @tap="toClick(index)" :class="[item.is_click == 1?'show':'']" v-for="(item,index) in helpList" :key="index">
				<view class="help_top">
					<view class="ht_title">{{item.title}}</view>
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
				<view class="help_bottom">
					{{item.content}}
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				loadingType: 'more',
				helpList: [
					{
						is_click: 0,
						title: '1、如何获得套餐资格？如何使用？',
						content: '您可以通过个人中心点击购买资格即可。'
					},{
						is_click: 0,
						title: '2、如何获取购物发票？',
						content: 'a、订单备注留言您的开票抬头，我们默认是开增值税电子普通发票，b、如有特别要求，请联系客服。'
					},{
						is_click: 0,
						title: '3、下单后可以修改收货地址吗？',
						content: '下单后，如果还未付款，或付款后商品还未寄出的情况下，可以联系客服为您修改收货地址。'
					},{
						is_click: 0,
						title: '4、怎么计算快递费用？如何免快递费？',
						content: '快递费根据商品的质量和寄送的距离来计算，详情请见：商品详情页 > 常见问题。'
					},{
						is_click: 0,
						title: '5、付款可以使用那些支付方式？',
						content: '可以使用微信或支付宝进行付款。'
					}
				]
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			toClick(e){
				this.helpList[e].is_click = !this.helpList[e].is_click;
			}
		}
	}
</script>

<style scoped lang="scss">
	.help_box{
		background: #fff;
		.help_title{
			color: #333;
			font-size: 32rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
		}
		.help_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.help_top{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.ht_title{
					color: #333;
					font-size: 32rpx;
					width: 90%;
				}
				image{
					display: block;
					width: 16rpx;
					height: 32rpx;
					margin-top: 8rpx;
					transform: rotate(90deg);
				}
			}
			.help_bottom{
				display: none;
				font-size: 36rpx;
				margin-top: 20rpx;
			}
			&.show{
				.help_top{
					image{
						transform: rotate(-90deg);
					}
				}
				.help_bottom{
					display: block;
				}
			}
		}
	}
</style>

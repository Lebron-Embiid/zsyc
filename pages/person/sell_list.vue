<template>
	<view class="sell_list">
		<uni-nav-bar left-icon="back" title="挂卖列表"></uni-nav-bar>
		<view class="sell_list_box">
			<view class="sell_list_item" v-for="(item,index) in sellList" :key="index">
				<view class="sli_top">
					<view class="st_price">价格：<text>{{item.price}}</text>元/个</view>
					<view class="st_num">挂卖数量<text>{{item.num}}</text>个</view>
				</view>
				<view class="sli_bottom">
					<view class="sli_left">
						<view class="sl_price">挂卖总价：<text>{{item.total_price}}</text>元</view>
						<view class="sl_time">挂卖时间：<text>{{item.time}}</text></view>
					</view>
					<view class="sli_right">
						<button type="primary" @tap="seeOrderList" class="green" size="mini">查看订单</button>
						<button type="primary" @tap="toCancel(index)" size="mini">撤销</button>
					</view>
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
				sellList: [
					{
						price: '8',
						num: 10000,
						total_price: '80000',
						time: '2019-12-31'
					},{
						price: '8',
						num: 10000,
						total_price: '80000',
						time: '2019-12-31'
					},{
						price: '8',
						num: 10000,
						total_price: '80000',
						time: '2019-12-31'
					},{
						price: '8',
						num: 10000,
						total_price: '80000',
						time: '2019-12-31'
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			seeOrderList(){
				uni.navigateTo({
					url: '/pages/person/order_list?type=sale'
				})
			},
			toCancel(idx){
				uni.navigateTo({
					url: '/pages/person/submit_success?type=back'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.sell_list_box{
		.sell_list_item{
			padding: 15rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.sli_top{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 10rpx;
				.st_price{
					color: #900;
					font-size: 28rpx;
					margin-right: 50rpx;
					text{
						color: #f00;
						font-size: 32rpx;
					}
				}
				.st_num{
					color: #999;
					font-size: 28rpx;
					text{
						color: #900;
						margin: 0 5rpx;
					}
				}
			}
			.sli_bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sli_left{
					.sl_price{
						color: #900;
						font-size: 28rpx;
						margin-bottom: 5rpx;
						text{
							color: #ff2a3a;
							font-size: 36rpx;
						}
					}
					.sl_time{
						color: #999;
						font-size: 28rpx;
					}
				}
				.sli_right{
					button{
						display: block;
						margin: 0;
						line-height: 1.6;
						color: #fff;
						background: #f60;
						font-size: 26rpx;
						&.green{
							background: #090;
							margin-bottom: 10rpx;
						}
						&:after{
							border: 0;
						}
					}
				}
			}
		}
	}
</style>

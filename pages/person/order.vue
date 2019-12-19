<template>
	<view class="order">
		<uni-nav-bar leftIcon="back" title="我的订单"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="my_order_box">
			<view class="my_order_item" v-for="(item,index) in orderList" :key="index">
				<view class="moi_top">
					订单号：{{item.order_sn}}
					<text>{{item.status}}</text>
				</view>
				<view class="moi_center" @tap="toOrderDetail(item.id,item.is_type)" v-for="(order,idx) in item.list" :key="idx">
					<image :src="order.src" mode="widthFix"></image>
					<view class="moi_box">
						<view class="moi_title">{{order.title}}</view>
						<view class="moi_info">{{order.info}}</view>
					</view>
				</view>
				<view class="moi_all">共{{item.num}}件商品 合计：￥{{item.price}}</view>
				<view class="moi_bottom">
					<button v-if="item.is_type == 3" type="default" size="mini">查看物流</button>
					<button @tap="cancelOrder(item.id)" v-if="item.is_type == 1 || item.is_type == 2" type="default" size="mini">取消订单</button>
					<button v-if="item.is_type == 2 || item.is_type == 3 || item.is_type == 4" type="default" size="mini">再次购买</button>
					<button v-if="item.is_type == 4" type="default" size="mini">退换货</button>
					<button v-if="item.is_type == 3" type="primary" size="mini" class="red">确认收货</button>
					<button v-if="item.is_type == 4" type="primary" size="mini" class="red">评价有礼</button>
					<button v-if="item.is_type == 1" type="primary" size="mini" class="red">付款</button>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				navbar:[{name:"全部"},{name:"待付款"},{name:"待发货"},{name:"待收货"},{name:"待评价"}],
				currentTab:0,
				orderList: [
					{
						id: 1,
						order_sn: '021255684',
						status: '待付款',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '普罗旺斯桃红葡萄酒',
								info: '普罗旺斯产区 优雅精致'
							}
						],
						num: 1,
						price: 24,
						is_type: 1
					},{
						id: 2,
						order_sn: '021255684',
						status: '待发货',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '普罗旺斯桃红葡萄酒',
								info: '普罗旺斯产区 优雅精致'
							},{
								src: '/static/img/online_img1.png',
								title: '普罗旺斯桃红葡萄酒',
								info: '普罗旺斯产区 优雅精致'
							}
						],
						num: 1,
						price: 24,
						is_type: 2
					},{
						id: 3,
						order_sn: '021255684',
						status: '待收货',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '普罗旺斯桃红葡萄酒',
								info: '普罗旺斯产区 优雅精致'
							}
						],
						num: 1,
						price: 24,
						is_type: 3
					},{
						id: 4,
						order_sn: '021255684',
						status: '待评价',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '普罗旺斯桃红葡萄酒',
								info: '普罗旺斯产区 优雅精致'
							}
						],
						num: 1,
						price: 24,
						is_type: 4
					}
				],
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.currentTab = opt.id;
			}
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
			},
			toOrderDetail(id,type){
				uni.navigateTo({
					url: '/pages/person/detail?id='+id+'&is_type='+type
				})
			},
			cancelOrder(id){
				uni.navigateTo({
					url: '/pages/person/cancel?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order{
		background: #eee;
	}
	.my_order_box{
		height: 85vh;
		.my_order_item{
			background: #fff;
			margin-top: 20rpx;
			padding-left: 30rpx;
			box-sizing: border-box;
			.moi_top{
				padding: 20rpx 30rpx 20rpx 0;
				box-sizing: border-box;
				color: #333;
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #eee;
				text{
					color: #f52f3e;
					font-weight: bold;
				}
			}
			.moi_center{
				padding: 20rpx 30rpx 20rpx 0;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				color: #333;
				font-size: 32rpx;
				font-weight: bold;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				&:active{
					background: #fafafa;
				}
				image{
					display: block;
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;
				}
				.moi_box{
					.moi_title{
						margin-bottom: 30rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						word-wrap: break-word;
						word-break: break-all;
					}
					.moi_info{
						font-size: 28rpx;
						color: #999;
					}
				}
			}
			.moi_all{
				background: #fafafa;
				display: flex;
				justify-content: flex-end;
				font-size: 28rpx;
				padding: 20rpx 30rpx 20rpx 0;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
			}
			.moi_bottom{
				padding: 20rpx 30rpx 20rpx 0;
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				flex-wrap: wrap;
				button{
					margin: 0 0 0 20rpx;
					background: #fff;
					font-size: 28rpx;
					border: 1px solid #ccc;
					color: #333;
					&:active{
						background: #eee;
					}
					&.red{
						color: #fff;
						font-weight: bold;
						background: #fd4b71;
						border-color: #fd4b71;
						&:active{
							opacity: .9;
						}
					}
					&:after{
						border: 0;
					}
				}
			}
		}
	}
</style>

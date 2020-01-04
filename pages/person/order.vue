<template>
	<view class="order">
		<uni-nav-bar leftIcon="back" title="商品订单"></uni-nav-bar>
		<scroll-view scroll-x="true" class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="my_order_box">
			<view class="my_order_item" v-for="(item,index) in orderList" :key="index">
				<view class="moi_top">
					订单号：{{item.order_sn}}
					<text>{{item.order_status_desc}}</text>
				</view>
				<view class="moi_center" @tap="toOrderDetail(item.order_id,item.order_status_code)" v-for="(order,idx) in item.goods_list" :key="idx">
					<image :src="order.original_img" mode="widthFix"></image>
					<view class="moi_box">
						<view class="moi_title">{{order.goods_name}}</view>
						<view class="moi_info">{{order.spec_key_name}}</view>
					</view>
				</view>
				<view class="moi_all">共{{length}}件商品 合计：￥{{item.total_amount}}</view>
				<view class="moi_bottom">
					<button @tap="toLogistics(item.order_id)" v-if="item.order_status_code == 'WAITRECEIVE'" type="default" size="mini" class="pad">查看物流</button>
					<button @tap="cancelOrder(item.order_id)" v-if="item.order_status_code == 'WAITPAY' || item.order_status_code == 'WAITSEND'" type="default" size="mini" class="pad">取消订单</button>
					<button v-if="item.order_status_code == 'WAITSEND' || item.order_status_code == 'WAITRECEIVE' || item.order_status_code == 'WAITCCOMMENT'" type="default" size="mini" class="pad">再次购买</button>
					<button v-if="item.order_status_code == 'WAITCCOMMENT'" type="default" size="mini">退换货</button>
					<button @tap="toConfirm(item.order_id)" v-if="item.order_status_code == 'WAITRECEIVE'" type="primary" size="mini" class="red pad">确认收货</button>
					<button @tap="toEvaluation(item.order_id)" v-if="item.order_status_code == 'WAITCCOMMENT'" type="primary" size="mini" class="red pad">评价有礼</button>
					<button v-if="item.order_status_code == 'WAITPAY'" type="primary" size="mini" class="red">付款</button>
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
				navbar:[{name:"全部"},{name:"待付款"},{name:"待发货"},{name:"待收货"},{name:"待评价"},{name:"已完成"},{name:"已取消"},{name:"已作废"}],
				currentTab:0,
				orderList: [
					// {
					// 	id: 1,
					// 	order_sn: '021255684',
					// 	status: '待付款',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '普罗旺斯桃红葡萄酒',
					// 			info: '普罗旺斯产区 优雅精致'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 1
					// }
				],
				length: 0,
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
			let params = {token: uni.getStorageSync('token')};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getOrderList(params).then((data)=>{
				this.orderList = data.data.result;
				this.length = data.data.result.goods_list.length;
			})
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
			},
			toConfirm(id){
				let params = {
					token: uni.getStorageSync('token'),
					order_id: id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.orderConfirm(params).then((data)=>{
					this.$api.msg(data.data.msg);
				})
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
			},
			toEvaluation(id){
				uni.navigateTo({
					url: '/pages/person/evaluation?id='+id
				})
			},
			toLogistics(id){
				uni.navigateTo({
					url: '/pages/person/logistics?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list_nav{
		white-space: nowrap;
		justify-content: flex-start;
		view{
			width: 150rpx;
			display: inline-block;
		}
	}
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
					width: 180rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					box-sizing: border-box;
					font-size: 28rpx;
					border: 1px solid #ccc;
					color: #333;
					&.pad{
						width: auto;
						padding: 0 30rpx;
					}
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

<template>
	<view class="offline_order">
		<uni-nav-bar leftIcon="back" title="套餐线下订单" rightText="线上订单" :isBtn="true" @clickRight="clickRightBtn"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="my_order_box">
			<view class="my_order_item" v-for="(item,index) in orderList" :key="index">
				<view class="moi_top">
					订单号：{{item.order_sn}}
					<text>{{item.status}}</text>
				</view>
				<view class="moi_center" @tap="toOrderDetail(item.id,item.is_type)" v-for="(order,idx) in item.list" :key="idx">
					<image :src="order.src" mode="widthFix"></image>
					<view class="moi_box">
						<view class="moi_title">{{order.title}}</view>
						<view class="moi_info">提货店铺：{{order.shop}}</view>
						<view class="moi_info">提货地址：{{order.address}}</view>
						<view class="moi_info">联系电话：{{order.phone}}</view>
					</view>
				</view>
				<view class="moi_all">共{{item.num}}件商品 合计：￥{{item.price}}</view>
				<view class="moi_bottom">
					<button v-if="item.is_type == 6" type="default" size="mini" class="orange pad">生成提货码</button>
					<button v-if="item.is_type == 7" type="default" size="mini" class="green">未提货</button>
					<button v-if="item.is_type == 8 || item.is_type == 9" type="default" size="mini">已提货</button>
					<button @tap="toEvaluation(item.id)" v-if="item.is_type == 9 && item.is_eval == 0" type="primary" size="mini" class="orange">评价</button>
					<button v-if="item.is_type == 9 && item.is_eval == 1" type="primary" size="mini">已评价</button>
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
				navbar:[{name:"全部"},{name:"待确认"},{name:"待提货"},{name:"已提货"},{name:"待评价"}],
				currentTab:0,
				orderList: [
					{
						id: 1,
						order_sn: '021255684',
						status: '套餐',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							}
						],
						num: 1,
						price: 24,
						is_type: 6,
						is_eval: 0
					},{
						id: 2,
						order_sn: '021255684',
						status: '套餐',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							},{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							}
						],
						num: 1,
						price: 24,
						is_type: 7,
						is_eval: 0
					},{
						id: 3,
						order_sn: '021255684',
						status: '套餐',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							}
						],
						num: 1,
						price: 24,
						is_type: 8,
						is_eval: 0
					},{
						id: 4,
						order_sn: '021255684',
						status: '套餐',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							}
						],
						num: 1,
						price: 24,
						is_type: 9,
						is_eval: 0
					},{
						id: 4,
						order_sn: '021255684',
						status: '套餐',
						list: [
							{
								src: '/static/img/online_img1.png',
								title: '女士套餐',
								shop: '广州越秀蓉蓉美衣',
								address: '广州市越秀区中山路119号',
								phone: '13855668899'
							}
						],
						num: 1,
						price: 24,
						is_type: 9,
						is_eval: 1,
						page: 1
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
			if(opt.idx != undefined){
				this.currentTab = opt.idx;
			}
		},
		methods:{
			clickRightBtn(){
				uni.redirectTo({
					url: '/pages/person/online_order'
				})
			},
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
			},
			toEvaluation(id){
				uni.navigateTo({
					url: '/pages/person/evaluation?id='+id
				})
			},
			loadMore(){
				this.page++;
				// let params = {
				// 	token: uni.getStorageSync('token'),
				// 	page: this.page,
				// 	limit: 10,
				// 	type: 1
				// };
				// let sign = this.$sign.getSign(params,this.AppSecret);
				// params.sign = sign;
				// this.$http.userCountOrderList(params).then((data)=>{
				// 	if(data.data.result.length == 0){
				// 		this.loadingType = 'noMore';
				// 		return;
				// 	}
				// 	this.mySales = this.mySales.concat(data.data.result);
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.offline_order{
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
				align-items: flex-start;
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
						font-size: 30rpx;
						color: #333;
						margin-bottom: 20rpx;
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
						margin-bottom: 10rpx;
						&:last-child{
							margin-bottom: 0;
						}
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
					background: #ccc;
					width: 150rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 28rpx;
					border: 1px solid #ccc;
					box-sizing: border-box;
					padding: 0;
					color: #fff;
					&.pad{
						width: auto;
						padding: 0 20rpx;
					}
					&.green{
						color: #fff;
						background: #390;
						border-color: #390;
						&:active{
							opacity: .9;
						}
					}
					&.orange{
						color: #fff;
						background: #f60;
						border-color: #f60;
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

<template>
	<view class="order_list">
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="list_nav" v-if="type == 'sale'">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="order_scroll">
			<view class="order_list_box" v-if="currentTab == 0">
				<view class="order_list_item" v-for="(item,index) in orderList" :key="index">
					<view class="oli_left">
						<view class="ol_name">卖家：{{item.name}}</view>
						<view class="ol_price">价格：<text>{{item.price}}</text>元/个</view>
					</view>
					<view class="oli_center">
						<view class="oc_total">订单总价：<text>{{item.total}}</text>元</view>
						<view class="oc_num">购买数量：<text>{{item.num}}</text>个</view>
					</view>
					<view class="oli_bottom">
						<button type="primary" @tap="toSeeDetail(item.id)">查看详情</button>
						<text>{{item.status}}</text>
					</view>
				</view>
			</view>
			<view class="order_list_box" v-if="currentTab == 1">
				<view class="order_list_item" v-for="(item,index) in mySales" :key="index">
					<view class="oli_left">
						<view class="ol_name">买家：{{item.name}}</view>
						<view class="ol_price">价格：<text>{{item.price}}</text>元/个</view>
					</view>
					<view class="oli_center">
						<view class="oc_total">订单总价：<text>{{item.total}}</text>元</view>
						<view class="oc_num">购买数量：<text>{{item.num}}</text>个</view>
					</view>
					<view class="oli_bottom" :class="[item.status == '已完成'?'no':'']">
						<button type="primary" v-if="item.status == '等待卖家确认'">确认</button>
						<button type="primary" v-if="item.status == '申诉中'">查看详情</button>
						<text>{{item.status}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				navbar: [{name:"我的购买"},{name:"我的销售"}],
				currentTab: 0,
				title: '订单列表（卖家）',
				loadingType: 'more',
				type: 'sale',
				orderList: [
					{
						name: '大东',
						price: '10',
						total: '8',
						num: 1,
						status: '申诉中'
					},{
						name: '大东',
						price: '10',
						total: '80',
						num: 1,
						status: '等待卖家确认'
					},{
						name: '大东',
						price: '10',
						total: '1000',
						num: 1,
						status: '已完成'
					}
				],
				mySales: [
					{
						name: '小N',
						price: '10',
						total: '8',
						num: 1,
						status: '申诉中'
					},{
						name: '小NIU',
						price: '10',
						total: '80',
						num: 1,
						status: '等待卖家确认'
					},{
						name: 'NICK',
						price: '10',
						total: '1000',
						num: 1,
						status: '已完成'
					}
				]
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			if(opt.type != undefined){
				this.type = opt.type;
			}
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
			},
			toSeeDetail(id){
				uni.navigateTo({
					url: '/pages/person/submit_success?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order_scroll{
		height: 80vh;
	}
	.order_list_box{
		.order_list_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 30rpx 20rpx;
			box-sizing: border-box;
			color: #999;
			font-size: 28rpx;
			border-bottom: 1px solid #eee;
			.oli_left{
				width: 38%;
				.ol_name{
					color: #333;
					font-size: 32rpx;
					margin-bottom: 15rpx;
				}
				.ol_price{
					color: #900;
					font-size: 28rpx;
					text{
						color: #f00;
						font-weight: bold;
						margin-right: 5rpx;
					}
				}
			}
			.oli_center{
				width: 37%;
				.oc_total{
					color: #900;
					font-size: 28rpx;
					margin-bottom: 20rpx;
					text{
						color: #f00;
						font-weight: bold;
						margin-right: 5rpx;
					}
				}
				.oc_num{
					text{
						color: #900;
						margin: 0 5rpx;
					}
				}
			}
			.oli_bottom{
				width: 25%;
				&.no{
					display: flex;
					align-self: flex-end;
				}
				button{
					line-height: 1.6;
					color: #fff;
					font-size: 26rpx;
					background: #f60;
					margin-bottom: 20rpx;
					&:after{
						border: 0;
					}
				}
			}
		}
	}
</style>

<template>
	<view class="detail">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="订单详情"></uni-nav-bar>
		<view class="wait_pay_box">
			<block v-if="is_type == 1">
				<view class="txt">等待付款</view>
				<view class="count_box">
					剩
					<uni-countdown
						class="countdown"
						color="#FFFFFF" 
						background-color="#fa486e" 
						border-color="#fa486e" 
						splitorColor="#fff"
						:show-day="false"
						:show-hour="false"
						:minute="30" 
						:show-colon="false"
						:second="0" :reset="false">
					</uni-countdown>
					自动关闭
				</view>
			</block>
			<block v-if="is_type == 2"><view class="txt">等待发货</view></block>
			<block v-if="is_type == 3"><view class="txt">等待收货</view></block>
			<block v-if="is_type == 4"><view class="txt">交易完成</view></block>
			<block v-if="is_type == 5"><view class="txt">已取消</view></block>
			<block v-if="is_type == 6 || is_type == 7">
				<view class="txt">提货码</view>
				<view class="count_box copy">PG1358964578fHGD</view>
			</block>
			<block v-if="is_type == 8 || is_type == 9">
				<view class="txt">换货码</view>
				<view class="count_box copy">CG1358964578fHGD</view>
			</block>
		</view>
		<view class="logistics_info" v-if="is_type == 3 || is_type == 4" @tap="toLogistics">
			<view>物流信息 <text>{{log}}</text></view>
			<image src="/static/icon/arrow.png" mode="widthFix"></image>
		</view>
		<!-- <view class="logistics_info">
			<view>物流信息 <text>已签收</text></view>
			<image src="/static/icon/arrow.png" mode="widthFix"></image>
		</view> -->
		<view class="person_info">
			<view class="pi_title">亮亮专营店 <text>1866981688</text></view>
			<view class="pi_info">地址：广东省深圳市南山区西丽镇沙河西路12号</view>
		</view>
		<view class="goods_box">
			<view class="goods_pop_item" v-for="(item,index) in goodsList" :key="index">
				<image :src="item.src" mode="widthFix"></image>
				<view class="gp_center">
					<view class="gp_title">{{item.title}}</view>
					<view class="gp_info">{{item.info}}</view>
					<view class="gp_price">￥{{item.price}}</view>
				</view>
				<view class="gp_num">x{{item.num}}</view>
			</view>
		</view>
		<view class="order_info_box">
			<view class="oib_item"><text>订单编号：</text>2539129895</view>
			<view class="oib_item border"><text>下单时间：</text>2019.12.18 18:08</view>
			<view class="oib_item"><text>支付方式：</text>微信支付</view>
			<view class="oib_item"><text>商品合计：</text>1</view>
			<view class="oib_item"><text>干洗费：</text>30</view>
			<view class="oib_item"><text>优惠券：</text>0</view>
			<view class="oib_item border"><text>运费：</text>+￥10.00</view>
			<view class="oib_bottom_pay"><text>实付款：</text>￥40.00</view>
		</view>
		<view class="service_time_box">
			<view class="service_time">服务时间：<text>9:00-24:00</text></view>
			<view class="service_btn">
				<button type="default"><image src="/static/icon/kefu.png" mode="widthFix"></image>在线客服</button>
				<button type="default"><image src="/static/icon/dianhua.svg" mode="widthFix"></image>电话客服</button>
			</view>
		</view>
		<view class="fixed_order_bottom">
			<!-- istype: 1：待付款  2：待发货  3：待收货  4：待评价  5：已取消 -->
			<button v-if="is_type == 3" type="default" size="mini">查看物流</button>
			<button v-if="is_type == 1 || is_type == 2 || is_type == 5" type="default" size="mini">取消订单</button>
			<button v-if="is_type == 2 || is_type == 3 || is_type == 4" type="default" size="mini">再次购买</button>
			<button v-if="is_type == 4" type="default" size="mini">退换货</button>
			<button v-if="is_type == 3" type="primary" size="mini" class="red">确认收货</button>
			<button @tap="toEvaluation" v-if="is_type == 4" type="primary" size="mini" class="red">评价有礼</button>
			<button v-if="is_type == 1" type="primary" size="mini" class="red">付款</button>
			<button v-if="is_type == 6 || is_type == 7" type="primary" size="mini" class="red">生成提货码</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniCountdown from "@/components/uni-count-down/uni-countdown.vue"
	export default{
		data(){
			return{
				id: '',
				is_type: 1,
				log: '离开【太原中心】，下一站【广州中心】',
				goodsList: [
					{
						src: '/static/img/order_img2.png',
						title: '精装女士大衣',
						info: '普罗旺斯 优雅精致',
						price: '118',
						num: 1
					},{
						src: '/static/img/order_img3.png',
						title: '精装女士大衣',
						info: '普罗旺斯 优雅精致',
						price: '118',
						num: 1
					},{
						src: '/static/img/order_img1.png',
						title: '精装女士大衣',
						info: '普罗旺斯 优雅精致',
						price: '118',
						num: 1
					}
				],
			}
		},
		components:{
			uniNavBar,
			uniCountdown
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.id = opt.id;
				this.is_type = opt.is_type;
				if(this.is_type == 4){
					this.log = '已签收';
				}
			}
		},
		methods:{
			toLogistics(){
				uni.navigateTo({
					url: '/pages/person/logistics'
				})
			},
			toEvaluation(){
				uni.navigateTo({
					url: '/pages/person/evaluation'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail{
		background: #eee;
	}
	.wait_pay_box{
		background: #fa486e;
		padding: 30rpx;
		box-sizing: border-box;
		height: 180rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		color: #fff;
		font-size: 28rpx;
		font-weight: bold;
		.txt{
			width: 100%;
			font-size: 32rpx;
		}
		.count_box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			&.copy{
				
			}
		}
	}
	.logistics_info{
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		color: #999;
		font-size: 28rpx;
		&:active{
			background: #eee;
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
		view{
			width: 95%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text{
				color: #000;
				margin-left: 20rpx;
			}
		}
	}
	.person_info{
		padding: 30rpx;
		box-sizing: border-box;
		background: #fafafa;
		color: #999;
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
		.pi_title{
			color: #333;
			font-size: 32rpx;
			margin-bottom: 10rpx;
			text{
				margin-left: 10rpx;
			}
		}
	}
	.goods_pop_item{
		background: #fff;
		.gp_center{
			width: 65%;
		}
	}
	.goods_box{
		margin-bottom: 20rpx;
	}
	.order_info_box{
		padding: 30rpx 0 20rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 20rpx;
		.oib_item{
			color: #333;
			font-size: 28rpx;
			font-weight: bold;
			margin-bottom: 15rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			&.border{
				padding-bottom: 15rpx;
				border-bottom: 1px solid #eee;
			}
			text{
				display: block;
				width: 180rpx;
				color: #999;
			}
		}
		.oib_bottom_pay{
			color: #ff2a3a;
			font-size: 32rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			text{
				display: block;
				width: 180rpx;
				color: #999;
				font-size: 28rpx;
			}
		}
	}
	.service_time_box{
		background: #fafafa;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		margin-bottom: 120rpx;
		.service_time{
			color: #999;
			font-size: 28rpx;
			margin-bottom: 20rpx;
			text{
				color: #333;
			}
		}
		.service_btn{
			display: flex;
			justify-content: space-between;
			align-items: center;
			button{
				padding: 0;
				margin: 0;
				display: block;
				width: 45%;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid #eee;
				background: #fff;
				color: #333;
				font-size: 32rpx;
				&:active{
					background: #fafafa;
				}
				&:after{
					border: 0;
				}
				image{
					display: block;
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.fixed_order_bottom{
		position: fixed;
		width: 100%;
		height: 100rpx;
		left: 0;
		bottom: 0;
		z-index: 5;
		background: #fff;
		padding: 20rpx 30rpx 20rpx 0;
		border-top: 1px solid #ccc;
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
</style>

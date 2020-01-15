<template>
	<view class="detail">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="订单详情"></uni-nav-bar>
		<view class="wait_pay_box">
			<block v-if="is_type == 'WAITPAY' || orderInfo.order_status_code == 'WAITPAY'">
				<view class="txt">等待付款</view>
				<!-- <view class="count_box">
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
				</view> -->
			</block>
			<block v-if="is_type == 'WAITSEND' || orderInfo.order_status_code == 'WAITSEND'"><view class="txt">等待发货</view></block>
			<block v-if="is_type == 'WAITRECEIVE' || orderInfo.order_status_code == 'WAITRECEIVE'"><view class="txt">等待收货</view></block>
			<block v-if="is_type == 'WAITCCOMMENT' || orderInfo.order_status_code == 'WAITCCOMMENT'"><view class="txt">等待评价</view></block>
			<block v-if="is_type == 'FINISH' || orderInfo.order_status_code == 'FINISH'"><view class="txt">交易完成</view></block>
			<block v-if="is_type == 'CANCEL' || orderInfo.order_status_code == 'CANCEL'"><view class="txt">已取消</view></block>
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
			<view class="pi_title">{{orderInfo.consignee}} <text>{{orderInfo.mobile}}</text></view>
			<view class="pi_info">地址：{{orderInfo.province_name+orderInfo.city_name+orderInfo.district_name+orderInfo.address}}</view>
		</view>
		<view class="goods_box">
			<view class="goods_pop_item" v-for="(item,index) in orderInfo.goods_list" :key="index">
				<image :src="url+item.original_img" mode="widthFix"></image>
				<view class="gp_center">
					<view class="gp_title">{{item.goods_name}}</view>
					<view class="gp_info">{{item.spec_key_name}}</view>
					<view class="gp_price">￥{{item.goods_price}}</view>
				</view>
				<view class="gp_num">x{{item.goods_num}}</view>
			</view>
		</view>
		<view class="order_info_box">
			<view class="oib_item"><text>订单编号：</text>{{orderInfo.order_sn}}</view>
			<view class="oib_item border"><text>下单时间：</text>{{orderInfo.add_time}}</view>
			<!-- <view class="oib_item"><text>支付方式：</text>微信支付</view> -->
			<view class="oib_item"><text>商品合计：</text>{{orderInfo.goods_list.length}}</view>
			<!-- <view class="oib_item"><text>干洗费：</text>30</view> -->
			<!-- <view class="oib_item"><text>优惠券：</text>0</view> -->
			<view class="oib_item border"><text>运费：</text>+￥{{orderInfo.shipping_price}}</view>
			<view class="oib_bottom_pay"><text>实付款：</text>￥{{orderInfo.total_amount}}</view>
		</view>
		<!-- <view class="service_time_box">
			<view class="service_time">服务时间：<text>9:00-24:00</text></view>
			<view class="service_btn">
				<button type="default"><image src="/static/icon/kefu.png" mode="widthFix"></image>在线客服</button>
				<button type="default"><image src="/static/icon/dianhua.svg" mode="widthFix"></image>电话客服</button>
			</view>
		</view> -->
		<view class="fixed_order_bottom">
			<!-- istype: WAITPAY：待付款  WAITSEND：待发货  WAITRECEIVE：待收货  WAITCCOMMENT：待评价  5：已取消 -->
			<button v-if="is_type == 'WAITRECEIVE'" type="default" size="mini">查看物流</button>
			<button @tap="cancelOrder" v-if="is_type == 'WAITPAY' || is_type == 'WAITSEND'" type="default" size="mini">取消订单</button>
			<button @tap="buyAgain" v-if="is_type == 'WAITSEND' || is_type == 'CANCEL' || orderInfo.order_status_code == 'CANCEL' || orderInfo.order_status_code == 'WAITSEND' || is_type == 'WAITCCOMMENT'" type="default" size="mini">再次购买</button>
			<button v-if="is_type == 'WAITRECEIVE'" type="default" size="mini">退换货</button>
			<button @tap="toConfirm" v-if="is_type == 'WAITRECEIVE'" type="primary" size="mini" class="red">确认收货</button>
			<button @tap="toEvaluation" v-if="is_type == 'WAITCCOMMENT'" type="primary" size="mini" class="red">去评价</button>
			<button v-if="is_type == 'WAITPAY' || orderInfo.order_status_code == 'WAITPAY'" type="primary" size="mini" class="red">付款</button>
			<button v-if="is_type == 6 || is_type == 7" type="primary" size="mini" class="red">生成提货码</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniCountdown from "@/components/uni-count-down/uni-countdown.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				id: '',
				is_type: 1,
				log: '离开【太原中心】，下一站【广州中心】',
				orderInfo: {},
				goodsList: [
					// {
					// 	src: '/static/img/order_img2.png',
					// 	title: '精装女士大衣',
					// 	info: '普罗旺斯 优雅精致',
					// 	price: '118',
					// 	num: 1
					// }
				],
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniCountdown
		},
		onLoad(opt) {
			console.log(opt);
			this.url = this.$http.url;
			if(opt.id != undefined){
				this.id = opt.id;
				this.is_type = opt.is_type;
				if(this.is_type == 4){
					this.log = '已签收';
				}
			}
			let params = {
				id: this.id,
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getOrderDetail(params).then((data)=>{
				this.orderInfo = data.data.result;
				this.orderInfo.add_time = util.formatTime(this.orderInfo.add_time);
			})
		},
		methods:{
			toLogistics(){
				uni.navigateTo({
					url: '/pages/person/logistics?id='+this.id
				})
			},
			toEvaluation(){
				uni.navigateTo({
					url: '/pages/person/evaluation?id='+this.id
				})
			},
			buyAgain(){
				uni.switchTab({
					url: '/pages/index/shop'
				})
			},
			toConfirm(){
				let params = {
					token: uni.getStorageSync('token'),
					order_id: this.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.orderConfirm(params).then((data)=>{
					this.$api.msg(data.data.msg);
				})
			},
			cancelOrder(){
				uni.showModal({
					title: "提示",
					content: "确定取消该订单？",
					success: (res) => {
						if(res.confirm){
							let params = {
								token: uni.getStorageSync('token'),
								order_id: this.id
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.cancelOrder(params).then((data)=>{
								this.$api.msg(data.data.msg);
								if(data.data.status == 1){
									this.is_type = '';
									let params1 = {
										id: this.id,
										token: uni.getStorageSync('token')
									};
									let sign1 = this.$sign.getSign(params1,this.AppSecret);
									params1.sign = sign1;
									this.$http.getOrderDetail(params1).then((data)=>{
										this.orderInfo = data.data.result;
										this.orderInfo.add_time = util.formatTime(this.orderInfo.add_time);
									})
								}
							})
						}
					}
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

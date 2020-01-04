<template>
	<view class="submit_success">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="提交成功"></uni-nav-bar>
		<view class="success_top">
			<view class="success_title" v-if="type == 'success'">提交成功</view>
			<view class="success_title" v-if="type == 'back'">撤销成功</view>
			<view class="success_title" v-if="type == 'order'">订单确认</view>
			<view class="success_title" v-if="type == 'complaint'">申诉中</view>
			<view class="success_title" v-if="type == 'pay'">支付信息已发送给卖家</view>
			<view class="success_title" v-if="type == 'finish'">订单完成</view>
			<view class="success_title" v-if="type == 'complaint_success'">申诉成功</view>
			
			<view class="success_info" v-if="type == 'success'">您挂卖请求已经成功提交</view>
			<view class="success_info" v-if="type == 'back'">您挂卖请求已经成功撤销</view>
			<view class="success_info" v-if="type == 'order'">
				已发放 <text>1</text> 个资格到买家 <text>NICK</text>
			</view>
			<view class="success_info" v-if="type == 'complaint'">买家NICE，对该订单发起申诉。</view>
			<view class="success_info" v-if="type == 'pay'">请耐心等候卖家确认</view>
			<view class="success_info" v-if="type == 'complaint_loading'">
				<view>您的申诉请求已提交到后台，</view>
				<view>我们会在24小时内给您答复，请耐心等待。</view>
			</view>
			<view class="success_info" v-if="type == 'complaint_success'">
				<view>经平台核实，您的申诉请求如实，</view>
				<view>我们将您的请求处理，请 <text @tap="toCustomer"> 联系客服</text></view>
			</view>
			


			<view class="complaint_txt" v-if="type == 'complaint'">
				<view class="com_title">申诉内容</view>
				<view class="com_content">我下单5天了卖家还没确认订单，请确认订单</view>
			</view>
			
			<view class="success_btn">
				<button type="primary" @tap="toOrderList" v-if="type == 'order' || type == 'complaint' || type == 'pay'" size="mini">订单列表</button>
				<button type="primary" v-if="type == 'complaint'" size="mini">确认订单</button>
				<button type="primary" @tap="toSeeReply" v-if="type == 'complaint'" size="mini">查看回复</button>
				<button type="primary" @tap="toSellList" v-if="type == 'success' || type == 'back'" size="mini">挂卖列表</button>
				<button type="primary" @tap="toSell" v-if="type != 'complaint' && type != 'pay'" size="mini">继续挂卖</button>
				<button type="primary" @tap="toBuy" v-if="type == 'finish'" size="mini">继续购买</button>
				<button type="primary" @tap="toRemind" v-if="type == 'pay'" size="mini">提醒卖家</button>
			</view>
		</view>
		<view class="success_bottom">
			<view class="sb_left">
				<view>卖家：小靓</view>
				<view>单价：￥8.00</view>
				<view>数量：1个</view>
			</view>
			<view class="sb_right" :class="[type == 'order'?'order':'']">
				<button @tap="toComplaint" type="primary" size="mini">我要申诉</button>
				<!-- <button @tap="editComplaint(id)" type="primary" size="mini">修改申诉</button> -->
				<!-- <button @tap="toCustomer" class="contact_btn" type="primary" size="mini">联系客服</button> -->
				<view>总价：<text>8</text>元</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				id: '',
				type: 'success'
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.type != undefined){
				this.type = opt.type;
			}
		},
		methods:{
			toOrderList(){
				uni.redirectTo({
					url: '/pages/person/order_list'
				})
			},
			toSellList(){
				uni.redirectTo({
					url: '/pages/person/sell_list'
				})
			},
			toSell(){
				uni.redirectTo({
					url: '/pages/person/hang_sell'
				})
			},
			toComplaint(){
				uni.redirectTo({
					url: '/pages/person/complaint'
				})
			},
			toCustomer(){
				uni.redirectTo({
					url: '/pages/person/chat'
				})
			},
			toRemind(){
				
			},
			editComplaint(id){
				uni.redirectTo({
					url: '/pages/person/complaint?id='+id
				})
			},
			toSeeReply(){
				uni.redirectTo({
					url: '/pages/person/see_reply'
				})
			},
			toBuy(){
				uni.redirectTo({
					url: '/pages/person/sell'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.submit_success{
		background: #eee;
	}
	.success_top{
		margin-bottom: 20rpx;
		background: #fff;
		text-align: center;
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
		.success_title{
			color: #ff2a3a;
			font-size: 44rpx;
			margin-bottom: 30rpx;
		}
		.success_info{
			color: #999;
			font-size: 28rpx;
			margin-bottom: 50rpx;
			text{
				color: #c00;
				margin: 0 5rpx;
			}
		}
		.complaint_txt{
			color: #999;
			font-size: 28rpx;
			margin-bottom: 80rpx;
			.com_title{
				font-weight: bold;
				margin-bottom: 20rpx;
			}
		}
		.success_btn{
			display: flex;
			justify-content: space-around;
			align-items: center;
			button{
				border-radius: 5rpx;
				background: #fff;
				border: 1px solid #dadada;
				color: #333;
				font-size: 32rpx;
				&:after{
					border: 0;
				}
			}
		}
	}
	.success_bottom{
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx 40rpx 30rpx 30rpx;
		box-sizing: border-box;
		.sb_left{
			color: #666;
			font-size: 28rpx;
			width: 50%;
			view{
				margin-bottom: 10rpx;
				&:last-child{
					margin-bottom: 0;
				}
			}
		}
		.sb_right{
			color: #666;
			font-size: 28rpx;
			text-align: right;
			&.order{
				display: flex;
				align-self: flex-end;
			}
			button{
				width: 246rpx;
				background: #f60;
				color: #fff;
				font-size: 26rpx;
				margin-bottom: 15rpx;
				&:after{
					border: 0;
				}
			}
			.contact_btn{
				background: #fff;
				border: 1px solid #dadada;
				color: #333;
				font-size: 28rpx;
			}
			view{
				margin-right: 30rpx;
			}
		}
	}
</style>

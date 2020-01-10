<template>
	<view class="submit_success">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="success_top">
			<!-- 买家 -->
			<block v-if="fromInfo == 0">
				<view class="success_title" v-if="type == 'success' || status == 0">提交成功</view>
				<view class="success_title" v-if="type == 'back'">撤销成功</view>
				<view class="success_title" v-if="type == 'order'">订单确认</view>
				<view class="success_title" v-if="type == 'complaint' || status == 2">申诉中</view>
				<view class="success_title" v-if="type == 'pay' || status == 1">支付信息已发送给卖家</view>
				<view class="success_title" v-if="type == 'finish' || status == 3">订单完成</view>
				<view class="success_title" v-if="type == 'complaint_success' || status == 5">申诉成功</view>
				
				<view class="success_info" v-if="type == 'success' || status == 0">您挂卖请求已经成功提交</view>
				<view class="success_info" v-if="type == 'back'">您挂卖请求已经成功撤销</view>
				<view class="success_info" v-if="type == 'finish' || status == 3">卖家已发放名额</view>
				
				<view class="success_info" v-if="type == 'pay' || status == 1">请耐心等候卖家确认</view>
				<view class="success_info" v-if="type == 'complaint_loading' || status == 2">
					<view>您的申诉请求已提交到后台，</view>
					<view>我们会在24小时内给您答复，请耐心等待。</view>
				</view>
				<view class="success_info" v-if="type == 'complaint_success' || status == 5">
					<view>经平台核实，您的申诉请求如实，</view>
					<view>我们将您的请求处理，请 <text @tap="toCustomer"> 联系客服</text></view>
				</view>
				<view class="success_info" v-if="type == 'complaint_success' || status == 6">
					<view>经平台核实，您的申诉请求不符合事实，</view>
					<view>已驳回，如有异议，请 <text @tap="toCustomer"> 联系客服</text></view>
				</view>
			</block>
			<!-- 卖家 -->
			<block v-if="fromInfo == 1">
				<view class="success_title" v-if="type == 'success' || status == 0">等待买家付款</view>
				<view class="success_title" v-if="type == 'pay' || status == 1">订单确认</view>
				<view class="success_title" v-if="type == 'complaint' || status == 2">申诉中</view>
				<view class="success_info" v-if="type == 'complaint' || status == 2">买家{{buyname}}，对该订单发起申诉。</view>
				
				<view class="success_info" v-if="type == 'success' || status == 0">买家挂卖请求已经成功提交</view>
				<view class="success_info" v-if="type == 'order' || status == 1">
					已发放 <text>1</text> 个资格到买家 <text>{{buyname}}</text>
				</view>
				<view class="complaint_txt" v-if="type == 'complaint' || status == 2">
					<view class="com_title">申诉内容</view>
					<view class="com_content">{{memo}}</view>
				</view>
			</block>
			
			<view class="success_btn">
				<block v-if="fromInfo == 0">
					<button type="primary" @tap="toOrderList" v-if="type == 'order' || type == 'complaint' || type == 'pay' || status == 1 || status == 2 || status == 3 || status == 5 || status == 6" size="mini">订单列表</button>
					<button type="primary" @tap="toSeeReply(id)" v-if="type == 'complaint' || status == 5 || status == 6" size="mini">查看回复</button>
					<button type="primary" @tap="toSellList" v-if="type == 'success' || type == 'back' || status == 0" size="mini">挂卖列表</button>
					<button type="primary" @tap="toCancel(id)" v-if="type == 'pay' || status == 0" size="mini">取消订单</button>
					<button type="primary" @tap="toSell" v-if="type == 'success' || type == 'back' || status == 0" size="mini">继续挂卖</button>
					<button type="primary" @tap="toBuy" v-if="type == 'finish' || status == 2 || status == 3" size="mini">继续购买</button>
					<button type="primary" @tap="toRemind" v-if="type == 'pay' || status == 1" size="mini">提醒卖家</button>
				</block>
				<block v-if="fromInfo == 1">
					<button type="primary" @tap="toOrderList" v-if="type == 'order' || type == 'complaint' || status == 1 || status == 2" size="mini">订单列表</button>
					<button @tap="successOrder(id,status)" type="primary" v-if="type == 'complaint' || status == 2" size="mini">确认订单</button>
					<button @tap="toSeeReply(id)" type="primary" v-if="type == 'complaint' || status == 2" size="mini">查看回复</button>
					<button type="primary" @tap="toSell" v-if="type == 'success' || type == 'back' || status == 1" size="mini">继续挂卖</button>
				</block>
			</view>
		</view>
		<view class="success_bottom">
			<view class="sb_left">
				<view v-if="sell == 0 && fromInfo == 0">卖家：{{salename}}</view>
				<view v-if="sell == 0 && fromInfo == 1">买家：{{buyname}}</view>
				<view>单价：￥{{price}}</view>
				<view>数量：{{num}}个</view>
			</view>
			 <!-- :class="[type == 'order'?'order':'']" -->
			<view class="sb_right">
				<block v-if="sell == 0 && fromInfo == 0">
					<button @tap="toComplaint(id)" v-if="status == 1" type="primary" size="mini">我要申诉</button>
					<button @tap="toPay(id)" v-if="status == 0" type="primary" size="mini">去支付</button>
					<button @tap="editComplaint(id)" v-if="status == 2" type="primary" size="mini">修改申诉</button>
					<button @tap="toCustomer" v-if="status == 5 || status == 6" class="contact_btn" type="primary" size="mini">联系客服</button>
				</block>
				<block v-if="sell == 0 && fromInfo == 1">
					<button @tap="toComplaint(id)" v-if="status == 2" type="primary" size="mini">我要申诉</button>
				</block>
				<view>总价：<text>{{total}}</text>元</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				title: '订单详情',
				id: '',
				fromInfo: 0,	//我的购买：0  我的销售：1
				user_id: '',
				buy_user_id: '',
				sell_user_id: '',
				type: 'success',
				c_type: '',	//投诉类型   0:买家  1:卖家
				status: null,
				buyname: '',
				salename: '',
				price: '',
				num: '',
				total: '',
				memo: '',
				sell: 0,
				payment: [],
				payment_name: []
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.fromInfo = opt.from;
				console.log(this.fromInfo);
				this.type = opt.type;
				this.status = opt.status;
				this.id = opt.id;
				console.log(opt);
			}
			console.log(opt.sell);
			if(opt.sell != undefined){
				this.type = opt.type;
				console.log(this.type);
				this.sell = opt.sell;
				if(this.sell == 1){
					this.title = '提交成功';
				}
				if(this.sell == 2){
					this.title = '撤销成功';
				}
				
				let info = JSON.parse(opt.info);
				this.price = info.price;
				this.num = info.num;
				this.total = info.total;
				console.log(info);
			}else{
				let params = {
					token: uni.getStorageSync('token'),
					order_id: opt.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.userCountOrderInfo(params).then((data)=>{
					this.buy_user_id = opt.buy_user_id;
					this.sell_user_id = opt.sell_user_id;
					this.buyname = data.data.result.buy_user_name;
					this.salename = data.data.result.sell_user_name;
					this.price = data.data.result.price;
					this.num = data.data.result.num;
					this.total = data.data.result.total;
					this.payment = data.data.result.pic;
					this.memo = data.data.result.memo;
					for(let i in data.data.result.pic){
						this.payment_name[i] = data.data.result.pic[i].pay_name;
					}
				})
			}
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.user_id = data.data.result.user_id;
				
				if(this.user_id == this.buy_user_id){
					this.c_type = 0
				}
				if(this.user_id == this.sell_user_id){
					this.c_type = 1;
				}
			})
		},
		methods:{
			toPay(id){
				if(this.payment.length == 2){
					uni.showActionSheet({
						itemList: this.payment_name,
						success: (res) => {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
							uni.navigateTo({
								url: '/pages/person/pay_code?id='+this.id+'&title='+this.payment[res.tapIndex].pay_name+'&pic='+this.payment[res.tapIndex].pic+'&type='+this.payment[res.tapIndex].pay_code+'&total='+this.total
							})
						}
					})
				}else{
					uni.navigateTo({
						url: '/pages/person/pay_code?id='+this.id+'&title='+this.payment[0].pay_name+'&pic='+this.payment[0].pic+'&type='+this.payment[0].pay_code+'&total='+this.total
					})
				}
				// uni.navigateTo({
				// 	url: '/pages/car/pay?id='+id
				// })
			},
			successOrder(id,status){
				uni.showModal({
					title: "提示",
					content: "是否确认该订单？",
					success: (res) => {
						if(res.confirm){
							let params = {
								token: uni.getStorageSync('token'),
								order_id: id
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.userCountSuccessOrder(params).then((data)=>{
								if(data.data.status == 1){
									this.$api.msg(data.data.result);
									setTimeout(()=>{
										uni.navigateTo({
											url: '/pages/person/submit_success?id='+id+'&status='+status+'&from=1'
										})
									},1500)
								}else{
									this.$api.msg(data.data.msg);
								}
							})
						}
					}
				})
			},
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
			toCancel(id){
				let params = {
					token: uni.getStorageSync('token'),
					order_id: id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.userCountOrderCancel(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/person/order_list'
							})
						},1500)
					}else{
						this.$api.msg(data.data.msg);
					}
				})
			},
			toSell(){
				uni.redirectTo({
					url: '/pages/person/hang_sell'
				})
			},
			toComplaint(id){
				uni.navigateTo({
					url: '/pages/person/complaint?id='+id+'&type='+this.fromInfo
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
				uni.navigateTo({
					url: '/pages/person/complaint?id='+id+'&type='+this.fromInfo
				})
			},
			toSeeReply(id){
				uni.navigateTo({
					url: '/pages/person/see_reply?id='+id+'&type='+this.fromInfo
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
		align-items: flex-end;
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

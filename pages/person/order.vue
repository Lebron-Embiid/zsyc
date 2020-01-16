<template>
	<view class="order">
		<uni-nav-bar leftIcon="back" title="商品订单"></uni-nav-bar>
		<scroll-view scroll-x="true" class="list_nav" :scroll-into-view="nav_current">
			<view v-for="(item,index) in navbar" :id="'nav'+index" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</scroll-view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="my_order_box">
			<view class="my_order_item" v-for="(item,index) in orderList" :key="index">
				<view class="moi_top">
					订单号：{{item.order_sn}}
					<text>{{item.order_status_desc}}</text>
				</view>
				<view class="moi_center" @tap="toOrderDetail(item.order_id,item.order_status_code)" v-for="(order,idx) in item.goods_list" :key="idx">
					<image :src="url+order.original_img" mode="widthFix"></image>
					<view class="moi_box" :class="[item.order_status_code == 'WAITCCOMMENT'?'width':'']">
						<view class="moi_title">{{order.goods_name}}</view>
						<view class="moi_info">{{order.spec_key_name}}</view>
					</view>
					<button @tap.stop="toEvaluation(order.order_id,idx)" v-if="item.order_status_code == 'WAITCCOMMENT'" type="primary" size="mini" class="red">评价</button>
				</view>
				<view class="moi_all">共{{item.goods_list.length}}件商品 合计：￥{{item.total_amount}}</view>
				<view class="moi_bottom">
					<!-- <button @tap="toLogistics(item.order_id)" v-if="item.order_status_code == 'WAITRECEIVE'" type="default" size="mini" class="pad">查看物流</button> -->
					<button @tap="cancelOrder(item.order_id)" v-if="item.order_status_code == 'WAITPAY' || item.order_status_code == 'WAITSEND'" type="default" size="mini" class="pad">取消订单</button>
					<button @tap="buyAgain" v-if="item.order_status_code == 'WAITSEND' || item.order_status_code == 'CANCEL' || item.order_status_code == 'WAITCCOMMENT'" type="default" size="mini" class="pad">再次购买</button>
					<button v-if="item.order_status_code == 'WAITRECEIVE'" type="default" size="mini">退换货</button>
					<button @tap="toConfirm(item.order_id)" v-if="item.order_status_code == 'WAITRECEIVE'" type="primary" size="mini" class="red pad">确认收货</button>
					<!-- <button @tap="toEvaluation(item.order_id)" v-if="item.order_status_code == 'WAITCCOMMENT'" type="primary" size="mini" class="red pad">去评价</button> -->
					<button @tap="payOrder(item.order_id)" v-if="item.order_status_code == 'WAITPAY'" type="primary" size="mini" class="red">付款</button>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</scroll-view>
		<uni-popup class="uni-popup" ref="pay" type="center">
			<view class="pay_fix_content">
				<text>请选择支付方式</text>
				<radio-group @change="changeCode">
					<label v-for="(item,index) in payList" :key='index'>
						<radio :value="item.code" color="#fb5860" /><text>{{item.name}}</text>
					</label>
				</radio-group>
				<button type="primary" class="ok" @tap="toBuyOrder">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		data(){
			return{
				navbar:[{name:"全部"},{name:"待付款"},{name:"待发货"},{name:"待收货"},{name:"待评价"},{name:"已完成"},{name:"已取消"}],
				currentTab:0,
				order_id: '',
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
				pay_radio: '',
				payList: [],
				nav_current: '',
				loadingType: 'more',
				url: '',
				page: 1
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
			uniPopup
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.id != undefined){
				this.order_id = opt.id;
			}
			if(opt.idx != undefined){
				this.currentTab = opt.idx;
				this.nav_current = 'nav'+opt.idx;
				console.log(this.nav_current);
			}
			var type = '';
			if(opt.idx == 0){
				type = '';
			}else if(opt.idx == 1){
				type = 'WAITPAY';
			}else if(opt.idx == 2){
				type = 'WAITSEND';
			}else if(opt.idx == 3){
				type = 'WAITRECEIVE';
			}else if(opt.idx == 4){
				type = 'WAITCCOMMENT';
			}else if(opt.idx == 5){
				type = 'FINISH';
			}else if(opt.idx == 6){
				type = 'CANCEL';
			}else if(opt.idx == 7){
				type = 'CANCELLED';
			}
			console.log(type,this.currentTab);
			let params = {
				token: uni.getStorageSync('token'),
				type: type,
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getOrderList(params).then((data)=>{
				this.orderList = data.data.result;
			})
		},
		methods:{
			changeCode(e){
				this.pay_radio = e.detail.value;
			},
			navbarTap(e){
				this.currentTab = e;
				this.page = 1;
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 1){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'WAITPAY',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 2){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'WAITSEND',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 3){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'WAITRECEIVE',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 4){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'WAITCCOMMENT',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 5){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'FINISH',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 6){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'CANCEL',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else if(this.currentTab == 7){
					let params = {
						token: uni.getStorageSync('token'),
						type: 'CANCELLED',
						page: 1,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}
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
					this.getInitOrder();
				})
			},
			toOrderDetail(id,type){
				uni.navigateTo({
					url: '/pages/person/detail?id='+id+'&is_type='+type
				})
			},
			cancelOrder(id){
				uni.showModal({
					title: "提示",
					content: "确定取消该订单？",
					success: (res) => {
						if(res.confirm){
							let params = {
								token: uni.getStorageSync('token'),
								order_id: id
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.cancelOrder(params).then((data)=>{
								this.$api.msg(data.data.msg);
								this.getInitOrder();
							})
						}
					}
				})
				// uni.navigateTo({
				// 	url: '/pages/person/cancel?id='+id
				// })
			},
			toEvaluation(id,idx){
				uni.navigateTo({
					url: '/pages/person/evaluation?id='+id+'&idx='+idx
				})
			},
			payOrder(id){
				this.order_id = id;
				let params = {
					token: uni.getStorageSync('token'),
					order_id: id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.shopOrderPay(params).then((data)=>{
					this.payList = data.data.result.paymentList;
					this.$refs.pay.open();
				})
			},
			toBuyOrder(){
				if(this.pay_radio == ''){
					this.$api.msg('请选择支付方式');
					return;
				}
				let params1 = {
					order_id: this.order_id,
					pay_radio: JSON.parse(JSON.stringify('pay_code='+this.pay_radio))
				};
				let sign1 = this.$sign.getSign(params1,this.AppSecret);
				params1.sign = sign1;
				this.$http.thirdPay(params1).then((data1)=>{
					this.$api.msg(data1.data.msg);
					let url = this.$http.url+data1.data.result;
					if(data1.data.status == 1){
						// #ifdef APP-PLUS
						if(uni.getSystemInfoSync().platform == 'android'){
							plus.runtime.openURL(url);
						}
						if(uni.getSystemInfoSync().platform == 'ios'){
							plus.runtime.install(url);
						}
						// #endif
						//#ifdef H5
						window.location.href = url;
						//#endif
					}
				})
			},
			buyAgain(){
				uni.switchTab({
					url: '/pages/index/shop'
				})
			},
			toLogistics(id){
				uni.navigateTo({
					url: '/pages/person/logistics?id='+id
				})
			},
			getInitOrder(){
				let type = '';
				switch(this.currentTab){
					case 0: type = '';
						break;
					case 1: type = 'WAITPAY';
						break;
					case 2: type = 'WAITSEND';
						break;
					case 3: type = 'WAITRECEIVE';
						break;
					case 4: type = 'WAITCCOMMENT';
						break;
					case 5: type = 'FINISH';
						break;
					case 6: type = 'CANCEL';
						break;
					case 7: type = 'CANCELLED';
						break;
				}
				let params = {
					token: uni.getStorageSync('token'),
					type: type,
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getOrderList(params).then((data)=>{
					this.orderList = data.data.result;
				})
			},
			loadMore(){
				this.page++;
				let type = '';
				switch(this.currentTab){
					case 0: type = '';
						break;
					case 1: type = 'WAITPAY';
						break;
					case 2: type = 'WAITSEND';
						break;
					case 3: type = 'WAITRECEIVE';
						break;
					case 4: type = 'WAITCCOMMENT';
						break;
					case 5: type = 'FINISH';
						break;
					case 6: type = 'CANCEL';
						break;
					case 7: type = 'CANCELLED';
						break;
				}
				console.log(type);
				let params = {
					token: uni.getStorageSync('token'),
					type: type,
					page: this.page,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getOrderList(params).then((data)=>{
					if(data.data.result.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.orderList = this.orderList.concat(data.data.result);
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
				button{
					margin: 0 0 0 20rpx;
					background: #fff;
					width: 130rpx;
					height: 60rpx;
					padding: 0 !important;
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
				image{
					display: block;
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;
				}
				.moi_box{
					width: 80%;
					&.width{
						width: 60%;
					}
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

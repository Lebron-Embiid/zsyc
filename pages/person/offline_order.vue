<template>
	<view class="offline_order">
		<uni-nav-bar leftIcon="back" title="套餐线下订单" rightText="线上订单" :isBtn="true" @clickRight="clickRightBtn"></uni-nav-bar>
		<view class="list_nav" scroll-x="true" :scroll-into-view="nav_current">
			<view v-for="(item,index) in navbar" :key="index" :id="'nav'+index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" @scrolltolower="loadMore" class="my_order_box">
			<view class="my_order_item" v-for="(item,index) in orderList" :key="index">
				<view class="moi_top">
					订单号：{{item.order_sn}}
					<text>{{item.order_status_desc}}</text>
				</view>
				<view class="moi_center" @tap="toOrderDetail(item.order_id,item.order_status_code)" v-for="(order,idx) in item.goods_list" :key="idx">
					<image :src="url+order.original_img" mode="widthFix"></image>
					<view class="moi_box">
						<view class="moi_title">{{order.goods_name}}</view>
						<view class="moi_info">提货店铺：{{item.store_name}}</view>
						<view class="moi_info">提货地址：{{item.store_address}}</view>
						<view class="moi_info">联系电话：{{item.store_phone}}</view>
					</view>
				</view>
				<view class="moi_all">共{{item.goods_list.length}}件商品 合计：￥{{item.total_amount}}</view>
				<view class="moi_bottom">
					<button @tap="payOrder(item.order_id)" v-if="item.order_status_code == 'WAITPAY'" type="default" size="mini" class="orange pad">请支付</button>
					<button v-if="item.is_type == 6" type="default" size="mini" class="orange pad">生成提货码</button>
					<button v-if="item.is_type == 7" type="default" size="mini" class="green">未提货</button>
					<button v-if="item.is_type == 8 || item.is_type == 9" type="default" size="mini">已提货</button>
					<button @tap="toEvaluation(item.id)" v-if="item.is_type == 9 && item.is_eval == 0" type="primary" size="mini" class="orange">评价</button>
					<button v-if="item.is_type == 9 && item.is_eval == 1" type="primary" size="mini">已评价</button>
					<button @tap="buyAgain" v-if="item.order_status_code == 'WAITSEND' || item.order_status_code == 'CANCEL' || item.order_status_code == 'FINISH' || item.order_status_code == 'WAITCCOMMENT'" type="default" size="mini" class="pad">再次购买</button>
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
				navbar:[{name:"全部"},{name:"待支付"},{name:"待提货"},{name:"已提货"},{name:"已完成"},{name:"已取消"}],
				currentTab:0,
				orderList: [
					// {
					// 	id: 1,
					// 	order_sn: '021255684',
					// 	status: '套餐',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 6,
					// 	is_eval: 0
					// },{
					// 	id: 2,
					// 	order_sn: '021255684',
					// 	status: '套餐',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		},{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 7,
					// 	is_eval: 0
					// },{
					// 	id: 3,
					// 	order_sn: '021255684',
					// 	status: '套餐',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 8,
					// 	is_eval: 0
					// },{
					// 	id: 4,
					// 	order_sn: '021255684',
					// 	status: '套餐',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 9,
					// 	is_eval: 0
					// },{
					// 	id: 4,
					// 	order_sn: '021255684',
					// 	status: '套餐',
					// 	list: [
					// 		{
					// 			src: '/static/img/online_img1.png',
					// 			title: '女士套餐',
					// 			shop: '广州越秀蓉蓉美衣',
					// 			address: '广州市越秀区中山路119号',
					// 			phone: '13855668899'
					// 		}
					// 	],
					// 	num: 1,
					// 	price: 24,
					// 	is_type: 9,
					// 	is_eval: 1,
					// 	page: 1
					// }
				],
				pay_radio: '',
				payList: [],
				url: '',
				page: 1,
				nav_current: '',
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
			uniPopup
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.idx != undefined){
				this.currentTab = opt.idx;
				this.nav_current = 'nav'+opt.idx;
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
			}
			let params = {
				token: uni.getStorageSync('token'),
				type: type,
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.offlineOrderList(params).then((data)=>{
				this.orderList = data.data.result;
			})
		},
		methods:{
			changeCode(e){
				this.pay_radio = e.detail.value;
			},
			clickRightBtn(){
				uni.redirectTo({
					url: '/pages/person/online_order'
				})
			},
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				var type = '';
				if(this.currentTab == 0){
					type = '';
				}else if(this.currentTab == 1){
					type = 'WAITPAY';
				}else if(this.currentTab == 2){
					type = 'WAITSEND';
				}else if(this.currentTab == 3){
					type = 'WAITRECEIVE';
				}else if(this.currentTab == 4){
					type = 'WAITCCOMMENT';
				}else if(this.currentTab == 5){
					type = 'FINISH';
				}else if(this.currentTab == 6){
					type = 'CANCEL';
				}
				let params = {
					token: uni.getStorageSync('token'),
					type: type,
					page: 1,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.offlineOrderList(params).then((data)=>{
					this.orderList = data.data.result;
				})
			},
			toOrderDetail(id,type){
				uni.navigateTo({
					url: '/pages/person/detail?id='+id+'&is_type='+type
				})
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
			toEvaluation(id){
				uni.navigateTo({
					url: '/pages/person/evaluation?id='+id
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
				var type = '';
				if(this.currentTab == 0){
					type = '';
				}else if(this.currentTab == 1){
					type = 'WAITPAY';
				}else if(this.currentTab == 2){
					type = 'WAITSEND';
				}else if(this.currentTab == 3){
					type = 'WAITRECEIVE';
				}else if(this.currentTab == 4){
					type = 'WAITCCOMMENT';
				}else if(this.currentTab == 5){
					type = 'FINISH';
				}else if(this.currentTab == 6){
					type = 'CANCEL';
				}
				let params = {
					token: uni.getStorageSync('token'),
					type: type,
					page: this.page,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.offlineOrderList(params).then((data)=>{
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
					height: 160rpx !important;
					margin-right: 20rpx;
				}
				.moi_box{
					width: 70%;
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

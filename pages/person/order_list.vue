<template>
	<view class="order_list">
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="list_nav" v-if="type == 1">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="order_scroll" @scrolltolower="loadMore" :class="[type==0?'height':'']">
			<view class="order_list_box" v-if="currentTab == 0">
				<view class="order_list_item" v-for="(item,index) in orderList" :key="index">
					<view class="oli_left">
						<view class="ol_name">卖家：{{item.sell_user_name}}</view>
						<view class="ol_price">价格：<text>{{item.price}}</text>元/个</view>
					</view>
					<view class="oli_center">
						<view class="oc_total">订单总价：<text>{{item.total}}</text>元</view>
						<view class="oc_num">购买数量：<text>{{item.num}}</text>个</view>
					</view>
					<view class="oli_bottom" :class="[item.status == 4?'no':'']">
						<button type="primary" @tap="toSeeDetail(item.id,item.status)" v-if="item.status != 4">查看详情</button>
						<text>{{item.status_name}}</text>
					</view>
				</view>
			</view>
			<view class="order_list_box" v-if="currentTab == 1">
				<view class="order_list_item" v-for="(item,index) in mySales" :key="index">
					<view class="oli_left">
						<view class="ol_name">买家：{{item.buy_user_name}}</view>
						<view class="ol_price">价格：<text>{{item.price}}</text>元/个</view>
					</view>
					<view class="oli_center">
						<view class="oc_total">订单总价：<text>{{item.total}}</text>元</view>
						<view class="oc_num">购买数量：<text>{{item.num}}</text>个</view>
					</view>
					<view class="oli_bottom" :class="[item.status == 3||item.status == 4||item.status == 5||item.status == 6?'no':'']">
						<button @tap="successOrder(item.id,item.status)" type="primary" v-if="item.status == 1">确认</button>
						<button @tap="toSeeDetail(item.id,item.status)" type="primary" v-if="item.status == 0 || item.status == 2">查看详情</button>
						<text>{{item.status_name}}</text>
					</view>
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
				navbar: [{name:"我的购买"},{name:"我的销售"}],
				currentTab: 0,
				title: '订单列表',
				loadingType: 'more',
				type: 'sale',
				level: '',
				page: 0,
				orderList: [
					// {
					// 	name: '大东',
					// 	price: '10',
					// 	total: '8',
					// 	num: 1,
					// 	status: '申诉中'
					// }
				],
				mySales: [
					// {
					// 	name: '小N',
					// 	price: '10',
					// 	total: '8',
					// 	num: 1,
					// 	status: '申诉中'
					// }
				]
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			
		},
		onShow() {
			if(this.currentTab == 0){
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10,
					type: 0
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.userCountOrderList(params).then((data)=>{
					this.orderList = data.data.result;
				})
			}else{
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10,
					type: 1
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.userCountOrderList(params).then((data)=>{
					this.mySales = data.data.result;
				})
			}
			let params1 = {
				token: uni.getStorageSync('token')
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.getUserInfo(params1).then((data)=>{
				this.type = data.data.result.is_business;
			})
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
				this.page = 0;
				if(e == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: 0
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.userCountOrderList(params).then((data)=>{
						this.orderList = data.data.result;
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: 1
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.userCountOrderList(params).then((data)=>{
						this.mySales = data.data.result;
					})
				}
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
			toSeeDetail(id,status){
				uni.navigateTo({
					url: '/pages/person/submit_success?id='+id+'&status='+status+'&from='+this.currentTab
				})
			},
			loadMore(){
				this.page++;
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: this.page,
						limit: 10,
						type: 0
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.userCountOrderList(params).then((data)=>{
						if(data.data.result.length == 0){
							this.loadingType = 'noMore';
							return;
						}
						this.orderList = this.orderList.concat(data.data.result);
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: this.page,
						limit: 10,
						type: 1
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.userCountOrderList(params).then((data)=>{
						if(data.data.result.length == 0){
							this.loadingType = 'noMore';
							return;
						}
						this.mySales = this.mySales.concat(data.data.result);
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.order_scroll{
		height: 85vh;
		&.height{
			height: 92vh;
		}
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
					padding: 5rpx 0;
					&:after{
						border: 0;
					}
				}
			}
		}
	}
</style>

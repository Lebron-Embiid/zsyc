<template>
	<view class="sell_list">
		<uni-nav-bar left-icon="back" title="挂卖列表" rightText="我的挂卖" @clickRight="toMySell"></uni-nav-bar>
		<view class="sell_list_box">
			<view class="sell_list_item" v-for="(item,index) in sellList" :key="index">
				<view class="sli_top">
					<view class="st_price">价格：<text>{{item.price}}</text>元/个</view>
					<view class="st_num">挂卖数量<text>{{item.num}}</text>个</view>
				</view>
				<view class="sli_bottom">
					<view class="sli_left">
						<view class="sl_price">挂卖总价：<text>{{parseInt(item.price)*item.num}}</text>元</view>
						<view class="sl_time">挂卖时间：<text>{{util.formatDate(item.add_time)}}</text></view>
					</view>
					<view class="sli_right">
						<button type="primary" @tap="seeOrderList(item.id)" class="green" size="mini">查看订单</button>
						<button type="primary" v-if="item.user_id == user_id" @tap="toCancel(index,item.id)" size="mini">撤销</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				user_id: '',
				sellList: [
					// {
					// 	price: '8',
					// 	num: 10000,
					// 	total_price: '80000',
					// 	time: '2019-12-31'
					// }
				],
				util: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.util = util;
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.user_id = data.data.result.user_id;
			})
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 10,
				is_seller: 0
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCountlist(params).then((data)=>{
				this.sellList = data.data.result;
			})
		},
		methods:{
			toMySell(){
				let params = {
					token: uni.getStorageSync('token'),
					page: 1,
					limit: 10,
					is_seller: 1
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getUserCountlist(params).then((data)=>{
					this.sellList = data.data.result;
				})
			},
			seeOrderList(id){
				uni.navigateTo({
					url: '/pages/person/order_list?id='+id
				})
			},
			toCancel(idx,id){
				let params = {
					token: uni.getStorageSync('token'),
					order_id: id
				};
				
				let info = {
					price: this.sellList[idx].price,
					num: this.sellList[idx].num,
					total: parseInt(this.sellList[idx].price)*this.sellList[idx].num
				}
				
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.cancelUserCount(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/person/submit_success?type=back&sell=2&info='+JSON.stringify(info)
							})
						},1500)
					}else{
						this.$api.msg(data.data.msg);
					}
				})
			}
		},
		onPullDownRefresh() {
			uni.startPullDownRefresh();
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 10,
				is_seller: 0
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCountlist(params).then((data)=>{
				this.sellList = data.data.result;
			})
		}
	}
</script>

<style scoped lang="scss">
	.sell_list_box{
		.sell_list_item{
			padding: 15rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.sli_top{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 10rpx;
				.st_price{
					color: #900;
					font-size: 28rpx;
					margin-right: 50rpx;
					text{
						color: #f00;
						font-size: 32rpx;
					}
				}
				.st_num{
					color: #999;
					font-size: 28rpx;
					text{
						color: #900;
						margin: 0 5rpx;
					}
				}
			}
			.sli_bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sli_left{
					.sl_price{
						color: #900;
						font-size: 28rpx;
						margin-bottom: 5rpx;
						text{
							color: #ff2a3a;
							font-size: 36rpx;
							margin-right: 5rpx;
						}
					}
					.sl_time{
						color: #999;
						font-size: 28rpx;
					}
				}
				.sli_right{
					button{
						display: block;
						margin: 0;
						line-height: 1.6;
						color: #fff;
						background: #f60;
						font-size: 26rpx;
						&.green{
							background: #090;
							margin-bottom: 10rpx;
						}
						&:after{
							border: 0;
						}
					}
				}
			}
		}
	}
</style>

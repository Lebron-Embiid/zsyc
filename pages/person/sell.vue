<template>
	<view class="sell">
		<uni-nav-bar leftIcon="back" title="套餐资格挂卖区"></uni-nav-bar>
		<view class="filter_nav_box">
			<view class="filter_nav_item">
				<text>排序</text>
			</view>
			<view class="filter_nav_item" @tap="changeSortOne">
				<text>时间</text>
				<image class="icon" v-if="sort_one == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_one == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortTwo">
				<text>销量</text>
				<image class="icon" v-if="sort_two == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_two == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortThree">
				<text>数量</text>
				<image class="icon" v-if="sort_three == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_three == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSort">
				<text>价格</text>
				<view v-if="sort_type == 0">
					<image class="icon rotate" :src="down_icon_on" mode="widthFix"></image>
					<image class="icon" :src="down_icon" mode="widthFix"></image>
				</view>
				<view v-if="sort_type == 1">
					<image class="icon rotate" :src="down_icon" mode="widthFix"></image>
					<image class="icon" :src="down_icon_on" mode="widthFix"></image>
				</view>
				<view v-if="sort_type == null">
					<image class="icon rotate" :src="down_icon" mode="widthFix"></image>
					<image class="icon" :src="down_icon" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="gray-place"></view>
		<scroll-view scroll-y="true" class="sell_scroll_box">
			<view class="sell_item" v-for="(item,index) in sellList" :key="index">
				<view class="sell_top">
					<view class="st_name">{{item.name}}</view>
					<view class="st_num">剩余数量<text>{{item.over}}</text>个</view>
				</view>
				<view class="sell_bottom">
					<view class="sb_price">价格：<text>{{item.price}}</text>元/个</view>
					<view class="sb_all">日销量<text>{{item.num}}</text>个</view>
					<button type="primary" size="mini" @tap="toShowPopup(index)">点击购买</button>
				</view>
			</view>
		</scroll-view>
		<uni-popup class="uni-popup" ref="popup" type="bottom">
			<view class="sell_popup_box">
				<image @tap="hidePopup" src="/static/icon/close1.png" mode="widthFix"></image>
				<view class="pop_left">
					<view class="pop_name">卖家：小靓</view>
					<view class="pop_price">价格：<text>8</text> 元/个</view>
				</view>
				<view class="pop_right">
					<view class="box">
						<view class="pop_name">日销量<text>503</text>个</view>
						<view class="pop_price">剩余数量<text>12345</text>个</view>
					</view>
				</view>
				<view class="num_title">数量</view>
				<uni-number-box :min="0" :max="99" @change="bindNumberChange"></uni-number-box>
				<view class="txt_till">温馨提示：购买套餐资格是点对点支付方式，您支付成功后，资金会直接到卖家账上，请用屏幕截图截取支付成功页面作凭证。</view>
				<view class="pop_right">
					<view class="box">
						<view class="pay_all">支付总价：<view><text>8</text>元</view></view>
					</view>
				</view>
			</view>
			<button type="primary" class="query_btn" @tap="querySell">确定</button>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default{
		data(){
			return{
				down_icon_on: '/static/icon/down1.png',
				down_icon: '/static/icon/down.png',
				sort_one: 0,
				sort_two: 0,
				sort_three: 0,
				sort_type: null,
				sellList: [
					{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					},{
						name: '小靓',
						over: 12345,
						price: 9,
						num: 403
					}
				],
				page: 0
			}
		},
		components:{
			uniNavBar,
			uniPopup,
			uniNumberBox
		},
		onLoad() {
			let params = {
				token: uni.getStorageSync('token'),
				sort_name: 'add_time',
				page: 0,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCountlist(params).then((data)=>{
				
			})
		},
		methods:{
			toShowPopup(idx){
				this.$refs.popup.open();
			},
			hidePopup(){
				this.$refs.popup.close();
			},
			querySell(){
				this.$refs.popup.close();
			},
			bindNumberChange(e){
				console.log(e);
			},
			changeSortOne(){
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_type = null;
				if(this.sort_one == 0){
					this.sort_one = 1;
					// let params = {
					// 	id: this.id,
					// 	sort: 'goods_id',
					// 	sort_asc: 'desc'
					// };
					// let sign = this.$sign.getSign(params,this.AppSecret);
					// params.sign = sign;
					// this.$http.getGoodsList(params).then((data)=>{
					// 	this.recommendList = data.data.result.goods_list;
					// })
				}else{
					this.sort_one = 0;
				}
			},
			changeSortTwo(){
				this.sort_one = 0;
				this.sort_three = 0;
				this.sort_type = null;
				if(this.sort_two == 0){
					this.sort_two = 1;
				}else{
					this.sort_two = 0;
				}
			},
			changeSortThree(){
				this.sort_two = 0;
				this.sort_one = 0;
				this.sort_type = null;
				if(this.sort_three == 0){
					this.sort_three = 1;
				}else{
					this.sort_three = 0;
				}
			},
			changeSort(){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				if(this.sort_type == null){
					this.sort_type = 0;
				}else if(this.sort_type == 0){
					this.sort_type = 1;
				}else{
					this.sort_type = 0;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.sell_popup_box{
		background: rgba(255,255,255,.9);
		padding: 50rpx 80rpx 0;
		box-sizing: border-box;
		position: relative;
		image{
			display: block;
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
		.pop_left{
			.pop_name{
				color: #333;
				font-size: 32rpx;
				margin-bottom: 10rpx;
			}
			.pop_price{
				color: #900;
				font-size: 28rpx;
				text{
					font-size: 40rpx;
				}
			}
		}
		.pop_right{
			display: flex;
			justify-content: flex-end;
			.box{
				width: 50%;
				.pop_name{
					color: #999;
					font-size: 28rpx;
					margin-bottom: 10rpx;
					text{
						color: #900;
						margin: 0 5rpx;
					}
				}
				.pop_price{
					color: #900;
					font-size: 28rpx;
					text{
						color: #ff2a3a;
						font-size: 36rpx;
						margin: 0 5rpx;
					}
				}
				.pay_all{
					color: #999;
					font-size: 28rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin-bottom: 50rpx;
					view{
						color: #900;
						font-size: 32rpx;
						text{
							color: #f00;
							font-size: 40rpx;
						}
					}
				}
			}
		}
		.num_title{
			color: #666;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
		.txt_till{
			color: #999;
			font-size: 28rpx;
			margin: 30rpx 0 80rpx;
		}
	}
	.query_btn{
		border-radius: 0;
		background: #fb496e;
		color: #fff;
		&:after{
			border: 0;
		}
	}
	.sell_scroll_box{
		padding: 0 20rpx 30rpx;
		box-sizing: border-box;
		height: 85vh;
		.sell_item{
			padding: 30rpx 15rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.sell_top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #333;
				font-size: 32rpx;
				margin-bottom: 20rpx;
				.st_name{
					width: 50%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.st_num{
					color: #900;
					font-size: 28rpx;
					text{
						color: #ff2a3a;
						font-size: 36rpx;
						margin: 0 5rpx;
					}
				}
			}
			.sell_bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.sb_price{
					color: #900;
					font-size: 28rpx;
					text{
						color: #f00;
						font-size: 32rpx;
					}
				}
				.sb_all{
					font-size: 28rpx;
					color: #999;
					text{
						color: #900;
						margin: 0 5rpx;
					}
				}
				button{
					margin: 0;
					color: #fff;
					background: #f60;
					line-height: 1.8;
					&:after{
						border: 0;
					}
				}
			}
		}
	}
	.filter_nav_box{
		background: #fafafa;
		padding: 10rpx;
		box-sizing: border-box;
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #eee;
		.filter_nav_item{
			color: #666;
			font-size: 32rpx;
			background: #fdfdfd;
			width: 140rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 70%;
				text-align: center;
			}
			.icon{
				display: block;
				width: 16rpx;
				height: 10rpx;
				margin-left: 10rpx;
				&.rotate{
					transform: rotate(180deg);
					margin-bottom: 6rpx;
				}
			}
			.list_icon{
				display: block;
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
</style>

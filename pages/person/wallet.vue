<template>
	<view class="wallet">
		<uni-nav-bar left-icon="back" title="我的钱包"></uni-nav-bar>
		<view class="wallet_top">
			<view class="wt_left">
				<view class="wt_avatar">
					<image :src="avatar" mode="widthFix"></image>
					<view class="wa_box">
						<view class="wa_title">{{nickname}}</view>
						<view class="wa_level">{{level}}</view>
					</view>
				</view>
				<view class="wt_price">余额：￥{{price}}</view>
			</view>
			<view class="wt_right">
				<button @tap="toRecharge" type="primary" size="mini">我要充值</button>
				<button @tap="toWithdraw" type="primary" size="mini">我要提现</button>
			</view>
		</view>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @tap="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="income_scroll">
			<view class="income_list_box" v-if="currentTab == 0">
				<view class="income_list_item" v-for="(item,index) in rechargeList" :key="index">
					<view class="item_left">
						<view class="ili_title">{{item.title}}</view>
						<view class="ili_time">{{util.formatDate1(item.reg_time)}}</view>
					</view>
					<view class="item_center">{{item.type}}</view>
					<view class="item_right">{{item.price}}</view>
				</view>
			</view>
			<view class="income_list_box" v-if="currentTab == 1">
				<view class="income_list_item" v-for="(item,index) in withdrawList" :key="index">
					<view class="item_left">
						<view class="ili_title">{{item.title}}</view>
						<view class="ili_time">{{util.formatDate1(item.create_time)}}</view>
					</view>
					<view class="item_right" style="font-size: 28rpx;">{{item.money}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				avatar: '',
				nickname: '',
				level: '',
				price: '',
				navbar:[{name:'充值记录'},{name:'提现记录'}],
				currentTab: 0,
				rechargeList: [
					{
						title: '充值',
						reg_time: 820425600,
						type: '支付宝充值',
						price: '+800'
					}
				],
				withdrawList: [
					{
						title: '提现',
						reg_time: 820425600,
						price: '+800'
					}
				],
				util: '',
				list: [],
				page: 0
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.util = util;
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				if(data.data.result.head_pic != '/public/image/toux-icon.png'){
					this.avatar = this.$http.url+data.data.result.head_pic;
				}else{
					this.avatar = '/static/avatar/avatar.png';
				}
				this.nickname = data.data.result.nickname;
				this.level = data.data.result.level_name;
				this.price = data.data.result.user_money;
			})
			
			let params1 = {
				token: uni.getStorageSync('token'),
				page: 0,
				limit: 10
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.withdrawalsList(params1).then((data)=>{
				this.withdrawList = data.data.result;
			})
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
				// let params = {
				// 	cid: id,
				// 	page: 0,
				// 	limit: 10
				// };
				// let sign = this.$sign.getSign(params,this.AppSecret);
				// params.sign = sign;
				// this.$http.articleList(params).then((data)=>{
				// 	this.findList = data.data.result;
				// })
			},
			toRecharge(){
				uni.navigateTo({
					url: '/pages/person/recharge'
				})
			},
			toWithdraw(){
				let params = {
					token: uni.getStorageSync('token')
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.withdrawalsList(params).then((data)=>{
					this.list = data.data.result;
					let is_with = false;
					for(let i in this.list){
						console.log(this.list[i].status);
						if(this.list[i].status == 0){
							is_with = true;
							if(is_with == true){
								uni.navigateTo({
									url: '/pages/person/withdraw_apply'
								})
								return;
							}else{
								uni.navigateTo({
									url: '/pages/person/withdraw'
								})
								return;
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.wallet_top{
		background: url('~@/static/img/person_bg.jpg') center center no-repeat;
		background-size: 100% 100%;
		padding: 40rpx 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.wt_left{
			width: 70%;
			color: #fff;
			.wt_avatar{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: 20rpx;
				image{
					display: block;
					width: 132rpx;
					height: 132rpx;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				.wa_title{
					font-size: 32rpx;
					margin-bottom: 10rpx;
					font-weight: bold;
				}
				.wa_level{
					font-size: 28rpx;
				}
			}
			.wt_price{
				font-size: 32rpx;
			}
		}
		.wt_right{
			width: 30%;
			display: flex;
			justify-content: flex-end;
			flex-wrap: wrap;
			button{
				display: block;
				height: 76rpx;
				line-height: 76rpx;
				margin: 0;
				background: #f90;
				margin-bottom: 20rpx;
				&:last-child{
					margin-bottom: 0;
				}
				&:after{
					border: 0;
				}
			}
		}
	}
	
	.income_scroll{
		height: 79vh;
		.income_list_box{
			.income_title{
				color: #999;
				font-size: 28rpx;
				background: #eee;
				padding: 10rpx 30rpx;
				box-sizing: border-box;
			}
			.income_list_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				.item_left{
					width: 40%;
					.ili_title{
						color: #333;
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}
					.ili_time{
						color: #999;
						font-size: 24rpx;
					}
				}
				.item_center{
					color: #333;
					font-size: 28rpx;
				}
				.item_right{
					color: #333;
					font-size: 36rpx;
				}
			}
		}
	}
</style>

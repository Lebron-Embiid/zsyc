<template>
	<view class="my_income">
		<uni-nav-bar left-icon="back" title="我的收益" rightText="我的钱包" :isBtn="true" @clickRight="toMyWallet"></uni-nav-bar>
		<view class="income_bg">
			<image class="bg" src="/static/img/income_bg.png" mode="widthFix"></image>
			<view class="layer">
				<image class="avatar" :src="avatar" mode="widthFix"></image>
				<view class="income_price">
					<view>我的收益 <text>{{income}}</text> 元</view>
					<view class="last"><text>{{point}}</text>认购积分</view>
				</view>
			</view>
		</view>
		<view class="message_box">
			<view class="message_item" @tap="toIncome(index,item.name,item.type)" v-for="(item,index) in incomeList" :key="index">
				<view class="icon_box">
					<image class="icon" :src="'/static/icon/income_icon'+(index+1)+'.png'" mode="widthFix"></image>
				</view>
				<view class="msg_content">
					<view class="msg_box">
						<view class="msg_title">{{item.name}}<view v-if="index<4">已推：<text>{{item.tj_num}}</text>人</view></view>
						<view class="msg_info">总收益：<text>{{item.sum_reward}}</text>元</view>
					</view>
					<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				avatar: '',
				income: 0,
				point: 0,
				incomeList: [
					// {
					// 	icon: '/static/icon/income_icon1.png',
					// 	type: '分享会员收益',
					// 	number: 500,
					// 	income: 88888
					// },{
					// 	icon: '/static/icon/income_icon2.png',
					// 	type: '分享直营店收益',
					// 	number: 500,
					// 	income: 88888
					// },{
					// 	icon: '/static/icon/income_icon3.png',
					// 	type: '分享分公司收益',
					// 	number: 500,
					// 	income: 88888
					// },{
					// 	icon: '/static/icon/income_icon4.png',
					// 	type: '分享联合创始人收益',
					// 	number: 500,
					// 	income: 88888
					// }
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getReward(params).then((data)=>{
				this.incomeList = data.data.result;
				for(let i=0;i<=3;i++){
					this.income += parseInt(this.incomeList[i].sum_reward);
				}
				this.point = data.data.result[4].sum_reward;
			})
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				if(data.data.result.head_pic != null){
					this.avatar = this.$http.url+data.data.result.head_pic;
				}else{
					this.avatar = '/static/avatar/avatar.png';
				}
			})
		},
		methods:{
			toMyWallet(){
				uni.navigateTo({
					url: '/pages/person/wallet'
				})
			},
			toIncome(idx,name,type){
				uni.navigateTo({
					url: '/pages/person/income_list?type='+type+'&idx='+idx+'&name='+name
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.income_bg{
		position: relative;
		.bg{
			display: block;
			width: 100%;
		}
		.layer{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			text-align: left;
			.avatar{
				display: block;
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin: 100rpx auto 0;
			}
			.income_price{
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				color: #fff;
				font-size: 32rpx;
				font-weight: bold;
				margin-top: 5rpx;
				// width: 50%;
				// transform: translateX(80%);
				// display: inline-flex;
				// align-items: center;
				view{
					&.last{
						margin-left: 30rpx;
					}
					text{
						font-size: 40rpx;
						margin: 0 5rpx 0 10rpx;
					}
				}
			}
		}
	}
	.message_box{
		padding: 20rpx 0 50rpx;
		.message_item{
			&:active{
				background: #eee;
			}
			.icon_box{
				.icon{
					max-width: 60rpx;
					max-height: 74rpx !important;
				}
			}
			.msg_content{
				&.width{
					width: 100%;
				}
				.msg_box{
					.msg_title{
						display: flex;
						justify-content: space-between;
						align-items: center;
						view{
							color: #666;
							font-size: 28rpx;
							text{
								color: #f00;
								font-size: 32rpx;
								margin: 0 5rpx;
							}
						}
					}
					.msg_info{
						text{
							color: #f00;
							font-size: 32rpx;
							margin: 0 5rpx;
						}
					}
				}
			}
			&:last-child{
				.msg_content{
					border-bottom: 1px solid #eee;
				}
			}
		}
	}
</style>

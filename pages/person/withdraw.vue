<template>
	<view class="withdraw">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要提现"></uni-nav-bar>
		<view class="order_address" @tap="selectAccount">
			<view class="oa_left" v-if="has_account==false">
				<view class="no_title">请选择提现账号</view>
			</view>
			<view class="oa_left" v-else>
				<view class="oa_default">
					<text class="default" v-if="recinfo.is_default == 1">默认</text>
				</view>
				<view class="oa_title_box">
					<view class="oa_title">账户类型：{{recinfo.code=='alipay'?'支付宝':'银行卡'}}</view>
					<view class="oa_title">账号：{{recinfo.account}}</view>
					<view class="oa_title" v-if="recinfo.code != 'alipay'">开户行：{{recinfo.bank_name}}</view>
					<view class="oa_title">户名：{{recinfo.realname}}</view>
				</view>
			</view>
			<image src="/static/icon/arrow.png" mode="widthFix"></image>
		</view>
		<view class="recharge_box">
			<view class="till_phone">提现手机号：{{till.mobile}}</view>
			<view class="auth_ipt_box">
				<view class="ipt_box">
					<input type="text" placeholder="短信验证码" v-model="code" />
				</view>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<input type="number" placeholder="" v-model="withdraw_num" />
			<view class="till">请输入{{till.bei}}的整数倍，单笔提现不超过<text>{{till.max}}</text>元，最低提现{{till.min}}元，账户必须{{till.need}}元才能提现</view>
			<button @tap="submit" type="primary" size="mini">确认提现</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	var timer;
	export default{
		data(){
			return{
				withdraw_num: '',
				has_account: true,
				recinfo: {},
				till:{},
				code:'',
				second: 0,
			}
		},
		computed: {
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					return this.second+'秒';
				}
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			let params = {token: uni.getStorageSync('token')};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.withdrawApply(params).then((data)=>{
				this.till = data.data.result;
			})
		},
		onShow() {
			let params = {token: uni.getStorageSync('token')};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getAccountDefault(params).then((data)=>{
				if(this.recinfo == null){
					this.has_account = false;
				}else{
					this.recinfo = data.data.result;
					this.has_account = true;
				}
				
				if(uni.getStorageSync('selectAccount') != ''){
					uni.getStorage({
						key:'selectAccount',
						success: (e) => {
							console.log(e);
							this.recinfo = e.data;
							this.has_account = true;
						}
					})
				}else{
					this.has_account = false;
				}
			})
			
			console.log(uni.getStorageSync('selectAccount'));
			
		},
		methods:{
			selectAccount(){
				uni.navigateTo({
					url: '/pages/person/cash_list?type=select'
				})
			},
			submit(){
				let params = {
					token: uni.getStorageSync('token'),
					bank_id: this.recinfo.id,
					money: this.withdraw_num,
					mobile_code: this.code
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.withdrawals(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						setTimeout(()=>{
							uni.navigateTo({
								url: '/pages/person/withdraw_apply'
							})
						},1500)
					}else{
						this.$api.msg(data.data.msg);
					}
				})
			},
			getcode(){
				this.$Debounce.canDoFunction({
				    key: "getcode",
				    time: 1500,
				    success:()=>{
						let that = this;
						if(that.second>0){
							return;
						}
						that.$http.sendValidateCode({
							mobile: that.till.mobile,
							scene: 7
						}).then((data)=>{
							// that.$api.msg(data.data.msg);
							if(data.data.status == 1){
								that.code = data.data.msg;
								that.second = 60;
								timer = setInterval(function(){
									that.second--;
									if(that.second==0){
										clearInterval(timer)
									}
								},1000)
							}
						})
				    }
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.withdraw{
		background: #eee;
	}
	.recharge_box{
		padding: 100rpx 100rpx 0;
		box-sizing: border-box;
		.till_phone{
			color: #333;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		input{
			display: block;
			width: 100%;
			height: 88rpx;
			background: #fff;
			border: 1px solid #ccc;
			padding: 0 10rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
		.till{
			color: #999;
			font-size: 26rpx;
			text-align: center;
			text{
				color: #f00;
				margin: 0 10rpx;
			}
		}
		button{
			color: #fff;
			font-size: 32rpx;
			background-color: #f60;
			display: block;
			margin: 0 auto;
			width: 280rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 100rpx;
			&:after{
				border: 0;
			}
		}
	}
	
	.order_address{
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		&:active{
			background: #fafafa url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		}
		.oa_left{
			width: 90%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.no_title{
				font-size: 32rpx;
			}
			.oa_default{
				width: 120rpx;
				.default{
					font-size: 22rpx;
					background-color: #fff;
					color: #ff2a3a;
					border: 1px solid #ff2a3a;
					padding: 5rpx 15rpx 5rpx;
					border-radius: 5rpx;
				}
			}
			.oa_title_box{
				.oa_title{
					color: #999;
					font-size: 28rpx;
					margin-bottom: 5rpx;
					text{
						margin-left: 15rpx;
					}
				}
			}
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
	}
	
	.auth_ipt_box{
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		.ipt_box{
			width: 60%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			box-sizing: border-box;
			border-radius: 10rpx;
		}
		.yzm{
			width: 35%;
			height: 90rpx;
			color: #fff;
			font-size: 32rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fa6570;
			border-radius: 10rpx;
			&.yzms{
				background: #e6e6e6;
			}
		}
	}
</style>

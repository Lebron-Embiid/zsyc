<template>
	<view class="auth">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="验证身份"></uni-nav-bar>
		<view class="auth_box">
			<view class="auth_title">请输入<text>{{phone_show}}</text>收到的短信验证码</view>
			<view class="auth_ipt_box">
				<view class="ipt_box">
					<input type="text" placeholder="短信验证码" v-model="code" />
				</view>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<button v-if="code!=''" class="submit_btn red" @tap="next">下一步</button>
			<button v-else class="submit_btn">下一步</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	var timer;
	export default{
		data(){
			return{
				phone: '18666666666',
				phone_show: '',
				code:'',
				second: 0,
				is_type: 0
			}
		},
		computed: {
			yanzhengma(){
				if(this.second==0){
					return '获取验证码';
				}else{
					return this.second+'秒后重新获取';
				}
			}
		},
		onLoad(opt) {
			if(opt.type != undefined){
				this.is_type = opt.type;
			}
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.phone = data.data.result.mobile;
				let tel = ""+data.data.result.mobile;
				let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
				this.phone_show = tel1;
			})
		},
		components:{
			uniNavBar
		},
		methods:{
			next(){
				let params = {
					token: uni.getStorageSync('token'),
					code: this.code
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.userAuth(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						if(this.is_type == 0){
							uni.redirectTo({
								url: '/pages/person/bind_phone'
							})
						}else if(this.is_type == 1){
							uni.redirectTo({
								url: '/pages/person/changePassword?type=login'
							})
						}else{
							uni.redirectTo({
								url: '/pages/person/changePassword?type=pay'
							})
						}
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
						if(that.phone == ''){
							that.$api.msg('请输入手机号码');
							return;
						}
						that.$http.sendValidateCode({
							mobile: that.phone,
							scene: 9
						}).then((data)=>{
							if(data.data.status == 1){
								if(data.data.is_test == 1){
									that.code = data.data.msg;
								}
								that.$api.msg('验证码已发送');
								that.second = 60;
								timer = setInterval(function(){
									that.second--;
									if(that.second==0){
										clearInterval(timer)
									}
								},1000)
							}else{
								that.$api.msg(data.data.msg);
							}
						})
				    }
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.auth{
		background: #eee;
	}
	.auth_box{
		padding: 30rpx;
		box-sizing: border-box;
		.auth_title{
			color: #333;
			font-size: 32rpx;
			margin-bottom: 20rpx;
			text{
				font-size: 36rpx;
				margin-right: 5rpx;
			}
		}
		.auth_ipt_box{
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			.ipt_box{
				background: #fff;
				width: 60%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 20rpx;
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
	}
	.submit_btn{
		color: #bbb;
		font-size: 36rpx;
		width: 100%;
		background: #e6e6e6;
		margin: 50rpx 0 0;
		border-radius: 10rpx;
		&.red{
			background: #fa6570;
			color: #fff;
		}
	}
</style>
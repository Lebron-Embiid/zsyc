<template>
	<view class="bind_phone">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="绑定新手机"></uni-nav-bar>
		<view class="auth_box">
			<view class="phone_box">
				<input type="text" placeholder="请输入手机号" v-model="phone" />
			</view>
			<view class="auth_ipt_box">
				<view class="ipt_box">
					<input type="text" placeholder="短信验证码" v-model="code" />
				</view>
				<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
			</view>
			<button v-if="phone!='' && code!=''" class="submit_btn red" @tap="submit">确定</button>
			<button v-else class="submit_btn">确定</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	var timer;
	export default{
		data(){
			return{
				phone: '',
				code:'',
				second: 0,
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
		components:{
			uniNavBar
		},
		methods:{
			submit(){
				let params = {
					token: uni.getStorageSync('token'),
					mobile: this.phone,
					code: this.code
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.bindMobile(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						this.phone = '';
						this.code = '';
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
						if(that.phone == ''){
							that.$api.msg('请输入手机号码');
							return;
						}
						that.$http.sendValidateCode({
							mobile: that.phone,
							scene: 2
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
	.bind_phone{
		background: #eee;
	}
	.phone_box{
		background: #fff;
		height: 90rpx;
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
		padding-left: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
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
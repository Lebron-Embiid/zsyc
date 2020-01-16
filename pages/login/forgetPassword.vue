<template>
	<view class="forgetPassword">
		<uni-nav-bar left-icon="back" title="重置密码" backgroundColor="#ffb84d"></uni-nav-bar>
		<view class="white_logo_box">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="forget_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon no"><image src="/static/icon/phone.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
							<input type="text" placeholder="输入手机号码" v-model="phone" />
							<!-- <image :class="[phone!=''?'active':'']" @tap="clearPhone" src="/static/clear.svg" mode="widthFix"></image> -->
						</view>
					</view>
				</view>
				<!-- <view class="form_item">
					<view class="icon no"><image src="/static/icon/email.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="注册邮箱地址" v-model="email" />
						</view>
					</view>
				</view> -->
				<view class="form_item">
					<view class="icon"><image src="/static/icon/vcode.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
							<input type="text" placeholder="输入验证码" v-model="code" />
						</view>
						<view class="yzm" :class="{ yzms: second>0 }" @tap="getcode">{{yanzhengma}}</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/icon/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="请输入新的登录密码" v-if="input_type == 0" v-model="password" />
							<input type="text" placeholder="请输入新的登录密码" v-else v-model="password" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange"></switchc>
					</view>
				</view>
				<button class="submit_btn" form-type="submit">确认</button>
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	var timer;
	export default{
		data(){
			return{
				logoSrc: '',
				app_name: '',
				phone: '',
				email: '',
				code:'',
				password: '',
				input_type: '',
				second: 0
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		computed:{
			yanzhengma(){
				if(this.second==0){
					return '发送验证码';
				}else{
					return this.second+'秒';
				}
			}
		},
		onShow(){
			this.logoSrc = getApp().globalData.app_logo;			
		},
		methods:{
			switchchange(e) {
				console.log(e);
				if(e.value == true){
					this.input_type = 1;
				}else{
					this.input_type = 0;
				}
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
						let params = {
							mobile: that.phone,
							scene: 2
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						that.$http.sendValidateCode(params).then((data)=>{
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
			},
			loginSubmit(){
				if(this.phone == ''){
					this.$api.msg('请输入手机号码');	
					return;
				}
				this.$Debounce.canDoFunction({
					key: "forget",
					time: 1500,
					success:()=>{
						let params = {
							mobile: this.phone,
							password: this.password,
							check_code: this.code
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.forgetPassword(params).then((data)=>{
							this.$api.msg(data.data.msg);
							if(data.data.status == 1){
								setTimeout(function(){
									uni.navigateBack({
										delta: 1
									})
								},1500)
							}
						})
					}
				})
				
				// if(that.phone == ''){
				// 	that.$api.msg("请先填写手机号码");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(that.phone))){
				// 	that.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(that.phone){
				// 	that.$api.msg("该手机号未注册");
				// 	return;
				// }
				// if(this.email == ''){
				// 	this.$api.msg("短信验证码不正确");
				// 	return;
				// }
				// if(!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))){
				// 	this.$api.msg("邮箱格式不正确");
				// 	return;
				// }
				// if(this.password.length < 6 || this.password.length > 20){
				// 	this.$api.msg("密码长度需为6-20位");
				// 	return;
				// }
				// this.$api.msg("密码重置成功",1500,false,'success');
				// setTimeout(function(){
				// 	uni.redirectTo({
				// 		url: '/pages/login/login'
				// 	})
				// },1500)
			}
		}
	}
</script>

<style scoped lang="scss">
	.form_item .right_box .ipt_box{
		width: 65%;
	}
	.forget_box{
		padding: 0 80rpx 20rpx;
		box-sizing: border-box;
		.submit_btn{
			margin-top: 60rpx;
		}
		.yzm{
			color: #999;
			font-size: 24rpx;
		}
	}
</style>

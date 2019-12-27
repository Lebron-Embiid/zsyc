<template>
	<view class="register">
		<uni-nav-bar left-icon="back" backgroundColor="#ffb84d"></uni-nav-bar>
		<view class="white_logo_box">
			<image :src="logoSrc" mode="widthFix"></image>
		</view>
		<view class="register_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon no"><image src="/static/icon/phone.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box internation">
							<!-- <input type="text" class="inter_ipt" placeholder="国际号" disabled v-model="internation_number"> -->
							<!-- <picker @change="bindPickerChange" :range="country" :value="index" class="inter_ipt"> -->
								<!-- <text>{{internation_number}}</text> -->
								<!-- <input type="text" placeholder="区号" disabled v-model="areaCode[index]">
							</picker> -->
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
							<input type="password" placeholder="设置登录密码" v-if="input_type1 == 0" v-model="password" />
							<input type="text" placeholder="设置登录密码" v-else v-model="password" />
							<!-- <image :class="[password!=''?'active':'']" @tap="clearPwd" src="/static/clear.svg" mode="widthFix"></image> -->
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
					</view>
				</view>
				<!-- <view class="form_item">
					<view class="icon"><image src="/static/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="设置交易密码" v-if="input_type2 == 0" v-model="trade_pwd" />
							<input type="text" placeholder="设置交易密码" v-else v-model="trade_pwd" />
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="1" @change="switchchange1"></switchc>
					</view>
				</view> -->
				<view class="form_item">
					<view class="icon no"><image src="/static/icon/invite.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入邀请码" v-model="invite_code" />
						</view>
						<!-- #ifndef H5 -->
						<image src="/static/scan1.svg" @tap="scanInvite" mode="widthFix"></image>
						<!-- #endif -->
					</view>
				</view>
				<!-- <view class="form_item">
					<view class="icon no"><image src="/static/email.png" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入邮箱地址" v-model="email" />
						</view>
					</view>
				</view> -->
				<view class="form_item nopad">
					<view class="right_box">
						<view class="ipt_box">
							<input type="text" placeholder="请输入验证码" v-model="v_code" />
						</view>
						<valid-code :value.sync="validCode" @update:value="getCode"></valid-code>
					</view>
				</view>
				<view class="agree_txt">
					<view v-if="is_agree == false" @tap="changeAgree"><image src="/static/icon/radio.svg" mode="widthFix"></image></view>
					<view v-else @tap="changeAgree"><image src="/static/icon/radio_on.svg" mode="widthFix"></image></view>
					已阅读并同意《<text>用户服务协议</text>》
					<!-- <checkbox-group @change="changeAgree">
						<label class="checkbox" v-for="item in items" :key="item.value">
							<checkbox color="#fff" :value="item.value" :checked="item.checked" />
							
						</label>
					</checkbox-group> -->
				</view>
				<button class="submit_btn" form-type="submit">确认</button>
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	import validCode from '@/components/validCode.vue'
	import util from '@/common/util.js'
	var timer;
	export default {
	    data(){
			return{
				logoSrc: '',
				app_name: '',
				internation_number: '',
				phone: '',
				password: '',
				trade_pwd: '',
				input_type1: '',
				input_type2: '',
				invite_code: '',
				email: '',
				country: [],
				areaCode: [],
				v_code: '',
				validCode: '',
				index: null,
				items: [{
					value: '0',
					checked: false
				}],
				is_agree: false,
				code:'',
				second: 0
			}
		},
		components: {
			uniNavBar,
			switchc,
			validCode
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
		onLoad(opt) {
			console.log(opt);
			// #ifdef H5
			setTimeout(()=>{
			uni.$emit('update',{msg:'页面更新'});
			},1000)
			uni.$on('update',function(data){
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			})
			// #endif
		},
		onShow() {
			this.logoSrc = getApp().globalData.app_logo;
		},
		methods:{
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
							scene: 1
						}).then((data)=>{
							console.log(data);
							that.$api.msg(data.data.msg);
							if(data.data.status == 1){
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
			},
			scanInvite(){
				let that = this;
				// #ifndef H5
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						that.invite_code = res.result;
				    }
				})
				// #endif
			},
			getCode(value){
			  // console.log(value);
			  this.validCode = value.toLowerCase();
			},
			bindPickerChange(e) {
				this.index = e.target.value;
				this.internation_number = this.areaCode[e.detail.value];
			},
			switchchange(e) {
				// console.log(e);
				if(e.value == true){
					this.input_type1 = 1;
				}else{
					this.input_type1 = 0;
				}
			},
			switchchange1(e) {
				// console.log(e);
				if(e.value == true){
					this.input_type2 = 1;
				}else{
					this.input_type2 = 0;
				}
			},
			changeAgree(e){
				if(this.is_agree == false){
					this.is_agree = true;
				}else{
					this.is_agree = false;
				}
			},
			loginSubmit(e){
				// console.log(util.phoneList);
				this.$Debounce.canDoFunction({
					key: "register",
					time: 1500,
					success:()=>{
						if(this.is_agree == false){
							this.$api.msg("请阅读并同意用户协议");
							return;
						}
						if(this.v_code == ''){
							this.$api.msg('请输入验证码');
							return;
						}
						if(this.v_code.toLowerCase() != this.validCode){
							this.$api.msg('请输入正确的验证码');
							return;
						}
						
						this.$http.userRegister({
							username: this.phone,
							password: this.password,
							code: this.code,
							reg_code: this.invite_code
						}).then((data)=>{
							this.$api.msg(data.data.msg);
							if(data.data.status == 1){
								setTimeout(function(){
									uni.redirectTo({
										url: '/pages/login/login'
									})
								},1500)
							}
						}).catch((err)=>{
							// console.log('request fail', err);
							// this.$api.msg(err);
						})
					}
				})
						
				// if(this.internation_number == ''){
				// 	this.$api.msg('请输入区号');
				// 	return;
				// }
				// if(this.phone == ''){
				// 	this.$api.msg("请输入手机号码");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				// 	this.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(this.password.length < 6 || this.password.length > 20){
				// 	this.$api.msg("密码长度需为6-20位");
				// 	return;
				// }
				// if(this.trade_pwd == ''){
				// 	this.$api.msg("请输入交易密码");
				// 	return;
				// }
				// if(this.invite_code == ''){
				// 	this.$api.msg("请输入邀请码");
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
				// this.$api.msg("注册成功",1500,false,'success');
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
	.white_logo_box{
		padding: 0 30rpx 0;
	}
	.form_item{
		&.nopad{
			padding: 10rpx 0;
		}
		.right_box{
			.ipt_box{
				&.internation{
					.inter_ipt{
						width: 25%;
						padding-right: 10rpx;
						box-sizing: border-box;
						display: inline-block;
						position: relative;
						margin-right: 20rpx;
						&:after{
							content: "";
							display: block;
							width: 1px;
							height: 20rpx;
							background: #999;
							position: absolute;
							right: 0;
							top: 50%;
							transform: translateY(-50%);
						}
					}
				}
			}
			image{
				display: block;
				width: 40rpx;
				height: 40rpx !important;
				margin-right: 10rpx;
			}
		}
	}
	.register_box{
		padding: 0 80rpx 50rpx;
		box-sizing: border-box;
		.agree_txt{
			color: #999;
			font-size: 26rpx;
			margin: 30rpx 0 50rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 35rpx;
				height: 35rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			text{
				color: $free-orange-text;
			}
		}
	}
	.submit_btn{
		margin-bottom: 0;
	}
	
	.right_box{
		.yzm{
			width: 180rpx;
			color: #999;
			font-size: 24rpx;
		}
	}
</style>

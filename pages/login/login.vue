<template>
	<view class="login">
		<view class="login_top">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{app_name}}</text>
		</view>
		<view class="login_box">
			<form @submit="loginSubmit">
				<view class="form_item">
					<view class="icon"><image src="/static/icon/account.svg" mode="widthFix"></image></view>
					<view class="right_box all">
						<view class="ipt_box">
							<input type="text" placeholder="手机号码" v-model="phone" />
							<image :class="[phone!=''?'active':'']" @tap="clearPhone" src="/static/clear.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
				<view class="form_item">
					<view class="icon"><image src="/static/icon/pwd.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<input type="password" placeholder="登录密码" v-if="input_type == 0" v-model="password" />
							<input type="text" placeholder="登录密码" v-else v-model="password" />
							<image :class="[password!=''?'active':'']" @tap="clearPwd" src="/static/clear.svg" mode="widthFix"></image>
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="0" @change="switchchange"></switchc>
					</view>
				</view>
				<view class="forget_txt"><text @tap="toForgetPwd">忘记密码</text></view>
				<button class="submit_btn" form-type="submit">
					<image v-if="is_success == true" src="/static/icon/loading.svg" class="loading" mode="widthFix"></image>登录
				</button>
				<text class="create_btn" @tap="toCreatePage">创建账号</text>
			</form>
		</view>
	</view>
</template>

<script>
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				logoSrc: '',
				app_name: '',
				phone: '15866666666',
				password: '999999',
				input_type: '',
				is_success: false
			}
		},
		components: {
			switchc
		},
		onShow() {
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
			clearPhone(){
				this.phone = '';
			},
			clearPwd(){
				this.password = '';
			},
			toCreatePage(){
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			toForgetPwd(){
				uni.navigateTo({
					url: '/pages/login/forgetPassword'
				})
			},
			loginSubmit(){
				this.$Debounce.canDoFunction({
				    key:"login",//基于此值判断是否可以操作，如两个方法传入了同样的key，则会混淆，建议传入调用此事件的方法名，简单好梳理
				    time:1500,//如果传入time字段，则为定时器后，自动解除锁定状态，单位（毫秒）
				    success:()=>{//成功中调用应该操作的方法，被锁定状态不会执行此代码块内的方法
						console.log(getApp().globalData.is_login);
						this.$http.userLogin({
							username: this.phone,
							password: this.password
						}).then((data)=>{
							// console.log(data.data);
							this.$api.msg(data.data.msg);
							if(data.data.status == 1){
								this.is_success = true;
								getApp().globalData.is_login = true;
								uni.setStorageSync('token',data.data.result.token);
								
								// this.$http.getHeadImg().then((data)=>{
								// 	getApp().globalData.avatar = data.data.img_url;
								// 	if(data.data.img_url == 'toux-icon.png'){
								// 		getApp().globalData.avatar = this.$http.url+'Public/home/wap/heads/default_avatar.svg';
								// 	}
								// })
								// uni.setStorageSync('sessionkey',data.sessionkey);
								setTimeout(()=>{
									uni.reLaunch({
										url: '/pages/index/shop'
									})
								},1500)
							}
						})
				    }
				})
				
				// if(this.phone == ''){
				// 	this.$api.msg("请输入登录手机号");
				// 	return;
				// }
				// if(!(/^1[3456789]\d{9}$/.test(this.phone))){
				// 	this.$api.msg("手机号码格式不正确");
				// 	return; 
				// }
				// if(this.password == ''){
				// 	this.$api.msg("请输入登录密码");
				// 	return;
				// }
				// if(){
				//	this.$api.msg("账号或密码不正确");
				// 	return;
				// }
				
				// this.$api.msg("登录成功",1500,false,'success');
			}
		}
	}
</script>

<style scoped lang="scss">
	.login_top{
		background: $free-orange-low;
		text-align: center;
		padding: 80rpx 30rpx 50rpx;
		box-sizing: border-box;
		image{
			display: block;
			width: 70%;
			// height: 260rpx;
			margin: 0 auto;
		}
		text{
			color: #fff;
			font-weight: 700;
			font-size: 36rpx;
		}
	}
	.login_box{
		padding: 120rpx 80rpx 20rpx;
		box-sizing: border-box;
		.create_btn{
			display: block;
			width: 100%;
			text-align: center;
			color: $free-orange-text;
			font-size: 26rpx;
		}
		.forget_txt{
			text-align: right;
			margin: 15rpx 0 50rpx;
			text{
				color: $free-orange-text;
				font-size: 24rpx;
			}
		}
	}
</style>

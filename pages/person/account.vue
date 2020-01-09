<template>
	<view class="account">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="账户安全"></uni-nav-bar>
		<navigator url="/pages/person/auth?type=0" class="setting_box line">
			<view class="set_left">更改绑定手机</view>
			<view class="set_right">{{phone}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/auth?type=1" class="setting_box line">
			<view class="set_left">登录密码</view>
			<view class="set_right">去设置<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/auth?type=2" class="setting_box line">
			<view class="set_left">支付密码</view>
			<view class="set_right">去设置<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<view class="account_title">绑定第三方账号</view>
		<view class="setting_box line" @tap="toBind">
			<view class="set_left">微信</view>
			<view class="set_right">未绑定<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box line">
			<view class="set_left">QQ</view>
			<view class="set_right">已绑定<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box">
			<view class="set_left">微博</view>
			<view class="set_right">已绑定<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				phone: ''
			}
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				
				let tel = ""+data.data.result.mobile;
				let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
				this.phone = tel1;
			})
		},
		components:{
			uniNavBar
		},
		methods:{
			toBind(){
				uni.navigateTo({
					url: '/pages/person/wechat_login'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.account{
		background: #eee;
	}
	.account_title{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 28rpx;
	}
</style>

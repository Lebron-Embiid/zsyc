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
		<view class="setting_box line" v-for="(item,index) in accountList" :key="index" @tap="toBind(item.name)">
			<view class="set_left">{{item.title}}</view>
			<view class="set_right">{{item.status_name}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<!-- <view class="setting_box line">
			<view class="set_left">QQ</view>
			<view class="set_right">已绑定<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box">
			<view class="set_left">微博</view>
			<view class="set_right">已绑定<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view> -->
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				phone: '',
				accountList: [
					{
						title: '微信',
						name: 'weixin',
						status: 0,
						status_name: '未绑定'
					},{
						title: 'QQ',
						name: 'qq',
						status: 0,
						status_name: '未绑定'
					},{
						title: '微博',
						name: 'sinaweibo',
						status: 0,
						status_name: '未绑定'
					}
				]
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
		onReady() {
			this.initProvider();
		},
		methods:{
			initProvider() {
				const filters = ['weixin', 'qq','sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									
								}
							}
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			toBind(provider){
				uni.login({
					provider: provider,
					success: (loginRes)=>{
						console.log("success: "+JSON.stringify(loginRes));
						//案例直接获取用户信息，一般不是在APP端直接获取用户信息，比如微信，获取一个code，传递给后端，后端再去请求微信服务器获取用户信息
						uni.getUserInfo({
							provider: provider,
							success: (infoRes)=>{
								console.log('用户信息：' + JSON.stringify(infoRes.userInfo));
								uni.setStorage({
									key: 'UserInfo',
									data: {
										username:infoRes.userInfo.nickName,
										face:infoRes.userInfo.avatarUrl
									},
									success: function () {
										this.$api.msg('登录成功');
										// uni.showToast({title: '登录成功',icon:"success"});
										setTimeout(function(){
											uni.navigateBack();
										},300)
									}
								});
							}
						});
					},
					fail:(e)=>{
						this.$api.msg("fail: "+JSON.stringify(e));
						console.log("fail: "+JSON.stringify(e));
					}
				});
				// uni.navigateTo({
				// 	url: '/pages/person/wechat_login'
				// })
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

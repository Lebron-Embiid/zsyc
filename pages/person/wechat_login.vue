<template>
	<view class="wechat_login">
		<image src="/static/logo2.png" mode="widthFix"></image>
		<view class="wechat_box">
			<view class="wb_title">登录或开发者将获得以下权限</view>
			<view class="wb_info">• 获得你的公开信息（昵称、头像、地区及性别）</view>
			<button type="primary" @tap="authLogin('weixin')">确认登录</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			authLogin(provider){
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
										face:infoRes.userInfo.avatarUrl,
										signature:'个性签名',
										integral:0,
										balance:0,
										envelope:0
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.wechat_login{
		padding: 150rpx 30rpx 0;
		box-sizing: border-box;
		image{
			display: block;
			width: 190rpx;
			height: 190rpx;
			margin: 30rpx auto 50rpx;
		}
		.wechat_box{
			padding: 50rpx 30rpx;
			box-sizing: border-box;
			border-top: 1px solid #eee;
			.wb_title{
				color: #333;
				font-size: 32rpx;
				margin-bottom: 30rpx;
			}
			.wb_info{
				color: #999;
				font-size: 28rpx;
				margin-bottom: 100rpx;
			}
			button{
				color: #fff;
				background: #52d490;
				height: 100rpx;
				border-radius: 10rpx;
				&:after{
					border: 0;
				}
			}
		}
	}
</style>

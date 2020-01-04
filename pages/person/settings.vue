<template>
	<view class="settings">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="设置"></uni-nav-bar>
		<navigator url="/pages/person/person_info" class="setting_box avatar_box mb20">
			<view class="set_left"><image src="/static/avatar/avatar.png" mode="widthFix"></image>小靓</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/index/address" class="setting_box mb20">
			<view class="set_left">收货地址</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/account" class="setting_box line">
			<view class="set_left">账户安全</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/feedback" class="setting_box line">
			<view class="set_left">意见反馈</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<view class="setting_box line" @tap="clearStorage">
			<view class="set_left">清除缓存</view>
			<view class="set_right">{{cookie}}M<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box line">
			<view class="set_left">关于我们</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box mb20" @tap="toShare">
			<view class="set_left">分享APP</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<button type="primary" class="logout_btn" @tap="logout">退出登录</button>
		<!-- share弹窗 -->
		<common-share :shareClass="shareClass" @hide="hideShare"></common-share>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import commonShare from "@/components/commonShare.vue"
	export default{
		data(){
			return{
				cookie: '80.18',
				shareClass:''
			}
		},
		components:{
			uniNavBar,
			commonShare
		},
		methods:{
			toShare(){
				this.shareClass = 'show';
			},
			hideShare(){
				this.shareClass = 'hide';
				// setTimeout(() => {
					this.shareClass = 'none';
				// }, 150);
			},
			logout(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success:function(res){
						if(res.confirm){
							that.$api.msg("退出成功");
							uni.removeStorageSync('token');
							// uni.clearStorageSync();
							// uni.removeStorageSync('sessionkey');
							setTimeout(function(){
								uni.reLaunch({
									url: '/pages/login/login'
								})
							},1500)
						}
					}
				})
			},
			clearStorage(){
				let that = this;
				uni.showModal({
					title: '提示',
					content: '确定要清除缓存吗？',
					success:function(res){
						if(res.confirm){
							that.cookie = '0.00';
							// uni.clearStorageSync();
							// uni.removeStorageSync('sessionkey');
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.settings{
		background: #eee;
	}
	.logout_btn{
		border-radius: 0;
		margin: 0;
		padding: 0;
		background: #fff;
		font-size: 32rpx;
		color: #333;
		padding: 10rpx 0;
		&:after{
			border: 0;
		}
	}
</style>

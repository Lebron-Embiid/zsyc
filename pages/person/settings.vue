<template>
	<view class="settings">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="设置"></uni-nav-bar>
		<navigator url="/pages/person/person_info" class="setting_box avatar_box mb20">
			<view class="set_left"><image :src="avatar" mode="widthFix"></image>{{username}}</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/index/address" class="setting_box line">
			<view class="set_left">收货地址</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/payment" class="setting_box line">
			<view class="set_left">收款方式</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<navigator url="/pages/person/cash_list" class="setting_box mb20">
			<view class="set_left">提现账号</view>
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
		<!-- #ifdef APP-PLUS -->
		<view class="setting_box line" @tap="clearStorage">
			<view class="set_left">清除缓存</view>
			<view class="set_right">{{cookie}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<!-- #endif -->
		<navigator url="/pages/person/about_us" class="setting_box line">
			<view class="set_left">关于我们</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
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
				avatar: '',
				username: '',
				cookie: '',
				shareClass:''
			}
		},
		components:{
			uniNavBar,
			commonShare
		},
		onLoad() {
			this.caching();
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				if(data.data.result.head_pic != null){
					this.avatar = this.$http.url+data.data.result.head_pic;
				}else{
					this.avatar = '/static/avatar/avatar.png';
				}
				this.username = data.data.result.nickname;
			})
		},
		methods:{
			caching(){
				// #ifdef APP-PLUS
				let that = this;
				plus.cache.calculate( function ( size ) {
					let fileSizeString = '';
					if (size == 0) {
						fileSizeString = "0B";
					} else if (size < 1024) {
						fileSizeString = size + "B";
					} else if (size < 1048576) {
						fileSizeString = (size / 1024).toFixed(2) + "KB";
					} else if (size < 1073741824) {
						fileSizeString = (size / 1048576).toFixed(2) + "MB";
					} else {
						fileSizeString = (size / 1073741824).toFixed(2) + "GB";
					}
					console.log(fileSizeString);
					
					that.cookie = fileSizeString;
				});
				// #endif
			},
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
							// #ifdef APP-PLUS
							plus.cache.clear(function () {
								that.caching();
							});
							// #endif
							
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

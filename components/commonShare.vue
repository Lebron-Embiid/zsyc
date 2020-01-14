<template>
	<view class="share_box">
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hide">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<!-- <view class="h1">分享</view> -->
				<view class="list">
					<view class="box" @tap="shareWechat">
						<image src="/static/img/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box" @tap="shareSence">
						<image src="/static/img/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box" @tap="shareWeibo">
						<image src="/static/img/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box" @tap="shareQQ">
						<image src="/static/img/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hide">
					取消
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'commonShare',
		data(){
			return{
				
			}
		},
		props:{
			shareClass: {
				type: String,
				default: ''
			}
		},
		methods:{
			hide(e){
				this.$emit('hide',e);
			},
			shareWechat(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareSence(){
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareWeibo(){
				uni.share({
					provider: "sinaweibo",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			shareQQ(){
				uni.share({
					provider: "qq",
					type: 0,
					href: "http://uniapp.dcloud.io/",
					title: "uni-app分享",
					imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			discard(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}
	.share{
		display: none;
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.15s linear both;
			}
			.layer {
				animation: showLayer 0.15s linear both;
			}
		}
		&.hide {
			display: block;
			.mask{
				animation: hidePopup 0.15s linear both;
			}
			
			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			background-color: rgba(0,0,0,.5);
			position: fixed;
			width: 100%;
			height: 100%;
			top:0;
			z-index: 11;
		}
		.layer{
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255,255,255,0.9);
			.list{
				width: 100%;
				display: flex;
				padding:10rpx 0 30rpx 0;
				.box{
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					image{
						width: 13.8vw;
						height: 13.8vw;
					}
					.title{
						margin-top: 10rpx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 28rpx;
					}
				}
			}
			.btn{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #0084ff;
				font-size: 40rpx;
				border-top: solid 1rpx #666666;
			}
			.h1{
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34rpx;
			}
		}
	}
</style>

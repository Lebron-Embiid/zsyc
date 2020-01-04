<template>
	<view class="recommendMember">
		<uni-nav-bar left-icon="back" title="推荐会员"></uni-nav-bar>
		<view class="member_bg">
			<image src="/static/img/member_bg.png" mode="widthFix"></image>
		</view>
		<view class="recommend_box">
			<text class="collect_txt">推荐人邀请码：{{link}}</text>
			<button type="primary" @tap="copyLink">复制推荐地址</button>
			<image :src="code_img" mode="widthFix"></image>
			<button type="primary" class="save_btn" @tap="savaCode">保存二维码</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import downloader from '@/js_sdk/img-downloader/img-downloader.js'
	export default{
		data(){
			return{
				name: '',
				avatar: '',
				link: '',
				code_img: '',
				is_app: 0
			}
		},
		components:{
			uniNavBar
		},
		onLoad() {
			this.$http.shareCode().then((data)=>{
				this.code_img = this.$http.url+data.data.img_url;
				this.link = data.data.code;
			})
		},
		onShow(){
			this.$http.getUserInfo().then((data)=>{
				this.name = data.data.username;
				if(data.data.username == ''){
					this.name = data.data.mobile;
				}
			})
		},
		onUnload() {
			uni.hideLoading();
		},
		methods:{
			changeCode(){
				if(this.is_app == 0){
					this.is_app = 1;
					this.$http.regCode().then((data)=>{
						this.code_img = this.$http.url+data.data.img_url;
					})
				}else{
					this.is_app = 0;
					this.$http.shareCode().then((data)=>{
						this.code_img = this.$http.url+data.data.img_url;
					})
				}
			},
			copyLink(){
				let that = this;
				// #ifndef H5
				uni.setClipboardData({
				    data: that.link,
				    success: function () {
				        console.log('success');
						that.$api.msg('复制成功，快去粘贴吧！');
				    }
				});
				uni.getClipboardData({
				    success: function (res) {
				        console.log(res.data);
				    }
				});
				// #endif
				// #ifdef H5
				uni.setClipboardData({ data:that.link, success:function(data){
						that.$api.msg('复制成功，快去粘贴吧！');
					}
				})
				// #endif
			},
			savaCode(){
				let that = this;
				// #ifndef H5
				uni.showLoading({
					title: '保存中'
				})
				uni.saveImageToPhotosAlbum({
					filePath: that.code_img,
					success: function () { 
						uni.hideLoading();
						that.$api.msg('保存成功');
					},
				})
				// #endif
				
				// #ifdef H5
				let promise = downloader.load(that.code_img, 'my_code'); //下载
				
				promise.then(([err, res])=>{
				    console.log(err, res);			// err 和 res 只会有一个存在，另一个为null
					if(res.statusCode == 200){
						// that.$api.msg('保存成功');
					}
				});
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.member_bg{
		image{
			display: block;
			width: 100%;
		}
	}
	.recommend_box{
		padding: 40rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 28rpx;
		text-align: center;
		.collect_txt{
			color: #c00;
		}
		.change_btn{
			color: #00BFFF;
			font-size: 28rpx;
			margin-top: 30rpx;
		}
		button{
			width: 80%;
			height: 68rpx;
			line-height: 68rpx;
			font-size: 26rpx;
			background: #f60;
			border-radius: 10rpx;
			margin: 20rpx auto 30rpx;
			color: #fff;
			transition: all .5s ease;
			&:after{
				border: 0;
			}
			&.save_btn{
				background: #c00;
				margin-top: 50rpx;
			}
		}
		image{
			display: block;
			width: 392rpx;
			height: 392rpx;
			margin: 0 auto 20rpx;
		}
	}
</style>

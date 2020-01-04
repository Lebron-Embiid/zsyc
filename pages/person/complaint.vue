<template>
	<view class="application">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要申诉（卖家）" rightText="提交" @clickRight="submit"></uni-nav-bar>
		<view v-if="is_submit == 0">
			<picker :range="feedback_arr" @change="selectFeedback">
				<view class="feedback_item">
					{{feed_type}}
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</picker>
			<view class="feedback_item">
				<input type="text" v-model="phone" placeholder="请填写手机号，方便我们联系你" />
			</view>
			<view class="feedback_item">
				<textarea v-model="feed_content" @input="valNum" maxlength="200" placeholder="请如实填写申诉内容" />
				<text class="len">{{length}}/200</text>
			</view>
			<view class="upload_title">上传图片（最多4张）</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto(index)" v-for="(item,index) in photoList" :key="index">
					<image @tap="previewImage(index)" class="img" :src="item" mode="widthFix"></image>
					<!-- <image class="del_icon" @tap.stop="deletePhoto(index)" src="/static/icon/close.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
		<view v-else class="success_box">
			<image src="/static/icon/ok1.png" mode="widthFix"></image>
			<view>您的申诉已提交成功</view>
			<view>我们会在24小时内给您答复</view>
			<view>请耐心等候</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				feed_type: '请选择反馈类型',
				phone: '',
				feed_content: '',
				feedback_arr: ['买家申诉不实','少付金额','没收到金额'],
				length: 0,
				photoList: [],
				is_submit: 0
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			selectFeedback(e){
				this.feed_type = this.feedback_arr[e.detail.value];
			},
			valNum(e){
				this.length = e.detail.value.length;
			},
			choosePhoto(){
				let that = this;
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						for(let i in res.tempFilePaths){
							// console.log(res.tempFilePaths[0]);
							// that.photoList.push(res.tempFilePaths[0]);
							
							let params = {
								'token': uni.getStorageSync('token'),
								'path': 'comment'
							};
							let sign = that.$sign.getSign(params,that.AppSecret);
							params.sign = sign;
							
							uni.uploadFile({
								url: that.$http.url+'Api/User/uploadFiles', //图片接口
								filePath: res.tempFilePaths[i],
								name: 'file',
								header:{
									'timestamp': new Date().getTime()
								},
								formData: params,
								success: (uploadFileRes) => {
									var data = JSON.parse(uploadFileRes.data);
									if(data.status == 1){
										if(that.photoList.length >= 4){
											uni.showToast({
												title: "最多发布4张图片",
												icon: 'none'
											})
											return;
										}
										var url = that.$http.url + data.result;
										that.photoList.push(url);
									}else{
										that.$api.msg(data.msg);
									}
								}
							})
						}
					}
				})
			},
			previewImage(e){
				let that = this;
				uni.previewImage({
					current: that.photoList[e],
					urls: that.photoList
				})
			},
			deletePhoto(e){
				let that = this;
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							that.photoList.splice(e, 1);
						}
					}
				})
			},
			submit(){
				this.is_submit = 1;
			}
		}
	}
</script>

<style scoped lang="scss">
	.application{
		background: #eee;
	}
	.success_box{
		background: #eee;
		color: #333;
		font-size: 32rpx;
		padding: 80rpx 30rpx 0;
		box-sizing: border-box;
		text-align: center;
		image{
			display: block;
			width: 90rpx;
			height: 90rpx;
			margin: 0 auto 30rpx;
		}
		view{
			margin-bottom: 10rpx;
		}
	}
	.upload_title{
		color: #999;
		font-size: 28rpx;
		margin: 20rpx 0;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.upload_img_box{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.feedback_item{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 32rpx;
		position: relative;
		&:first-child{
			padding-right: 40rpx;
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
			transform: rotate(90deg);
		}
		input{
			display: block;
			width: 100%;
			font-size: 32rpx;
		}
		textarea{
			font-size: 32rpx;
			background: #fafafa;
			display: block;
			width: 100%;
			padding: 10rpx;
			box-sizing: border-box;
		}
		.len{
			position: absolute;
			color: #333;
			font-size: 28rpx;
			right: 40rpx;
			bottom: 40rpx;
		}
	}
</style>

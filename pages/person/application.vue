<template>
	<view class="application">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="提交申请"></uni-nav-bar>
		<view v-if="is_submit == 0">
			<picker :range="feedback_arr" range-key="level_name" @change="selectFeedback">
				<view class="feedback_item">
					{{feed_type}}
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</picker>
			<view class="feedback_item">
				<input type="text" v-model="phone" placeholder="请填写手机号，方便我们联系你" />
			</view>
			<view class="feedback_item">
				<textarea v-model="feed_content" @input="valNum" maxlength="200" placeholder="请填写说明，200字以内" />
				<text class="len">{{length}}/200</text>
			</view>
			<view class="upload_title">上传资料图片</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto" v-if="photo1 == ''">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto" @tap="choosePhoto" v-else>
					<image class="img" :src="photo1" mode="widthFix"></image>
				</view>
			</view>
			<button type="primary" size="mini" class="application_btn" @tap="submit">提 交</button>
		</view>
		<view v-else class="success_box">
			<image src="/static/icon/ok.png" mode="widthFix"></image>
			<view>您的会员升级已提交成功</view>
			<view>感谢您的支持，请等待后台审核</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				level_id: '',
				feed_type: '请选择会员级别',
				phone: '',
				feed_content: '',
				feedback_arr: [],
				length: 0,
				photo: '',
				photo1: '',
				is_submit: 0
			}
		},
		components:{
			uniNavBar
		},
		onLoad() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.vipLevel(params).then((data)=>{
				this.feedback_arr = data.data.result;
				console.log(this.feedback_arr);
			})
		},
		methods:{
			selectFeedback(e){
				this.feed_type = this.feedback_arr[e.detail.value].level_name;
				this.level_id = this.feedback_arr[e.detail.value].level_id;
			},
			valNum(e){
				this.length = e.detail.value.length;
			},
			choosePhoto(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						let params = {
							'token': uni.getStorageSync('token'),
							'path': 'level'
						};
						let sign = that.$sign.getSign(params,that.AppSecret);
						params.sign = sign;
						
						uni.uploadFile({
							url: that.$http.url+'Api/User/uploadFiles', //图片接口
							filePath: res.tempFilePaths[0],
							name: 'file',
							header:{
								'timestamp': new Date().getTime()
							},
							formData: params,
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								if(data.status == 1){
									var url = data.result;
									var url1 = that.$http.url + data.result;
									that.photo = url;
									that.photo1 = url1;
								}else{
									that.$api.msg(data.msg);
								}
							}
						})
					}
				})
			},
			deletePhoto(e){
				let that = this;
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							that.photo1 = '';
							that.photo = '';
						}
					}
				})
			},
			submit(){
				let params = {
					token: uni.getStorageSync('token'),
					level_id: this.level_id,
					mobile: this.phone,
					memo: this.feed_content,
					pic: this.photo
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.applyLevel(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						setTimeout(()=>{
							this.is_submit = 1;
						},1500)
					}else{
						this.$api.msg(data.data.msg);
					}
				})
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
	.application_btn{
		display: block;
		width: 40%;
		height: 100rpx;
		line-height: 100rpx;
		background: #f60;
		border-radius: 0;
		color: #fff;
		font-size: 32rpx;
		margin-top: 50rpx;
		font-weight: bold;
		&:after{
			border: 0;
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

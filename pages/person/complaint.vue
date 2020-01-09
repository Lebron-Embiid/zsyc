<template>
	<view class="complaint">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要申诉" :rightText="right_txt" @clickRight="submit"></uni-nav-bar>
		<view v-if="is_submit == 0">
			<picker :range="complaint_arr" @change="selectComplaintback">
				<view class="feedback_item">
					{{complaint_type}}
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</picker>
			<view class="feedback_item">
				<input type="text" v-model="phone" placeholder="请填写手机号，方便我们联系你" />
			</view>
			<view class="feedback_item">
				<textarea v-model="complaint_content" @input="valNum" maxlength="200" placeholder="请如实填写申诉内容" />
				<text class="len">{{length}}/200</text>
			</view>
			<view class="upload_title">上传图片（最多4张）</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto(index)" v-for="(item,index) in photoList1" :key="index">
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
				order_id: '',
				right_txt: '提交',
				type: 0,	//0: 买家   1: 卖家
				complaint_type: '请选择反馈类型',
				complaint_current: '',
				phone: '',
				complaint_content: '',
				complaint_arr: [],
				length: 0,
				photoList: [],
				photoList1: [],
				is_submit: 0
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.order_id = opt.id;
			}
			if(opt.type != undefined){
				this.type = opt.type;
			}
			console.log(opt);
		},
		onShow(){
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			if(this.type == 0){
				// 买家申诉
				this.$http.buyApplyType(params).then((data)=>{
					this.complaint_arr = data.data.result;
				})
			}else{
				// 卖家申诉
				this.$http.sellApplyType(params).then((data)=>{
					this.complaint_arr = data.data.result;
				})
			}
		},
		methods:{
			selectComplaintback(e){
				this.complaint_current = e.detail.value;
				this.complaint_type = this.complaint_arr[e.detail.value];
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
								'path': 'appeal'
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
										var url = data.result;
										var url1 = that.$http.url + data.result;
										that.photoList.push(url);
										that.photoList1.push(url1);
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
					current: that.photoList1[e],
					urls: that.photoList1
				})
			},
			deletePhoto(e){
				let that = this;
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							that.photoList1.splice(e, 1);
							that.photoList.splice(e, 1);
						}
					}
				})
			},
			submit(){
				let photoArr = {};
				for(let i in this.photoList){
					photoArr[i] = this.photoList[i];
				}
				console.log(photoArr);
				if(this.complaint_current == ''){
					this.$api.msg('请选择反馈类型');
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					order_id: this.order_id,
					type: this.complaint_current,
					message: this.complaint_content,
					pic: JSON.stringify(photoArr)
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.appeal(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						this.complaint_type = '请选择反馈类型';
						this.complaint_current = '';
						this.phone = '';
						this.complaint_content = '';
						this.photoList = [];
						this.photoList1 = [];
						this.right_txt = '';
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
	.complaint{
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

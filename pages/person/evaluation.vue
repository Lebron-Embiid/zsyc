<template>
	<view class="evaluation">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="用户评价"></uni-nav-bar>
		<view class="evaluation_box">
			<view class="eval_goods">
				<image src="/static/img/order_img1.png" mode="widthFix"></image>
				<view class="eval_right">
					<view class="eval_title">普罗旺斯桃红葡萄酒</view>
					<view class="eval_info">普罗旺斯产区 优雅精致</view>
				</view>
			</view>
			<view class="rate_box">
				<view>评分</view>
				<uni-rate size="23" value="0" color="#ccc" margin="5" activeColor="#ff2a3a" @change="changeRate"></uni-rate>
				<text>{{rate_txt}}</text>
			</view>
			<view class="textarea_box">
				<textarea v-model="message" @input="changeNum" placeholder="填写高质量的评价，可参与抽奖机会" maxlength="45" />
				<text>{{num}}/45</text>
			</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto">
					<image src="/static/icon/add.png" mode="widthFix"></image>
					<view>上传图片</view>
				</view>
				<view class="upload_img_item" @tap="previewImage(index)" v-for="(item,index) in photoList" :key="index">
					<image class="img" :src="item" mode="widthFix"></image>
					<image class="del_icon" @tap.stop="deletePhoto(index)" src="/static/icon/close.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<button type="primary" class="fixed_bottom_btn">提交</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default{
		data(){
			return{
				rate_txt: '',
				message: '',
				num: 0,
				photoList: []
			}
		},
		components:{
			uniNavBar,
			uniRate
		},
		methods:{
			changeRate(e){
				console.log(e.value);
				if(e.value == 1){
					this.rate_txt = '非常差';
				}else if(e.value == 2){
					this.rate_txt = '差';
				}else if(e.value == 3){
					this.rate_txt = '一般';
				}else if(e.value == 4){
					this.rate_txt = '满意';
				}else {
					this.rate_txt = '非常满意';
				}
			},
			changeNum(e){
				this.num = e.detail.value.length;
			},
			choosePhoto(){
				let that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// for(let i in res.tempFilePaths){
							console.log(res.tempFilePaths[0]);
							that.photoList.push(res.tempFilePaths[0]);
							
							// uni.uploadFile({
							// 	url: that.$http.url+'Recharge/uploadFiles', //图片接口
							// 	filePath: res.tempFilePaths[i],
							// 	name: 'file',
							// 	header:{
							// 		'AUTHORIZATION': uni.getStorageSync('token')
							// 	},
							// 	success: (uploadFileRes) => {
							// 		var data = JSON.parse(uploadFileRes.data);
							// 		if(data.code == 0){
							// 			if(that.photoList.length >= 9){
							// 				uni.showToast({
							// 					title: "最多发布9张图片",
							// 					icon: 'none'
							// 				})
							// 				return false;
							// 			}
							// 			var url = data.data.url;
							// 			that.photoList.push(url);
							// 		}
							// 	}
							// })
						// }
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.evaluation_box{
		background: #fafafa;
		padding: 30rpx;
		box-sizing: border-box;
		.eval_goods{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 150rpx;
				height: 150rpx;
				margin-right: 20rpx;
			}
			.eval_right{
				width: 75%;
				color: #999;
				font-size: 28rpx;
				.eval_title{
					color: #333;
					font-size: 32rpx;
					margin-bottom: 20rpx;
				}
			}
		}
		.rate_box{
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			font-size: 32rpx;
			.uni-rate{
				margin: 8rpx 20rpx 0 5rpx;
			}
			text{
				color: #999;
			}
		}
		.textarea_box{
			padding: 0;
			border: 1px solid #eee;
		}
		.upload_img_box{
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-wrap: wrap;
			.upload_btn{
				display: flex;
				justify-content: center;
				align-items: center;
				flex-wrap: wrap;
				width: 150rpx;
				height: 150rpx;
				padding: 20rpx 0;
				box-sizing: border-box;
				color: #999;
				font-size: 24rpx;
				border: 1px solid #ccc;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				image{
					display: block;
					width: 52rpx;
					height: 52rpx;
				}
				view{
					width: 100%;
					text-align: center;
				}
			}
			.upload_img_item{
				width: 150rpx;
				height: 150rpx;
				border: 1px solid #ccc;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				margin-bottom: 20rpx;
				position: relative;
				.img{
					display: block;
					max-width: 100%;
					max-height: 100% !important;
				}
				.del_icon{
					position: absolute;
					right: 0;
					top: 0;
					width: 40rpx;
					height: 40rpx;
					background: #f00;
				}
			}
		}
	}
</style>

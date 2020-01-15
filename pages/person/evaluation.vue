<template>
	<view class="evaluation">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="用户评价"></uni-nav-bar>
		<view class="evaluation_box">
			<view class="eval_goods" v-for="(item,index) in goodsInfo" :key="index">
				<image :src="url+item.original_img" mode="widthFix"></image>
				<view class="eval_right">
					<view class="eval_title">{{item.goods_name}}</view>
					<view class="eval_info">{{item.spec_key_name}}</view>
				</view>
			</view>
			<view class="rate_box">
				<view>评分</view>
				<uni-rate size="23" :value="rate_val" color="#ccc" margin="5" activeColor="#ff2a3a" @change="changeRate"></uni-rate>
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
				<view class="upload_img_item" @longtap="deletePhoto(index)" v-for="(item,index) in photoList" :key="index">
					<image @tap="previewImage(index)" class="img" :src="item" mode="widthFix"></image>
					<!-- <image class="del_icon" @tap.stop="deletePhoto(index)" src="/static/icon/close.png" mode="widthFix"></image> -->
				</view>
			</view>
		</view>
		<button type="primary" class="fixed_bottom_btn" @tap="submitEval">提交</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default{
		data(){
			return{
				id: '',
				goodsInfo: {},
				rate_txt: '',
				message: '',
				num: 0,
				rate_val: 0,
				photoList: [],
				photoList1: [],
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniRate
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.id != undefined){
				this.id = opt.id;
			}
			
			let params = {
				token: uni.getStorageSync('token'),
				id: this.id
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getOrderDetail(params).then((data)=>{
				this.goodsInfo = data.data.result.goods_list;
			})
		},
		methods:{
			submitEval(){
				let gids = [];
				// for(let i in this.goodsInfo){
				// 	gids.push(this.goodsInfo[i].goods_id);
				// }
				console.log(gids);
				let params = {
					token: uni.getStorageSync('token'),
					img_file: JSON.stringify(this.photoList1),
					order_id: this.id,
					goods_id: this.goodsInfo[0].goods_id,
					store_packge_hidden: '',
					store_speed_hidden: this.rate_val,
					store_sever_hidden: '',
					anonymous: 0,
					remark: this.message
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.orderCommentAdd(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						this.message = '';
						this.photoList = [];
						this.photoList1 = [];
						// this.rate_val = 0;
						// this.rate_txt = '';
						this.num = 0;
					}else{
						this.$api.msg(data.data.msg);
					}
				})
			},
			changeRate(e){
				console.log(e.value);
				this.rate_val = e.value;
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
					count: 5, //默认9
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
										if(that.photoList.length >= 5){
											uni.showToast({
												title: "最多发布5张图片",
												icon: 'none'
											})
											return;
										}
										var url = that.$http.url + data.result;
										var url1 = data.result;
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
							that.photoList1.splice(e, 1);
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
		padding: 10rpx 30rpx 30rpx;
		box-sizing: border-box;
		.eval_goods{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1px solid #eee;
			&:last-of-type{
				margin-bottom: 0;
			}
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
	}
</style>

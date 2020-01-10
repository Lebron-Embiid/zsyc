<template>
	<view class="payment">
		<uni-nav-bar left-icon="back" title="收款方式" rightText=""></uni-nav-bar>
		<view class="payment_box">
			<view class="pay_title">
				<view><image src="/static/icon/pay_icon1.png" mode="widthFix"></image>添加支付宝收款</view>
				<switchc text="启用|禁用" :value="open" class="switch_btn" :sid="0" @change="switchchange($event,0)"></switchc>
			</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto" v-if="photo1 == ''">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto" @tap="choosePhoto" v-else>
					<image class="img" :src="photo1" mode="widthFix"></image>
				</view>
				<view class="pay_till">（长按收款图片删除）</view>
			</view>
			<view class="pay_title">
				<view><image src="/static/icon/pay_icon2.png" mode="widthFix"></image>添加微信收款</view>
				<switchc text="启用|禁用" :value="open1" class="switch_btn" :sid="1" @change="switchchange1($event,1)"></switchc>
			</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto1" v-if="wx_photo1 == ''">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto1" @tap="choosePhoto1" v-else>
					<image class="img" :src="wx_photo1" mode="widthFix"></image>
				</view>
				<view class="pay_till">（长按收款图片删除）</view>
			</view>
			<button type="primary" @tap="addPayment">确定</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				id: '',
				photo: '',
				photo1: '',
				wx_photo: '',
				wx_photo1: '',
				status: 1, //支付宝状态
				status1: 1 ,//微信状态
				open: true,
				open1: true,
				zfb_pay: {},
				wx_pay: {},
				url: ''
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		onShow() {
			this.url = this.$http.url;
			this.paymentInit();
		},
		methods:{
			paymentInit(){
				let params = {
					token: uni.getStorageSync('token')
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.paymentList(params).then((data)=>{
					for(let i in data.data.result){
						if(data.data.result[i].pay_code == 'alipay'){
							this.zfb_pay = data.data.result[i];
						}else{
							this.wx_pay = data.data.result[i];
						}
					}
					console.log(this.zfb_pay,this.zfb_pay.pic,data.data.result);
					if(this.zfb_pay.pic != undefined){
						this.photo1 = this.url+this.zfb_pay.pic;
						this.photo = this.zfb_pay.pic;
					}else{
						this.photo1 = '';
						this.photo = '';
					}
					if(this.wx_pay.pic != undefined){
						this.wx_photo1 = this.url+this.wx_pay.pic;
						this.wx_photo = this.wx_pay.pic;
					}else{
						this.wx_photo1 = '';
						this.wx_photo = '';
					}
					if(this.zfb_pay.status == 1){
						this.open = true;
					}else{
						this.open = false;
					}
					if(this.wx_pay.status == 1){
						this.open1 = true;
					}else{
						this.open1 = false;
					}
					console.log(this.zfb_pay,this.wx_pay);
				})
			},
			addPayment(){
				if(this.photo != ''){
					let params = {
						token: uni.getStorageSync('token'),
						pic: this.photo,
						pay_code: 'alipay'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.addPayment(params).then((data)=>{
						if(data.data.status == 1){
							this.$api.msg(data.data.result);
							this.paymentInit();
						}else{
							this.$api.msg(data.data.msg);
						}
					})
				}
				if(this.wx_photo != ''){
					let params1 = {
						token: uni.getStorageSync('token'),
						pic: this.wx_photo,
						pay_code: 'wechat'
					};
					let sign1 = this.$sign.getSign(params1,this.AppSecret);
					params1.sign = sign1;
					this.$http.addPayment(params1).then((data)=>{
						if(data.data.status == 1){
							this.$api.msg(data.data.result);
							this.paymentInit();
						}else{
							this.$api.msg(data.data.msg);
						}
					})
				}
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
							'path': 'user_payment'
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
			choosePhoto1(){
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						let params = {
							'token': uni.getStorageSync('token'),
							'path': 'user_payment'
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
									that.wx_photo = url;
									that.wx_photo1 = url1;
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
							let params = {
								'token': uni.getStorageSync('token'),
								'id': that.zfb_pay.id
							};
							let sign = that.$sign.getSign(params,that.AppSecret);
							params.sign = sign;
							that.$http.deletePayment(params).then((data)=>{
								that.$api.msg(data.data.result);
								that.photo = '';
								that.photo1 = '';
								that.open = false;
							})
						}
					}
				})
			},
			deletePhoto1(e){
				let that = this;
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							let params = {
								'token': uni.getStorageSync('token'),
								'id': that.wx_pay.id
							};
							let sign = that.$sign.getSign(params,that.AppSecret);
							params.sign = sign;
							that.$http.deletePayment(params).then((data)=>{
								that.$api.msg(data.data.result);
								that.wx_photo = '';
								that.wx_photo1 = '';
								that.open1 = false;
							})
						}
					}
				})
			},
			switchchange(e){
				if(e.value == true){
					this.status = 1;
				}else{
					this.status = 0;
				}
				console.log(this.status);
				setTimeout(()=>{
					let params = {
						token: uni.getStorageSync('token'),
						id: this.zfb_pay.id,
						status: this.status
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					
					this.$http.setDefaultStatus(params).then((data)=>{
						// if(data.data.status == 1){
						// 	this.$api.msg(data.data.result);
						// }else{
						// 	this.$api.msg(data.data.msg);
						// }
					})
				},300)
			},
			switchchange1(e){
				if(e.value == true){
					this.status1 = 1;
				}else{
					this.status1 = 0;
				}
				console.log(this.status1);
				setTimeout(()=>{
					let params = {
						token: uni.getStorageSync('token'),
						id: this.wx_pay.id,
						status: this.status1
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					
					this.$http.setDefaultStatus(params).then((data)=>{
						// if(data.data.status == 1){
						// 	this.$api.msg(data.data.result);
						// }else{
						// 	this.$api.msg(data.data.msg);
						// }
					})
				},300)
			}
		}
	}
</script>

<style scoped lang="scss">
	.payment_box{
		padding: 30rpx;
		box-sizing: border-box;
		.pay_title{
			color: #333;
			font-size: 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20rpx;
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				image{
					display: block;
					width: 50rpx;
					height: 50rpx;
					margin-right: 10rpx;
				}
			}
		}
		.pay_till{
			color: #999;
			font-size: 24rpx;
		}
		.upload_img_box{
			margin: 40rpx 0 20rpx;
		}
		button{
			margin-bottom: 60rpx;
			background-color: #f60;
			border-radius: 50rpx;
			color: #fff;
			font-size: 32rpx;
			&::after{
				border: 0;
			}
		}
	}
</style>

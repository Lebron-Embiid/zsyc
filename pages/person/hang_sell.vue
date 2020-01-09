<template>
	<view class="hang_sell">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="到挂卖区挂卖"></uni-nav-bar>
		<view class="hangsell_top">
			<view class="sell_title">选择收款方式 <text @tap="toAddPayment">添加收款</text></view>
			<view class="pay_box">
				<!-- <radio-group @change="selectPay">
					<view class="pay_item" v-for="(item,index) in payList" :key="index">
						<radio :value="item.value" color="#fb5860" />
						<image :src="item.icon" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
				</radio-group> -->
				<checkbox-group @change="selectPay">
					<view class="pay_item" v-for="(item,index) in payList" :key="index">
						<checkbox :value="item.value" color="#fb5860" :checked="item.checked" />
						<image :src="item.icon" mode="widthFix"></image>
						<text>{{item.name}}</text>
					</view>
				</checkbox-group>
			</view>
		</view>
		<view class="hangsell_content">
			<view class="hangsell_ipx">
				<text>挂卖单价</text>
				<input type="digit" v-model="sell_price" />
			</view>
			<view class="hangsell_ipx">
				<text>挂卖数量</text>
				<input type="number" v-model="sell_num" />
			</view>
			<view class="hangsell_txt">资格剩余：<text>{{count}}</text>个</view>
			<!-- <view class="upload_title">上传收款图片</view>
			<view class="upload_img_box">
				<view class="upload_btn" @tap="choosePhoto" v-if="photo1 == ''">
					<image src="/static/icon/add.png" mode="widthFix"></image>
				</view>
				<view class="upload_img_item" @longtap="deletePhoto" @tap="choosePhoto" v-else>
					<image class="img" :src="photo1" mode="widthFix"></image>
				</view>
			</view> -->
		</view>
		<view class="fixed_pay_bottom">
			<view>挂卖总额：￥<text>{{total_price}}</text></view>
			<button type="primary" @tap="toSubmit">确定提交</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				sell_price: '',
				sell_num: '',
				count: '',
				photo: '',
				photo1: '',
				pay: {},
				pay_name: '',
				pay_current: 1,
				payList: [
					{
						name: '支付宝支付',
						icon: '/static/icon/pay_icon1.png',
						value: 'alipay',
						checked: false
					},{
						name: '微信支付',
						icon: '/static/icon/pay_icon2.png',
						value: 'wechat',
						checked: false
					}
				]
			}
		},
		computed: {
			total_price(){
				return this.sell_price*this.sell_num
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.count = data.data.result.user_count;
			})
		},
		methods:{
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
			deletePhoto(e){
				let that = this;
				uni.showModal({
					title: "提示",
					content: "确定删除图片？",
					success: (res) => {
						if(res.confirm){
							that.photo = '';
							that.photo1 = '';
						}
					}
				})
			},
			toAddPayment(){
				uni.navigateTo({
					url: '/pages/person/payment'
				})
			},
			selectPay(e){
				console.log(e.detail.value);
				this.pay = e.detail.value;
			},
			toSubmit(){
				let payList = {};
				for(let i in this.pay){
					payList[i] = this.pay[i];
				}
				// console.log(payList);
				
				let params = {
					token: uni.getStorageSync('token'),
					price: this.sell_price,
					num: this.sell_num,
					payment: JSON.stringify(payList)
				};
				
				let info = {
					price: this.sell_price,
					num: this.sell_num,
					total: parseInt(this.sell_price)*this.sell_num
				}
				
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setUserCount(params).then((data)=>{
					if(data.data.status == 1){
						this.$api.msg(data.data.result);
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/person/submit_success?type=success&sell=1&info='+JSON.stringify(info)
							})
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
	.hang_sell{
		background: #eee;
	}
	.hangsell_top{
		padding-bottom: 40rpx;
		box-sizing: border-box;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		color: #999;
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		.sell_title{
			color: #333;
			font-size: 32rpx;
			font-weight: normal;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			text{
				color: #f60;
				font-size: 28rpx;
			}
		}
		.pay_box{
			background: #fff;
			.pay_item{
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				color: #333;
				font-size: 32rpx;
				checkbox,radio{
					transform: scale(.8);
				}
				image{
					display: block;
					width: 50rpx;
					height: 50rpx;
					margin: 0 20rpx 0 10rpx
				}
			}
		}
	}
	.hangsell_content{
		padding: 30rpx;
		box-sizing: border-box;
		margin-bottom: 100rpx;
		.hangsell_ipx{
			padding: 10rpx 30rpx 0;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #999;
			font-size: 28rpx;
			margin-bottom: 30rpx;
			input{
				display: block;
				width: 320rpx;
				height: 68rpx;
				background: #fff;
				border: 1px solid #a9a9a9;
				box-sizing: border-box;
				padding: 0 10rpx;
				font-size: 28rpx;
				margin-left: 60rpx;
			}
		}
		.hangsell_txt{
			color: #999;
			font-size: 28rpx;
			font-weight: bold;
			padding: 10rpx 0 0 30rpx;
			box-sizing: border-box;
			margin-bottom: 100rpx;
			text{
				color: #f00;
			}
		}
		.upload_title{
			color: #999;
			font-size: 28rpx;
			margin: 20rpx 0;
			box-sizing: border-box;
		}
	}
</style>

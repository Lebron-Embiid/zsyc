<template>
	<view class="pay_code">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="pay_code_box">
			<image :src="url+pic" v-if="type == 'alipay'" mode="widthFix"></image>
			<image :src="url+pic" v-if="type == 'wechat'" mode="widthFix"></image>
			<view class="pay_desc">温馨提示：该收款图片由卖家上传，请输入正确的交易金额，卖家在确认收到款项后，将发放资格数量到你的会员账上。</view>
		</view>
		<view class="pay_text">
			<textarea v-model="message" @input="valNum" maxlength="45" placeholder="买家留言，45字以内" />
			<text class="len">{{length}}/45</text>
		</view>
		<view class="fixed_pay_bottom">
			<view>应付：￥<text>{{price}}</text></view>
			<button type="primary" @tap="toPay">确认付款</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				id: '',
				title: '',
				pic: '',
				length: 0,
				message: '',
				type: 'wechat',
				price: '',
				url: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.type != undefined){
				console.log(opt);
				this.id = opt.id;
				this.title = opt.title+'支付';
				this.pic = opt.pic;
				this.price = opt.total;
				this.type = opt.type;
			}
			// if(this.type == 'wechat'){
			// 	this.title = '识别二维码支付（微信）';
			// }else{
			// 	this.title = '识别二维码支付（支付宝）';
			// }
		},
		methods:{
			toPay(){
				this.$Debounce.canDoFunction({
					key: "ConfirmOrder",
					time: 1500,
					success:()=>{
						let params = {
							token: uni.getStorageSync('token'),
							order_id: this.id,
							memo: this.message
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.userCountOrderConfirmOrder(params).then((data)=>{
							if(data.data.status == 1){
								this.$api.msg(data.data.result);
								setTimeout(()=>{
									uni.redirectTo({
										url: '/pages/person/submit_success?from=0&status=1&id='+this.id
									})
								},1500)
							}else{
								this.$api.msg(data.data.msg);
							}
						})
					}
				})
			},
			valNum(e){
				this.length = e.detail.value.length;
			}
		}
	}
</script>

<style scoped lang="scss">
	.pay_code{
		background: #eee;
	}
	.pay_code_box{
		margin-bottom: 20rpx;
		background: #fff;
		image{
			display: block;
			width: 70%;
			margin: 30rpx auto 50rpx;
		}
		.pay_desc{
			padding: 0 50rpx 50rpx;
			box-sizing: border-box;
			color: #999;
			font-size: 28rpx;
		}
	}
	.pay_text{
		background: #fff;
		margin-bottom: 110rpx;
		padding: 15rpx;
		box-sizing: border-box;
		position: relative;
		textarea{
			display: block;
			width: 100%;
			background: #fafafa;
			padding: 10rpx;
			box-sizing: border-box;
			font-size: 32rpx;
		}
		text{
			color: #999;
			font-size: 28rpx;
			position: absolute;
			right: 40rpx;
			bottom: 30rpx;
		}
	}
</style>
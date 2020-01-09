<template>
	<view class="pay">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="选择付款方式"></uni-nav-bar>
		<view class="pay_box">
			<radio-group @change="selectPay">
				<view class="pay_item" v-for="(item,index) in payList" :key="index">
					<radio :value="item.value" color="#fb5860" :checked="item.checked" />
					<image :src="item.icon" mode="widthFix"></image>
					<text>{{item.name}}</text>
				</view>
			</radio-group>
		</view>
		<button type="primary" @tap="toNext" class="fixed_bottom_btn">确定</button>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				id: '',
				type: '',
				payList: [
					{
						name: '支付宝支付',
						icon: '/static/icon/pay_icon1.png',
						value: 'zfb',
						checked: true
					},{
						name: '微信支付',
						icon: '/static/icon/pay_icon2.png',
						value: 'wx',
						checked: false
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.id = opt.id;
			}
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.payType(params).then((data)=>{
				
			})
		},
		methods:{
			selectPay(e){
				this.type = e.detail.value;
			},
			toNext(){
				if(this.type == 'wx'){
					uni.navigateTo({
						url: '/pages/person/pay_code?type=wechat&id='+this.id
					})
				}else{
					uni.navigateTo({
						url: '/pages/person/pay_code?type=alipay&id='+this.id
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.pay{
		background: #eee;
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
			radio{
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
</style>

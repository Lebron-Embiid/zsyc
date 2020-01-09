<template>
	<view class="qualify">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="资格购买"></uni-nav-bar>
		<view class="qualify_top">
			<view class="qt_title">{{recInfo.level_name}}：{{recInfo.nickname}}  {{phone}}</view>
			<view class="qt_txt">资格剩余：<text>{{recInfo.num}}</text>个</view>
			<view class="qt_txt">价格：<text>{{recInfo.price}}</text>元/个</view>
			<view class="qt_txt">现有资格：<text>{{count}}</text>个</view>
			<button v-if="level>=3" type="primary" size="mini" class="sell_btn" @tap="toHangSell">到挂卖区挂卖</button>
			<button type="primary" size="mini" class="buy_btn" @tap="toSell">到挂卖区购买</button>
		</view>
		<view class="qualify_content">
			<view class="qc_title">购买数量</view>
			<input v-if="dis_input == 0" type="number" v-model="buy_num" />
			<!-- <input v-else type="number" disabled v-model="buy_num" /> -->
			<!-- <view class="textarea_box">
				<textarea @input="changeNum" v-model="message" placeholder="买家留言，80字以内" />
				<text>{{num}}/80</text>
			</view> -->
		</view>
		<view class="fixed_pay_bottom">
			<view>应付：￥<text>{{recInfo.price*buy_num}}</text></view>
			<button type="primary" @tap="toPay">确定</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				id: '',
				message: '',
				buy_num: '',
				num: 0,
				count: '',
				level: '',
				dis_input: 0,
				recInfo: {},
				phone: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.num != undefined){
				this.buy_num = opt.num;
				// this.dis_input = 1;
				this.recInfo = opt.recinfo;
				console.log(opt);
			}
			
			if(this.dis_input == 0){
				// uni.removeStorage({
				// 	key:'orderInfo'
				// })
				let params = {
					token: uni.getStorageSync('token')
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getParentCount(params).then((data)=>{
					this.recInfo = data.data.result;
					
					let tel = ""+this.recInfo.mobile;
					let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
					this.phone = tel1;
				})
			}
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.count = data.data.result.user_count;
				this.level = data.data.result.level;
			})
			// if(this.dis_input == 1){
			// 	if(uni.getStorageSync('orderInfo') != ''){
			// 		uni.getStorage({
			// 			key:'orderInfo',
			// 			success: (e) => {
			// 				console.log(e);
			// 				this.recInfo = e.data;
							
			// 				let tel = ""+this.recInfo.mobile;
			// 				let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
			// 				this.phone = tel1;
			// 			}
			// 		})
			// 	}
			// }
		},
		methods:{
			changeNum(e){
				this.num = e.detail.value.length;
			},
			toSell(){
				uni.navigateTo({
					url: '/pages/person/sell'
				})
			},
			toHangSell(){
				uni.navigateTo({
					url: '/pages/person/hang_sell?count='+this.count
				})
			},
			toPay(){
				// console.log(this.dis_input);
				// if(this.dis_input == 0){
					let params = {
						token: uni.getStorageSync('token'),
						sell_id: this.recInfo.id,
						num: this.buy_num
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.addUserCountOrder(params).then((data)=>{
						if(data.data.status == 1){
							this.$api.msg(data.data.result);
							this.buy_num = '';
							
							let params1 = {
								token: uni.getStorageSync('token')
							};
							let sign1 = this.$sign.getSign(params1,this.AppSecret);
							params1.sign = sign1;
							
							this.$http.getUserInfo(params).then((data)=>{
								this.count = data.data.result.user_count;
								this.level = data.data.result.level;
							})
							this.$http.getParentCount(params1).then((data)=>{
								this.recInfo = data.data.result;
								
								let tel = ""+this.recInfo.mobile;
								let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
								this.phone = tel1;
							})
							
							setTimeout(()=>{
								// url: '/pages/person/submit_success?type=success&id='+this.recInfo.id
								if(this.recInfo == null){
									uni.redirectTo({
										url: '/pages/person/order_list'
									})
								}else{
									uni.navigateTo({
										url: '/pages/person/order_list'
									})
								}
							},1500)
						}else{
							this.$api.msg(data.data.msg);
						}
					})
				// }
				
				// let params1 = {
				// 	token: uni.getStorageSync('token'),
				// 	order_id: this.recInfo.id,
				// 	memo: this.message
				// };
				// let sign1 = this.$sign.getSign(params1,this.AppSecret);
				// params1.sign = sign1;
				// this.$http.userCountOrderConfirmOrder(params1).then((data)=>{
				// 	if(data.data.status == 1){
				// 		this.$api.msg(data.data.result);
				// 		setTimeout(()=>{
				// 			uni.redirectTo({
				// 				url: '/pages/person/submit_success?type=pay'
				// 			})
				// 		},1500)
				// 	}else{
				// 		this.$api.msg(data.data.msg);
				// 	}
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.textarea_box{
		border-top: 0;
		textarea{
			height: 300rpx;
			text-align: left;
		}
	}
	.qualify{
		background: #eee;
	}
	.qualify_top{
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		color: #999;
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		.qt_title{
			color: #333;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}
		.qt_txt{
			margin-top: 10rpx;
			text{
				color: #f00;
				margin-right: 5rpx;
			}
		}
		button{
			display: block;
			background: #f60;
			position: absolute;
			&:after{
				border: 0;
			}
		}
		.buy_btn{
			right: 50rpx;
			bottom: 30rpx;
		}
		.sell_btn{
			bottom: 110rpx;
			right: 50rpx;
			background: #090;
		}
	}
	.qualify_content{
		text-align: center;
		margin-bottom: 100rpx;
		.qc_title{
			color: #999;
			font-size: 36rpx;
			font-weight: bold;
			margin: 100rpx auto 30rpx;
		}
		input{
			display: block;
			width: 320rpx;
			height: 68rpx;
			border: 1px solid #ccc;
			margin: 0 auto 80rpx;
			background: #fff;
			text-align: left;
			padding-left: 10rpx;
			box-sizing: border-box;
			font-size: 28rpx;
		}
	}
</style>

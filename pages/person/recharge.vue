<template>
	<view class="recharge">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我要充值"></uni-nav-bar>
		<view class="recharge_box">
			<input type="number" placeholder="请输入充值金额" v-model="recharge_num" />
			<radio-group @change="changeCode">
				<label v-for="(item,index) in payList" :key='index'>
					<radio :value="item.code" color="#fb5860" /><text>{{item.name}}</text>
				</label>
			</radio-group>
			<button @tap="submit" type="primary" size="mini">确认充值</button>
			<!-- <u-parse :content="content"></u-parse> -->
			<!-- {{content}} -->
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from "@/components/u-parse/u-parse.vue"
	export default{
		data(){
			return{
				recharge_num: '',
				pay_radio: '',
				payList: [],
				url: '',
				content: ''
			}
		},
		components:{
			uniNavBar,
			uParse
		},
		onLoad(opt) {
			this.url = this.$http.url;
			
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.onlinePay(params).then((data)=>{
				this.payList = data.data.result;
			})
		},
		methods:{
			changeCode(e){
				this.pay_radio = e.detail.value;
			},
			submit(){
				this.$Debounce.canDoFunction({
					key: "recharge",
					time: 1500,
					success:()=>{
						let params = {
							token: uni.getStorageSync('token'),
							account: this.recharge_num,
							pay_radio: this.pay_radio
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.recharge(params).then((data)=>{
							this.$api.msg(data.data.msg);
							if(data.data.status == 1){
								this.$api.msg('成功');
								let params1 = {
									order_id: data.data.result,
									pay_radio: JSON.parse(JSON.stringify('pay_code='+this.pay_radio))
								};
								let sign1 = this.$sign.getSign(params1,this.AppSecret);
								params1.sign = sign1;
								this.$http.getPayThird(params1).then((data1)=>{
									this.$api.msg(data1.data.msg);
									let url = this.$http.url+data1.data.result;
									// this.content = '<!DOCTYPE html><html lang="zh"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">	<meta http-equiv="X-UA-Compatible" content="ie=edge"><title></title></head><body>'+data1.data.result.code_str+'</body></html>';
									// this.content = data1.data.result.code_str;
									setTimeout(()=>{
										uni.navigateTo({
											url: '/pages/person/third_pay?url='+url
										})
									},1500)
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.recharge{
		background: #eee;
	}
	.recharge_box{
		padding: 100rpx 100rpx 0;
		box-sizing: border-box;
		input{
			display: block;
			width: 100%;
			height: 88rpx;
			background: #fff;
			border: 1px solid #ccc;
			padding: 0 10rpx;
			box-sizing: border-box;
			margin-bottom: 100rpx;
		}
		label{
			margin: 50rpx 0;
			display: block;
			width: 100%;
			font-size: 32rpx;
			radio{
				display: inline-block;
				vertical-align: middle;
				transform: scale(.8);
				margin-bottom: 5rpx;
			}
		}
		button{
			color: #fff;
			font-size: 32rpx;
			background-color: #f60;
			display: block;
			margin: 0 auto;
			width: 280rpx;
			height: 80rpx;
			line-height: 80rpx;
			&:after{
				border: 0;
			}
		}
	}
</style>

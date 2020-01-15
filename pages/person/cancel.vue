<template>
	<view class="cancel">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="申请取消订单" rightText="提交" @clickRight="clickRightBtn"></uni-nav-bar>
		<picker @change="bindPickerChange" :value="index" :range="array">
			<view class="acc_right">
				<view class="uni-input">{{cancel_txt}}</view>
				<image src="/static/icon/arrow.png" mode="widthFix"></image>
			</view>
		</picker>
		<view class="cancel_box">
			<view class="cancel_title">订单取消后：</view>
			<view>• 此订单所使用优惠券会退回（新用户券失效）</view>
			<view>• 此订单参加满赠券活动所送优惠券将失效</view>
			<view>• 此订单获得的成长值会被扣除</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				id: '',
				array: ['不想买了', '发现同款更低价', '忘记使用优惠券', '地址填错了','其他'],
				index: null,
				cancel_txt: '请选择取消原因'
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.id = opt.id;
				console.log(this.id);
			}
			// let params = {};
			// let sign = this.$sign.getSign(params,this.AppSecret);
			// params.sign = sign;
			// this.$http.returnGoodReason(params).then((data)=>{
			// 	this.array = data.data.result;
			// })
		},
		methods:{
			clickRightBtn(){
				if(this.index == null){
					this.$api.msg('请选择取消原因');
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					order_id: this.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.cancelOrder(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							})
						},1500)
					}
				})
			},
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value);
				this.index = e.target.value;
				this.cancel_txt = this.array[this.index];
			}
		}
	}
</script>

<style scoped lang="scss">
	.cancel{
		background: #eee;
	}
	.acc_right{
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 32rpx;
		margin: 20rpx 0;
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
	}
	.cancel_box{
		padding: 0 30rpx;
		box-sizing: border-box;
		color: #999;
		font-size: 28rpx;
		view{
			margin-bottom: 5rpx;
		}
		.cancel_title{
			color: #666;
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}
	}
</style>

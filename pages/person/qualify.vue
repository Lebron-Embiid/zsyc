<template>
	<view class="qualify">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="资格购买"></uni-nav-bar>
		<view class="qualify_top">
			<view class="qt_title">联合创始人：亮亮  186****1688</view>
			<view class="qt_txt">资格剩余：<text>8333</text>个</view>
			<view class="qt_txt">价格：<text>10</text>元/个</view>
			<view class="qt_txt">现有资格：<text>0</text>个</view>
		</view>
		<view class="qualify_content">
			<view class="qc_title">购买数量</view>
			<input type="number" value="" />
			<view class="textarea_box">
				<textarea @input="changeNum" v-model="message" placeholder="买家留言，80字以内" />
				<text>{{num}}/80</text>
			</view>
		</view>
		<view class="fixed_pay_bottom">
			<view>应付：￥<text>10.00</text></view>
			<button type="primary" @tap="toPay">去付款</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				message: '',
				num: 0
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			changeNum(e){
				this.num = e.detail.value.length;
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
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		color: #999;
		font-size: 28rpx;
		font-weight: bold;
		.qt_title{
			color: #333;
			font-size: 32rpx;
			margin-bottom: 10rpx;
		}
		.qt_txt{
			margin-top: 5rpx;
			text{
				color: #f00;
				margin-right: 5rpx;
			}
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

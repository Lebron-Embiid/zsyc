<template>
	<view class="fixedList">
		<view class="fixed_circle" v-if="isShow == false" @tap="changeShow">
			<view>套餐</view>
			<view>引导</view>
		</view>
		<view class="fixed_right_box" :class="[isShow==true?'active':'']">
			<view class="fixed_right_item active" @tap="toLink">
				<view>{{name.substr(0, 2)}}</view>
				<view>{{name.substr(2, 3)}}</view>
			</view>
			<view class="fixed_right_item yellow">
				<view>女士</view>
				<view>毛衣</view>
			</view>
			<view class="fixed_right_item yellow">
				<view>女士</view>
				<view>连衣裙</view>
			</view>
			<view class="fixed_right_item">
				<view>女士</view>
				<view>衬衫</view>
			</view>
			<view class="fixed_right_item">
				<view>女士</view>
				<view>外套</view>
			</view>
			<view class="fixed_right_item last" @tap="closeShow">
				<image src="/static/icon/close.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'fixedList',
		data(){
			return{
				isShow: false,
				name: '女士大衣'
			}
		},
		onLoad() {
			
		},
		methods:{
			changeShow(){
				this.isShow = true;
			},
			closeShow(){
				this.isShow = false;
			},
			toLink(){
				uni.navigateTo({
					url: '/pages/meal/meal'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.fixed_circle{
		position: fixed;
		right: 20rpx;
		top: 50%;
		// transform: translateY(-50%);
		width: 122rpx;
		height: 122rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		border-radius: 50%;
		background: rgba(249, 183, 84, .8);
		text-align: center;
		z-index: 10;
		color: #fff;
		font-size: 32rpx;
		padding: 20rpx 0;
		box-sizing: border-box;
		view{
			width: 100%;
		}
	}
	.fixed_right_box{
		position: fixed;
		top: 45px;
		right: -100%;
		z-index: 20;
		transition: right .5s ease;
		&.active{
			right: 0;
		}
		.fixed_right_item{
			width: 120rpx;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			flex-wrap: wrap;
			color: #fff;
			font-size: 28rpx;
			padding: 15rpx 0;
			box-sizing: border-box;
			background: #b3b3b3;
			margin-bottom: 10rpx;
			border: 2px solid transparent;
			&.last{
				height: auto;
				padding: 0;
			}
			&.yellow{
				background: #fab348;
			}
			&.active,&:active{
				background: #fa8f48;
				border-color: #d74848;
			}
			view{
				width: 100%;
			}
			image{
				display: block;
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>

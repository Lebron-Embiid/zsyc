<template>
	<view class="offline_area">
		<uni-nav-bar left-icon="back" title="线上发货专区"></uni-nav-bar>
		<view class="fixed_box">
			<image src="/static/icon/fixed.png" mode="widthFix"></image>
			{{city}}
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				city: '',
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			
		},
		onLoad() {
			let that = this;
			uni.chooseLocation({
				success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					that.city = res.address;
				}
			});
		}
	}
</script>

<style scoped lang="scss">
	.fixed_box{
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		color: #666;
		font-size: 28rpx;
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		image{
			display: block;
			width: 34rpx;
			height: 50rpx;
			margin-right: 10rpx;
		}
	}
</style>

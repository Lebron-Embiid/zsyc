<template>
	<view class="about">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="关于我们"></uni-nav-bar>
		<view class="about_code_box">
			<view>
				<image src="/static/about_logo.png" mode="widthFix"></image>
				<image src="/static/about_code.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="setting_box line">
			<view class="set_left">特别声明</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<navigator url="/pages/person/help_center" class="setting_box line">
			<view class="set_left">使用帮助</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<view class="setting_box line">
			<view class="set_left">给我评分</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box line">
			<view class="set_left">隐私政策</view>
			<view class="set_right"><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		
		<view class="about_bottom">
			<view>Copyright@2020-2030</view>
			<view>掌上衣橱（广州）供应链管理有限公司</view>
			<view>版权所有</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				
			}
		},
		components:{
			uniNavBar
		}
	}
</script>

<style scoped lang="scss">
	.about{
		background: #eee;
	}
	.about_code_box{
		padding: 50rpx;
		box-sizing: border-box;
		view{
			background: #fff;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			image{
				display: block;
				width: 50%;
			}
		}
	}
	.about_bottom{
		margin-top: 50rpx;
		color: #999;
		font-size: 28rpx;
		text-align: center;
	}
</style>

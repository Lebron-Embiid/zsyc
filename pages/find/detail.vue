<template>
	<view class="detail">
		<uni-nav-bar left-icon="back" title="发现详情页"></uni-nav-bar>
		<view class="find_detail_box">
			<view class="detail_title">贴身内衣裤挑选指南，专业知识在这里！</view>
			贴身内衣裤挑选指南，专业知识在这里！
			
			每日贴身穿着的内衣裤，决定了私密处的健康与舒适。针对男、女士和孕妇，也有着不同的挑选法则。平台盘点整条产品线，告诉你内衣裤到底怎么挑。
			
			臀围和腰围各指什么？臀围指臀部最宽处水平绕一周的长度，标准比例是“女性身高值乘以0.542”。腰围指经肚脐上0.5至1厘米处水平绕一周的长度，标准比例是“女性身高值乘以0.34 ”。
			
			如何根据“臀型”和“腰型”选择适合自己的内裤？女士内裤与男士内裤还是有很大的区别的，其中关键性便是对“倩影”和“臀部”的修饰作用。谈裤型，先要谈腰型，因为它牵涉到身材的“立体轮廓”问题。经典的裤装是有内在的气质，自信、现代。女性的内裤虽有多种类型，但有一点是共同的，那就是：外装是给别人看的，内裤和内衣是为自己穿的。不舒服的裤子肯定不好看，好看的裤子首先是穿起来舒服。
			
			圆润的臀部：低腰裤。裤腰位于腰线以下，又叫无腰裤。穿着时裤腰在肚脐眼以下松松垮垮挂在胯部，裸露出腰部与臀部的结合部那一段优美的弧线，非常适合腰围与臀围尺寸相差较大的人。低腰短裆，臀腹部贴身。低腰款让你的臀部短了一大截，显得臀围好像小了一圈，臀部看起来更小巧。
		</view>
		<view class="mb100"></view>
		<view class="fixed_bottom">
			<form @submit="submitForm">
				<input type="text" placeholder="说点什么吧">
			</form>
			<image src="/static/icon/message.png" @tap="toComments" mode="widthFix"></image>
			<image src="/static/icon/collect.png" v-if="is_collect == 0" @tap="collect" mode="widthFix"></image>
			<image src="/static/icon/collect1.png" v-if="is_collect == 1" @tap="collectCancel" mode="widthFix"></image>
			<image src="/static/icon/share1.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				is_collect: 0
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			submitForm(){
				
			},
			toComments(){
				uni.navigateTo({
					url: '/pages/find/comments'
				})
			},
			collect(){
				this.is_collect = 1;
				this.$api.msg('收藏成功');
			},
			collectCancel(){
				this.is_collect = 0;
				this.$api.msg('已取消收藏');
			}
		}
	}
</script>

<style scoped lang="scss">
	.find_detail_box{
		padding: 30rpx;
		box-sizing: border-box;
		.detail_title{
			font-size: 40rpx;
			font-weight: bold;
			margin-bottom: 30rpx;
		}
	}
	.fixed_bottom{
		position: fixed;
		width: 100%;
		height: 100rpx;
		left: 0;
		bottom: 0;
		z-index: 5;
		border-top: 1px solid #e2e2e2;
		background: #fafafa;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		form{
			display: block;
			width: 60%;
			background: #eee;
			padding: 10rpx;
			box-sizing: border-box;
			border-radius: 30rpx;
			input{
				font-size: 28rpx;
				padding-left: 10rpx;
				box-sizing: border-box;
			}
		}
		image{
			display: block;
			max-width: 46rpx;
			max-height: 46rpx;
		}
	}
</style>

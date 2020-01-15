<template>
	<view class="message">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="消息"></uni-nav-bar>
		<view class="message_box">
			<navigator url="/pages/person/activity" class="message_item">
				<view class="icon_box">
					<image class="icon" src="/static/icon/msg_icon1.png" mode="widthFix"></image>
				</view>
				<view class="msg_content">
					<view class="msg_box">
						<view class="msg_title">优惠活动</view>
						<view class="msg_info">{{act_title}}</view>
					</view>
					<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</navigator>
			<navigator url="/pages/person/notice" class="message_item">
				<view class="icon_box red">
					<image class="icon" src="/static/icon/msg_icon2.png" mode="widthFix"></image>
				</view>
				<view class="msg_content">
					<view class="msg_box">
						<view class="msg_title">通知消息</view>
						<view class="msg_info">{{notice_title}}</view>
					</view>
					<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</navigator>
			<navigator url="/pages/person/chat" class="message_item">
				<view class="icon_box blue">
					<image class="icon" src="/static/icon/msg_icon3.png" mode="widthFix"></image>
				</view>
				<view class="msg_content">
					<view class="msg_box">
						<view class="msg_title">在线客服</view>
						<view class="msg_info">查看与客服的沟通记录</view>
					</view>
					<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				act_title: '',
				notice_title: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 1
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getDiscountArticle(params).then((data)=>{
				this.act_title = data.data.result[0].title;
			})
			
			let params1 = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 1
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.getNoticesList(params1).then((data)=>{
				this.notice_title = data.data.result[0].title;
			})
		}
	}
</script>

<style scoped lang="scss">
	.message_box{
		padding: 10rpx 0;
	}
</style>

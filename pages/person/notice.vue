<template>
	<view class="activity notice">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="通知消息"></uni-nav-bar>
		<view class="activity_box">
			<view class="activity_item" @tap="toDetail(item.id)" v-for="(item,index) in noticeList" :key="index">
				<text class="act_time">{{util.formatTime(item.add_time)}}</text>
				<view class="act_box">
					<view class="act_title">{{item.title}}</view>
					<view class="act_desc">{{item.desc}}</view>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniloadMore from "@/components/uni-load-more/uni-load-more.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				noticeList: [
					// {
					// 	time: '活动日期',
					// 	title: '通知消息标题',
					// 	desc: '消息通知的内容描述：描述内容请控制在两行以内，超过两行的部分请用... >>'
					// }
				],
				loadingType: 'more',
				util: '',
				page: 1
			}
		},
		components:{
			uniNavBar,
			uniloadMore
		},
		onLoad(opt) {
			this.util = util;
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getNoticesList(params).then((data)=>{
				this.noticeList = data.data.result;
			})
		},
		methods:{
			toDetail(id){
				uni.navigateTo({
					url: '/pages/person/notice_detail?type=notice&id='+id
				})
			}
		},
		onReachBottom() {
			this.page++;
			let params = {
				token: uni.getStorageSync('token'),
				page: this.page,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getNoticesList(params).then((data)=>{
				if(data.data.result.length == 0){
					this.loadingType = 'noMore';
					return;
				}
				this.noticeList = this.noticeList.concat(data.data.result);
			})
		}
	}
</script>

<style scoped lang="scss">
	.activity_box{
		padding: 30rpx;
		box-sizing: border-box;
		background: #eee;
		.activity_item{
			text-align: center;
			margin-bottom: 30rpx;
			.act_time{
				display: inline-block;
				padding: 8rpx 20rpx 8rpx;
				background: #ccc;
				border-radius: 5rpx;
				color: #fff;
				font-size: 24rpx;
				margin-bottom: 20rpx;
			}
			.act_box{
				padding: 30rpx;
				box-sizing: border-box;
				background: #fff;
				border-radius: 5rpx;
				text-align: left;
				.act_title{
					color: #333;
					font-size: 36rpx;
					margin-bottom: 20rpx;
				}
				.act_desc{
					color: #999;
					font-size: 32rpx;
				}
			}
		}
	}
</style>

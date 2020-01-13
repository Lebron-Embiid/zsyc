<template>
	<view class="activity notice">
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="notice_box">
			<skeleton
			  :loading="loading"
			  :showAvatar="false"
			>
			<view class="notice_title">{{noticeInfo.title}}</view>
			<block v-if="noticeInfo.content != ''">
				<u-parse :content="noticeInfo.content"></u-parse>
			</block>
			</skeleton>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from "@/components/u-parse/u-parse.vue"
	import Skeleton from '@/components/skeleton/index.vue'
	export default{
		data(){
			return{
				title: '',
				noticeInfo: {},
				loading: true
			}
		},
		components:{
			uniNavBar,
			uParse,
			Skeleton
		},
		onLoad(opt) {
			if(opt.type == 'notice'){
				this.title = '通知详情';
				let params = {
					token: uni.getStorageSync('token'),
					id: opt.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getNoticesInfo(params).then((data)=>{
					this.noticeInfo = data.data.result;
					this.loading = false;
				})
			}else{
				this.title = '优惠详情';
				let params = {
					token: uni.getStorageSync('token'),
					id: opt.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getArticleInfo(params).then((data)=>{
					this.noticeInfo = data.data.result;
					this.loading = false;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.notice_box{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.notice_title{
		text-align: center;
		color: #333;
		font-size: 32rpx;
		margin: 30rpx 0;
	}
</style>

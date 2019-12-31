<template>
	<view class="detail">
		<uni-nav-bar left-icon="back" title="发现详情页"></uni-nav-bar>
		<view class="find_detail_box">
			<skeleton
			  :loading="loading"
			  :showAvatar="false"
			>
				<view class="detail_title">{{title}}</view>
				<view class="detail_content">
					<block v-if="content!=''">
						<u-parse :content="content"></u-parse>
					</block>
				</view>
			</skeleton>
		</view>
		<view class="mb100"></view>
		<view class="fixed_bottom">
			<form>
				<view class="form_input_item">
					<input type="text" v-model="say_content" placeholder="说点什么吧">
					<button @tap="submitForm" type="primary" size="mini">发送</button>
				</view>
			</form>
			<image src="/static/icon/message.png" @tap="toComments" mode="widthFix"></image>
			<image src="/static/icon/collect.png" v-if="is_collect == 0" @tap="collect" mode="widthFix"></image>
			<image src="/static/icon/collect1.png" v-else @tap="collectCancel" mode="widthFix"></image>
			<image src="/static/icon/share1.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uParse from '@/components/u-parse/u-parse.vue'
	import Skeleton from '@/components/skeleton/index.vue'
	export default{
		data(){
			return{
				id: '',
				is_collect: 0,
				title: '',
				content: '',
				say_content: '',
				loading: true
			}
		},
		components:{
			uniNavBar,
			uParse,
			Skeleton
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.id = opt.id;
			}
		},
		onShow() {
			let params = {
				article_id: this.id
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getArticleDetail(params).then((data)=>{
				console.log(this.is_collect);
				this.title = data.data.result.title;
				this.content = data.data.result.content;
				this.is_collect = data.data.result.collect;
				this.loading = false;
			})
		},
		methods:{
			submitForm(){
				let params = {
					token: uni.getStorageSync('token'),
					article_id: this.id,
					content: this.say_content
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleComment(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.say_content = '';
					}
				})
			},
			toComments(){
				uni.navigateTo({
					url: '/pages/find/comments?id='+this.id
				})
			},
			collect(){
				this.is_collect = 1;
				let params = {
					token: uni.getStorageSync('token'),
					article_id: this.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleCollect(params).then((data)=>{
					this.$api.msg(data.data.msg);
				})
			},
			collectCancel(){
				this.is_collect = 0;
				let params = {
					token: uni.getStorageSync('token'),
					article_id: this.id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleCollect(params).then((data)=>{
					this.$api.msg(data.data.msg);
				})
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
			.form_input_item{
				background: #eee;
				box-sizing: border-box;
				border-radius: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					width: 70%;
					font-size: 28rpx;
					padding-left: 15rpx;
					box-sizing: border-box;
				}
				button{
					padding: 0 20rpx;
					margin: 0;
					border-radius: 0 30rpx 30rpx 0;
					background: #f90;
					color: #fff;
					font-size: 28rpx;
					&:after{
						border: 0;
					}
				}
			}
		}
		image{
			display: block;
			max-width: 46rpx;
			max-height: 46rpx;
		}
	}
</style>

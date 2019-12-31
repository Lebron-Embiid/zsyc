<template>
	<view class="comments">
		<uni-nav-bar left-icon="back" title="评论"></uni-nav-bar>
		<view class="comments_box">
			<view class="comments_item" v-for="(item,index) in commentsList" :key="index">
				<image class="head_img" :src="item.head_pic" mode="widthFix"></image>
				<view class="comments_right">
					<view class="com_top">
						<view class="com_left">
							<view class="com_name">{{item.nickname}}</view>
							<view class="com_time">{{item.add_time}}</view>
						</view>
						<view class="com_like" @tap="toLove(index,item.id)">
							<image src="/static/icon/love.png" v-if="item.is_love == 0" mode="widthFix"></image>
							<image src="/static/icon/love1.png" v-if="item.is_love == 1" mode="widthFix"></image>
							{{item.zan}}
						</view>
					</view>
					<view class="com_content">
						{{item.content}}
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</view>
		<view class="mb100"></view>
		<view class="fixed_bottom">
			<form @submit="submitForm">
				<view class="form_input_item">
					<input type="text" placeholder="说点什么吧">
					<button type="primary" size="mini">发送</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				id: '',
				commentsList: [
					// {
					// 	avatar: '/static/avatar/head1.png',
					// 	name: '路****光',
					// 	time: '上午 10:22',
					// 	content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
					// 	num: 93,
					// 	is_love: 0
					// }
				],
				loadingType: 'more',
				page: 0,
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.id != undefined){
				this.id = opt.id;
				console.log(opt.id);
			}
		},
		onShow() {
			let params = {
				article_id: this.id,
				page: 0,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getCommentList(params).then((data)=>{
				// this.commentsList = data.data.result;
				let res = data.data.result;
				console.log(res);
				for(let i in res){
					this.commentsList.push({
						add_time: util.friendlyDate(res[i].add_time*1000),
						content: res[i].content,
						head_pic: res[i].head_pic,
						id: res[i].id,
						nickname: res[i].nickname,
						zan: res[i].zan,
						is_love: 0
					})
				}
				console.log(this.commentsList);
			})
		},
		methods:{
			toLove(idx,cid){
				if(this.commentsList[idx].is_love == 0){
					this.commentsList[idx].is_love = 1;
					// this.commentsList[idx].zan++;
				}else{
					this.commentsList[idx].is_love = 0;
					// this.commentsList[idx].zan--;
				}
				let params = {
					token: uni.getStorageSync('token'),
					article_id: this.id,
					comment_id: cid
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.articleCommentLike(params).then((data)=>{
					this.$api.msg(data.data.msg);
				})
			},
			submitForm(){
				this.$api.msg('发送成功');
			}
		}
	}
</script>

<style scoped lang="scss">
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
			width: 100%;
			.form_input_item{
				background: #eee;
				box-sizing: border-box;
				border-radius: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					display: block;
					width: 80%;
					font-size: 28rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
				}
				button{
					padding: 0 30rpx;
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
	}
	.comments_box{
		.comments_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			&:last-child{
				border-bottom: 0;
			}
			.head_img{
				display: block;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.comments_right{
				width: 80%;
				font-size: 32rpx;
				.com_top{
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30rpx;
					.com_left{
						width: 80%;
						.com_name{
							color: #333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.com_time{
							color: #999;
							font-size: 24rpx;
							margin: 10rpx 0 0;
						}
					}
					.com_like{
						image{
							display: inline-block;
							vertical-align: middle;
							width: 36rpx;
							height: 35rpx;
							margin: 0 8rpx 5rpx 0;
						}
					}
				}
			}
		}
	}
</style>

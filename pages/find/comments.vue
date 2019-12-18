<template>
	<view class="comments">
		<uni-nav-bar left-icon="back" title="评论"></uni-nav-bar>
		<view class="comments_box">
			<view class="comments_item" v-for="(item,index) in commentsList" :key="index">
				<image class="head_img" :src="item.avatar" mode="widthFix"></image>
				<view class="comments_right">
					<view class="com_top">
						<view class="com_left">
							<view class="com_name">{{item.name}}</view>
							<view class="com_time">{{item.time}}</view>
						</view>
						<view class="com_like" @tap="toLove(index)">
							<image src="/static/icon/love.png" v-if="item.is_love == 0" mode="widthFix"></image>
							<image src="/static/icon/love1.png" v-if="item.is_love == 1" mode="widthFix"></image>
							{{item.num}}
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
				<input type="text" placeholder="说点什么吧">
			</form>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				commentsList: [
					{
						avatar: '/static/avatar/head1.png',
						name: '路****光',
						time: '上午 10:22',
						content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
						num: 93,
						is_love: 0
					},{
						avatar: '/static/avatar/head2.png',
						name: '路****光',
						time: '上午 10:22',
						content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
						num: 93,
						is_love: 0
					},{
						avatar: '/static/avatar/head1.png',
						name: '路****光',
						time: '上午 10:22',
						content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
						num: 93,
						is_love: 0
					},{
						avatar: '/static/avatar/head2.png',
						name: '路****光',
						time: '上午 10:22',
						content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
						num: 93,
						is_love: 0
					},{
						avatar: '/static/avatar/head1.png',
						name: '路****光',
						time: '上午 10:22',
						content: '666，内容超级棒，谢谢分享，希望自己能学到更多。',
						num: 93,
						is_love: 0
					}
				],
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			toLove(idx){
				if(this.commentsList[idx].is_love == 0){
					this.commentsList[idx].is_love = 1;
					this.commentsList[idx].num++;
				}else{
					this.commentsList[idx].is_love = 0;
					this.commentsList[idx].num--;
				}
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

<template>
	<view class="find">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
		    <view class="top_view"></view>  
		</view>  
		<!-- #endif --> 
		<view class="find_search_box">
			<view class="search_box">
				<image class="icon" src="/static/icon/search.png" mode="widthFix"></image>
				<input type="text" :value="keywords" v-model="keywords" placeholder="请输入关键词进行搜索" />
				<image @tap="clearInput" v-if="keywords != ''" class="clear" src="/static/icon/clear.svg" mode="widthFix"></image>
			</view>
		</view>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="scroll_box">
			<view class="find_content_box" @tap="toDetail(item.id)" v-for="(item,index) in findList" :key='index'>
				<view class="find_content_item" v-if="item.type == 1">
					<view class="find_title">{{item.title}}</view>
					<image class="pic" :src="item.src" mode="widthFix"></image>
					<view class="find_bottom">
						<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.look}}人</view>
						<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.like}}人</view>
					</view>
				</view>
				<view class="find_content_item1" v-else>
					<view class="fci_left">
						<view class="find_title">{{item.title}}</view>
						<view class="find_bottom">
							<view><image src="/static/icon/eye.svg" mode="widthFix"></image>{{item.look}}人</view>
							<view><image src="/static/icon/star.png" mode="widthFix"></image>{{item.like}}人</view>
						</view>
					</view>
					<view class="fci_right">
						<image :src="item.src" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				navbar:[{name:"精选"},{name:"上新"},{name:"达人"},{name:"衣装"}],
				currentTab:0,
				keywords: '',
				findList: [
					{
						title: '2个步骤挑到满意枕头',
						src: '/static/img/find_img1.jpg',
						look: '28.30万',
						like: '9575',
						type: 1
					},{
						title: '2个步骤挑到满意枕头',
						src: '/static/img/find_img2.jpg',
						look: '28.30万',
						like: '9575',
						type: 0
					},{
						title: '2个步骤挑到满意枕头',
						src: '/static/img/find_img3.jpg',
						look: '28.30万',
						like: '9575',
						type: 0
					}
				]
			}
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
			},
			clearInput(){
				this.keywords = '';
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/find/detail?id='+id
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.find{
		background: #eee;
	}
	.find_search_box{
		padding: 15rpx 50rpx;
		box-sizing: border-box;
		background: #f90;
		.search_box{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 66rpx;
			background: #f6d7a9;
			border-radius: 10rpx;
			padding: 0 15rpx;
			.icon{
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
			input{
				display: block;
				width: 85%;
				font-size: 28rpx;
				color: #666;
			}
			.clear{
				display: block;
				width: 40rpx;
				height: 40rpx;
				margin-left: 10rpx;
			}
		}
	}
	.scroll_box{
		height: 77vh;
	}
	.find_content_box{
		margin-bottom: 20rpx;
		background: #fff;
		&:last-child{
			margin-bottom: 0;
		}
		&:active{
			background: #f6f6f6;
		}
		.find_content_item{
			padding: 30rpx;
			box-sizing: border-box;
			.find_title{
				color: #333;
				font-size: 40rpx;
				margin-bottom: 20rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.pic{
				display: block;
				width: 100%;
			}
		}
		.find_content_item1{
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			.fci_left{
				display: flex;
				flex-wrap: wrap;
				width: 55%;
				.find_title{
					width: 100%;
					color: #333;
					font-size: 36rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.find_bottom{
					width: 100%;
					align-self: flex-end;
					view{
						display: inline-block;
						image{
							display: inline-block;
							vertical-align: middle;
							margin-bottom: 8rpx;
						}
					}
				}
			}
			.fci_right{
				image{
					display: block;
					width: 270rpx;
					height: 270rpx !important;
				}
			}
		}
		.find_bottom{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30rpx;
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-right: 40rpx;
				color: #999;
				font-size: 24rpx;
				image{
					display: block;
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>

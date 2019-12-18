<template>
	<view class="online_area">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="线上发货专区"></uni-nav-bar>
		<image class="banner" src="/static/img/online_banner.jpg" mode="widthFix"></image>
		<scroll-view class="online_box" scroll-x="true" >
			<view class="online_item_box" v-for="(item,index) in onlineList" :key="index">
				<view class="online_item" @tap="changeOnline(index)" :class="[current==index?'active':'']">
					<view class="oi_title">{{item.title}}</view>
					<view class="oi_status">{{item.status}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="online_content">
			<view class="content_item" v-for="(item,index) in contentList" :key="index">
				<image :src="item.src" mode="widthFix"></image>
				<view class="ci_center">
					<view class="ci_title">{{item.title}}</view>
					<view class="ci_type">品类：{{item.type}}</view>
					<view class="ci_car">购物车：{{item.car}}</view>
					<view class="ci_box">
						<view class="ci_num">
							<view class="text">库存<text>{{item.num}}</text>件</view>
							<view class="process" :style="{width: item.process+'%'}"></view>
						</view>
						<button type="primary" size="mini">马上抢</button>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				onlineList: [
					{
						title: '女士套餐',
						status: '火热抢购'
					},{
						title: '男士套餐',
						status: '抢购中'
					},{
						title: '儿童套餐',
						status: '甄选中'
					},{
						title: '高级套餐',
						status: '即将开始'
					},{
						title: '尊享套餐',
						status: '即将开始'
					}
				],
				current: 0,
				contentList: [
					{
						src: '/static/img/online_img1.png',
						title: '白鸭绒羽绒服',
						type: '大衣',
						car: '未选',
						num: 198,
						process: 50
					},{
						src: '/static/img/online_img2.png',
						title: '宽松长袖毛衣针织衫',
						type: '毛衣',
						car: '已选',
						num: 198,
						process: 50
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
			changeOnline(idx){
				this.current = idx;
			}
		}
	}
</script>

<style scoped lang="scss">
	.banner{
		display: block;
		width: 100%;
	}
	.online_box{
		white-space: nowrap;
		.online_item_box{
			display: inline-block;
			padding-bottom: 30rpx;
			background: #eee;
		}
		.online_item{
			padding: 18rpx 30rpx 18rpx;
			box-sizing: border-box;
			color: #666;
			background: #fff;
			text-align: center;
			position: relative;
			&.active{
				background: #fa486e;
				color: #fff;
			}
			&:before{
				content: "";
				width: 1px;
				height: 60rpx;
				background: #eee;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
			}
			&:last-child:before,&.active:before{
				display: none;
			}
			&.active:after{
				content: '';
				width: 0;
				height: 0;
				border: 15rpx solid transparent;
				border-top: 15rpx solid #fa486e;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -25rpx;
			}
			.oi_title{
				font-size: 28rpx;
				margin-bottom: 3rpx;
				font-weight: bold;
			}
			.oi_status{
				font-size: 24rpx;
			}
		}
	}
	.online_content{
		background: #fafafa;
		.content_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			image{
				display: block;
				width: 230rpx;
				height: 230rpx !important;
			}
			.ci_center{
				width: 62%;
				color: #999;
				font-size: 24rpx;
				.ci_title{
					color: #333;
					font-size: 32rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.ci_type{
					margin: 25rpx 0 20rpx;
				}
				.ci_car{
					margin-bottom: 20rpx;
				}
				.ci_box{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.ci_num{
						width: 192rpx;
						padding: 5rpx 0;
						text-align: center;
						border-radius: 30rpx;
						border: 1px solid #fee5e7;
						position: relative;
						.text{
							position: relative;
							z-index: 3;
							text{
								margin-left: 5rpx;
							}
						}
						.process{
							position: absolute;
							height: 100%;
							left: 0;
							top: 0;
							background: #feeff0;
							border-radius: 15rpx;
						}
					}
				}
			}
			button{
				display: flex;
				justify-content: center;
				align-self: flex-end;
				padding: 0;
				margin: 0;
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #f60;
				margin-left: 30rpx;
				color: #fff;
				transition: all .5s ease;
				&:active{
					opacity: .8;
				}
				&:after{
					border: 0;
				}
			}
		}
	}
</style>

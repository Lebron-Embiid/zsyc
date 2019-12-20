<template>
	<view class="shop">
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="fixed_search_top">
			<image @tap="scanCode" src="/static/icon/scan.png" class="scan_icon" mode="widthFix"></image>
			<view @tap="toSearch"><image src="/static/icon/search.png" class="search_icon" mode="widthFix"></image>搜索商品</view>
			<image src="/static/icon/mess.png" class="mess_icon" mode="widthFix"></image>
		</view>
		<scroll-view scroll-y="true" class="index_scroll">
			<view class="swiper-box">
				<swiper class="swiper"
					indicator-color="#fa1d48"
					indicator-active-color="#ffffff"
					:indicator-dots="true"
					:circular="true"
					:autoplay="true"
				>
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="index_nav_box">
					<view @tap="clickNav(index)" :class="[index == 1?'yellow':'']" v-for="(item,index) in navs" :key="index">
						<image :src="item.icon" mode="widthFix"></image>
						<text>{{item.title}}</text>
					</view>
				</view>
				<view class="time_title">
					<view>
						限时抢购
						<uni-countdown
							class="countdown"
							color="#FFFFFF" 
							background-color="#ff0036" 
							border-color="#ff0036" 
							:show-day="false"
							:hour="2" 
							:minute="30" 
							:second="0" :reset="false">
						</uni-countdown>
					</view>
					<navigator url="">更多&gt;</navigator>
				</view>
				<view class="time_goods_box">
					<view class="time_item" v-for="(item,index) in timeList" :key="index">
						<image :src="item.src" mode="widthFix"></image>
						<view>￥{{item.price}}</view>
						<text>仅剩{{item.num}}件</text>
					</view>
				</view>
			</view>
			<view class="gray-place"></view>
			<view class="shop_recommd_box">
				<view class="time_title bold">
					<view>店铺推荐</view>
					<navigator url="">更多&gt;</navigator>
				</view>
				<image src="/static/img/rec_banner.png" class="rec_banner" mode="widthFix"></image>
				<view class="rec_goods_box">
					<view class="rec_item" v-for="(item,index) in recList" :key="index">
						<image :src="item.src" mode="widthFix"></image>
						<view class="rec_title">{{item.title}}</view>
						<view class="rec_address">{{item.city}}<text>{{item.area}}</text></view>
					</view>
				</view>
			</view>
			<view class="gray-place"></view>
			<view class="shop_recommd_box">
				<view class="time_title bold">
					<view>人气推荐</view>
					<navigator url="/pages/index/category">更多&gt;</navigator>
				</view>
				<image src="/static/img/pop_banner.jpg" class="rec_banner" mode="widthFix"></image>
				<view class="rec_goods_box pop">
					<view class="rec_item" v-for="(item,index) in popList" :key="index">
						<image :src="item.src" mode="widthFix"></image>
						<view class="rec_title">{{item.title}}</view>
						<view class="rec_price">{{item.price}}</view>
					</view>
				</view>
			</view>
			<view class="gray-place"></view>
			<view class="shop_recommd_box">
				<view class="time_title bold">
					<view>为你推荐</view>
				</view>
				<view class="recommd_goods_box">
					<view class="recommd_item" v-for="(item,index) in recommdList" :key="index">
						<image :src="item.src" mode="widthFix"></image>
						<view class="ri_title">{{item.title}}</view>
						<view class="ri_price">￥{{item.price}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</scroll-view>
		<fixed-list></fixed-list>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniStatusBar from "@/components/uni-status-bar/uni-status-bar.vue"
	import uniCountdown from "@/components/uni-count-down/uni-countdown.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import fixedList from "@/components/fixedList.vue"
	export default{
		data(){
			return{
				swiperList: ['/static/img/banner1.png','/static/img/banner2.png','/static/img/banner3.png'],
				navs: [
					{
						icon: '/static/icon/nav_icon1.png',
						title: '掌上衣橱'
					},{
						icon: '/static/icon/nav_icon2.png',
						title: '线上发货专区'
					},{
						icon: '/static/icon/nav_icon3.png',
						title: '线下提货专区'
					}
				],
				timeList: [
					{
						src: '/static/img/time_img1.png',
						price: '99',
						num: 45
					},{
						src: '/static/img/time_img2.png',
						price: '76',
						num: 99
					},{
						src: '/static/img/time_img3.png',
						price: '60',
						num: 80
					}
				],
				recList: [
					{
						src: '/static/img/rec_img1.png',
						title: '乐町专卖店',
						city: '广州',
						area: '越秀区'
					},{
						src: '/static/img/rec_img2.png',
						title: '阿卡专卖店',
						city: '广州',
						area: '天河区'
					},{
						src: '/static/img/rec_img3.png',
						title: '波司登专卖店',
						city: '广州',
						area: '番禺区'
					}
				],
				popList: [
					{
						src: '/static/img/pop_img1.jpg',
						title: '女士连衣裙',
						price: '169'
					},{
						src: '/static/img/pop_img2.png',
						title: '女士纯羊毛衣',
						price: '169'
					},{
						src: '/static/img/pop_img3.png',
						title: '男士大衣',
						price: '329'
					}
				],
				recommdList:[
					{
						src: '/static/img/recommd_img1.png',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img2.png',
						title: '小领加绒衬衫',
						price: '159'
					},{
						src: '/static/img/recommd_img3.png',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img4.jpg',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img5.png',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img6.png',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img7.png',
						title: '男士皮质夹克',
						price: '1199'
					},{
						src: '/static/img/recommd_img8.png',
						title: '男士皮质夹克',
						price: '1199'
					}
				],
				loadingType: 'more'
			}
		},
		components:{
			uniNavBar,
			uniStatusBar,
			uniCountdown,
			uniLoadMore,
			fixedList
		},
		methods:{
			scanCode(){
				let that = this;
				// #ifndef H5
				uni.scanCode({
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
				    }
				})
				// #endif
			},
			clickNav(idx){
				if(idx == 0){
					
				}else if(idx == 1){
					uni.navigateTo({
						url: '/pages/index/online_area'
					})
				}else{
					uni.navigateTo({
						url: '/pages/index/offline_area'
					})
				}
			},
			toSearch(){
				uni.navigateTo({
					url: '/pages/index/search'
				})
			}
		},
		onHide() {
			this.isShow = false;
		}
	}
</script>

<style scoped lang="scss">
	.status_bar{
		background: #ff6600;
	}
	.index_scroll{
		height: calc(100vh - 95px);
	}
	.fixed_search_top{
		// position: fixed;
		width: 100%;
		height: 45px;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		// left: 0;
		// top: 0;
		background: $free-orange-text;
		z-index: 30;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.scan_icon{
			display: block;
			width: 40rpx;
			height: 40rpx;
		}
		.mess_icon{
			display: block;
			width: 48rpx;
			height: 48rpx;
		}
		view{
			width: 80%;
			color: #999;
			font-size: $free-fontsize;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: rgba(255,255,255,.7);
			height: 30px;
			padding: 0 20rpx;
			box-sizing: border-box;
			border-radius: 10rpx;
			.search_icon{
				display: block;
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
		}
		
	}
	.swiper-box{
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		position: relative;
		&:after{
			content: "";
			width: 100%;
			height: 230rpx;
			background: rgba(255,102,0,.8);
			position: absolute;
			left: 0;
			top: 0;
			border-bottom-left-radius: 150rpx;
			z-index: 1;
		}
		.swiper{
			position: relative;
			height: 300rpx;
			z-index: 5;
			image{
				display: block;
				width: 100%;
				height: 100% !important;
				border-radius: 10rpx;
			}
		}
	}
	.index_nav_box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 0 40rpx;
		view{
			width: 32%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			height: 214rpx;
			color: #fff;
			font-size: 28rpx;
			background: #f90;
			padding: 15rpx 0;
			box-sizing: border-box;
			&.yellow{
				background: #fc0;
			}
			image{
				display: block;
				width: 100rpx;
				height: 100rpx;
			}
			text{
				display: block;
				width: 100%;
				text-align: center;
			}
		}
	}
	.time_title{
		.countdown{
			margin-left: 20rpx;
		}
	}
	.time_goods_box{
		display: flex;
		justify-content: space-between;
		padding-bottom: 20rpx;
		.time_item{
			display: block;
			width: 32%;
			text-align: center;
			image{
				display: block;
				width: 100%;
				// height: 240rpx !important;
			}
			view{
				color: #f52f3e;
				font-size: 32rpx;
				margin: 10rpx 0 5rpx;
			}
			text{
				display: block;
				color: #999;
				font-size: 28rpx;
			}
		}
	}
	.shop_recommd_box{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		.rec_banner{
			display: block;
			width: 100%;
			margin: 0 0 15rpx;
		}
		.rec_goods_box{
			display: flex;
			justify-content: space-between;
			padding-bottom: 10rpx;
			.rec_item{
				width: 32%;
				color: #333;
				font-size: 28rpx;
				text-align: center;
				image{
					display: block;
					width: 100%;
					height: 260rpx !important;
				}
				.rec_title{
					margin: 10rpx 0;
				}
				.rec_address{
					color: #666;
					font-size: 24rpx;
					text{
						margin-left: 10rpx;
					}
				}
				.rec_price{
					color: #ff2a3a;
					font-size: 32rpx;
				}
			}
			&.pop{
				.rec_item{
					text-align: left;
					image{
						display: block;
						width: 100%;
						height: 214rpx !important;
					}
				}
			}
		}
	}
	.recommd_goods_box{
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		.recommd_item{
			width: 48%;
			margin-bottom: 30rpx;
			image{
				display: block;
				width: 100%;
			}
			.ri_title{
				color: #333;
				font-size: 28rpx;
				font-weight: bold;
				margin: 15rpx 0 5rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.ri_price{
				color: #ff2a3a;
				font-size: 32rpx;
			}
		}
	}
</style>

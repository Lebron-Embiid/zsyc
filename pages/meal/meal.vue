<template>
	<view class="meal">
		<view class="page_bg"></view>
		<uni-nav-bar title="我的套餐"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<!-- 购买套餐 -->
		<view class="meal_list">
			<view class="meal_item" :class="[currentTab==2?'gray':'']" v-for="(item,index) in mealList" :key="index">
				<view class="meal_top">
					<view class="meal_left"><text>{{item.price}}</text>元</view>
					<view class="meal_center">
						<view class="mc_title">{{item.title}}</view>
						<view class="mc_info">{{item.info}}</view>
					</view>
					<view class="meal_right">
						<button type="primary" v-if="currentTab==0" size="mini">立即选购</button>
						<button type="primary" v-if="currentTab==1" size="mini">立即使用</button>
					</view>
				</view>
				<view class="meal_bottom" :class="[item.is_show == true?'':'active']" @tap="changeTxt(index)">
					<view class="mb_left">全场通用：{{item.content}}</view>
					<image src="/static/icon/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				navbar:[{name:"购买套餐"},{name:"未使用"},{name:"已使用"}],
				currentTab:0,
				mealList: [
					{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					},{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					},{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
			},
			changeTxt(idx){
				this.mealList[idx].is_show = !this.mealList[idx].is_show;
			}
		}
	}
</script>

<style scoped lang="scss">
	.meal_list{
		padding: 30rpx;
		box-sizing: border-box;
		background: #eee;
		.meal_item{
			margin-bottom: 30rpx;
			color: #fff;
			font-size: 24rpx;
			.meal_top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 60rpx 40rpx 50rpx 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx 10rpx 0 0;
				background: #f08781 url('/static/icon/bg1.png') left bottom repeat-x;
				.meal_left{
					width: 32%;
					font-size: 40rpx;
					text{
						font-size: 56rpx;
						font-weight: bold;
						margin-right: 5rpx;
					}
				}
				.meal_center{
					width: 40%;
					.mc_title{
						font-size: 36rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}
				}
				.meal_right{
					width: 138rpx;
					button{
						width: 138rpx;
						font-size: 24rpx;
						padding: 0;
						margin: 0;
						color: #f08781;
						background: #f4dedd;
						&:after{
							border: 0;
						}
					}
				}
			}
			.meal_bottom{
				background: #d8676b;
				border-radius: 0 0 10rpx 10rpx;
				padding: 15rpx 30rpx 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.mb_left{
					width: 92%;
				}
				image{
					display: block;
					width: 16rpx !important;
					height: 28rpx !important;
					transform: rotate(-90deg);
				}
				&.active{
					.mb_left{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					image{
						transform: rotate(90deg);
					}
				}
			}
			&.gray{
				.meal_top{
					background: #dbdbdb url('/static/icon/bg.png') left bottom repeat-x;
				}
				.meal_bottom{
					background: #d3d3d3;
				}
			}
		}
	}
</style>

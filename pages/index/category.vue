<template>
	<view>
		<!-- 状态栏 -->
		<!-- <view class="status" :style="{position:headerPosition}"></view>
        <view class="header" :style="{position:headerPosition}">
			<view class="addr"><view class="icon location"></view>{{city}}</view>
			<view class="input-box">
				<input placeholder="默认关键字" placeholder-style="color:#c0c0c0;" @tap="toSearch()"/>
				<view class="icon search"></view>
			</view>
			<view class="icon-btn">
				<view class="icon tongzhi" @tap="toMsg"></view>
			</view>
		</view> -->
		<uni-nav-bar leftIcon="back" title="分类"></uni-nav-bar>
		<!-- 占位 -->
		<view class="category-list">
			<!-- 左侧分类导航 -->
			<scroll-view  scroll-y="true" class="left" >
                <view class="row" v-for="(category,index) in categoryList" :key="category.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.title}}
					</view>
				</view>
				
            </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="banner">
						<image :src="category.banner"></image>
					</view>
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
							<image :src="'/static/img/category/list/'+box.img"></image>
							<view class="text">{{box.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	//高德SDK
	// import amap from '@/common/SDK/amap-wx.js';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				showCategoryIndex:0,
				headerPosition:"fixed",
				city:"北京",
				//分类列表
				categoryList:[
					{id:1,title:'家用电器',banner:'/static/img/category/banner.jpg',list:[
						{name:'冰箱',	img:'1.jpg'},
						{name:'电视',	img:'2.jpg'},
						{name:'空调',	img:'3.jpg'},
						{name:'洗衣机',	img:'4.jpg'},
						{name:'风扇',	img:'5.jpg'},
						{name:'燃气灶',	img:'6.jpg'},
						{name:'热水器',	img:'7.jpg'},
						{name:'电吹风',	img:'8.jpg'},
						{name:'电饭煲',	img:'9.jpg'}
					]},
					{id:2,title:'办公用品',banner:'/static/img/category/banner.jpg',list:[
						{name:'打印机',	img:'1.jpg'},
						{name:'路由器',	img:'2.jpg'},
						{name:'扫描仪',	img:'3.jpg'},
						{name:'投影仪',	img:'4.jpg'},
						{name:'墨盒',	img:'5.jpg'},
						{name:'纸类',	img:'6.jpg'}
					]},
					{id:3,title:'日常用品',banner:'/static/img/category/banner.jpg',list:[
						{name:'茶具',	img:'1.jpg'},
						{name:'花瓶',	img:'2.jpg'},
						{name:'纸巾',	img:'3.jpg'},
						{name:'毛巾',	img:'4.jpg'},
						{name:'牙膏',	img:'5.jpg'},
						{name:'保鲜膜',	img:'6.jpg'},
						{name:'保鲜袋',	img:'7.jpg'}
					]},
					{id:4,title:'蔬菜水果',banner:'/static/img/category/banner.jpg',list:[
						{name:'苹果',	img:'1.jpg'},
						{name:'芒果',	img:'2.jpg'},
						{name:'椰子',	img:'3.jpg'},
						{name:'橙子',	img:'4.jpg'},
						{name:'奇异果',	img:'5.jpg'},
						{name:'玉米',	img:'6.jpg'},
						{name:'百香果',	img:'7.jpg'}
					]},
				]
			}
		},
		components:{
			uniNavBar
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		onLoad() {
			// this.amapPlugin = new amap.AMapWX({  
			// 	//高德地图KEY，随时失效，请务必替换为自己的KEY，参考：http://ask.dcloud.net.cn/article/35070
			// 	key: '7c235a9ac4e25e482614c6b8eac6fd8e'  
			// });
			// //定位地址
			// this.amapPlugin.getRegeo({  
			// 	success: (data) => {
			// 		this.city = data[0].regeocodeData.addressComponent.city.replace(/市/g,'');//把"市"去掉
			// 	}  
			// }); 
		},
		methods: {
			//消息列表
			toMsg(){
				uni.navigateTo({
					url:'../../msg/msg'
				})
			},
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			toCategory(e){
				uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid='+e.id+'&name='+e.name
				});
			},
			//搜索跳转
			toSearch(){
				uni.showToast({title: "建议跳转到新页面做搜索功能"});
			}
		}
	}
</script>
<style lang="scss">

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
		
	}

	.header{
		width: 92%;
		padding: 0 4%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		
		.addr{
			width: 120rpx;
			height: 60rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			.icon{
				height: 60rpx; 
				margin-right: 5rpx;
				display: flex;
				align-items: center;
				font-size: 42rpx;
				color: #ffc50a;
			}
		}
		.input-box{
			width: 100%;
			height: 60rpx;
			background-color: #f5f5f5;
			border-radius: 30rpx;
			position: relative;
			display: flex;
			align-items: center;
			.icon{
				display: flex;
				align-items: center;
				position: absolute;
				top:0;
				right: 0;
				width: 60rpx;
				height: 60rpx;
				font-size: 34rpx;
				color: #c0c0c0;
			}
			input{
				padding-left: 28rpx;
				height: 28rpx;
				font-size: 28rpx;
			}
		}
		.icon-btn{
			width: 60rpx;
			height: 60rpx;
			flex-shrink: 0;
			display: flex;
			.icon{
				width: 60rpx;
				height: 60rpx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42rpx;
			}
		}
	}
	.place{
		
		background-color: #ffffff;
		height: 44px;
	}
	.category-list{
		width: 100%;
		background-color: #fff;
		display: flex;
		.left,.right{
			position: absolute;
			
			top: 44px;
			/*  #ifdef  APP-PLUS  */
			top: calc(44px + var(--status-bar-height));
			/*  #endif  */
			bottom: 0rpx;
		}
		.left{
			width: 24%;
			left: 0rpx;
			background-color: #f2f2f2;
			.row{
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				.text{
					width: 100%;
					position: relative;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					color: #3c3c3c;
					.block{
						position: absolute;
						width: 0rpx;
						left: 0;
					}
				}
				&.on{
					background-color: #fff;
					.text{
						font-size: 30rpx;
						font-weight: 600;
						color: #ff0036;
						.block{
							width: 10rpx;
							height: 80%;
							top: 10%;
							background-color: #ff0036;
						}
					}
				}
			}
		}
		.right{
		   width: 76%;
			left: 24%;
			.category{
				width: 94%;
				padding: 20rpx 3%;
				.banner{
					width: 100%;
					height: 24.262vw;
					border-radius: 10rpx;
					overflow: hidden;
					box-shadow: 0rpx 5rpx 20rpx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 24.262vw;
					}
				}
				.list{
					margin-top: 40rpx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image{
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}
						.text{
							margin-top: 5rpx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}

</style>

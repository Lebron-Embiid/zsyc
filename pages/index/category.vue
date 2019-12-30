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
                <view class="row" v-for="(category,index) in categoryNavs" :key="category.id" :class="[index==showCategoryIndex?'on':'']" @tap="showCategory(index)">
					<view class="text">
						<view class="block"></view>
						{{category.name}}
					</view>
				</view>
				
            </scroll-view>
			<!-- 右侧子导航 -->
			<scroll-view  scroll-y="true" class="right" >
			    <view class="category" v-for="(category,index) in categoryNavs" :key="category.id" v-show="index==showCategoryIndex" >
					<view class="banner">
						<image :src="category.image"></image>
					</view>
					<view class="list_box" v-for="(item,idx) in categoryList" :key="idx">
						<view class="list_title">{{item.mobile_name}}</view>
						<view class="list">
							<view class="box" v-for="(box,i) in item.sub_category" :key="i" @tap="toCategory(box.id,item.id,index)">
								<image :src="box.image"></image>
								<view class="text">{{box.mobile_name}}</view>
							</view>
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
				cate_id: '',
				showCategoryIndex:0,
				headerPosition:"fixed",
				city:"北京",
				//分类列表
				categoryNavs: [],
				categoryList:[],
				url: ''
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
			this.url = this.$http.url;
			
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getGoodsCategoryList(params).then((data)=>{
				this.categoryNavs = data.data.result;
				this.cate_id = data.data.result[0].id;
				console.log(this.cate_id);
				
				let params1 = {parent_id: this.cate_id};
				let sign1 = this.$sign.getSign(params1,this.AppSecret);
				params1.sign = sign1;
				this.$http.getGoodsSecAndThirdCategoryList(params1).then((data)=>{
					this.categoryList = data.data.result;
				})
			})
			
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
			// toMsg(){
			// 	uni.navigateTo({
			// 		url:'../../msg/msg'
			// 	})
			// },
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
				this.cate_id = this.categoryNavs[index].id;
				console.log(this.cate_id);
				let params = {parent_id: this.cate_id};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getGoodsSecAndThirdCategoryList(params).then((data)=>{
					this.categoryList = data.data.result;
				})
			},
			toCategory(cid,id,index){
				// uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '/pages/index/recommend?cid='+cid+'&index='+index
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
				.list_box{
					margin-top: 30rpx;
					width: 100%;
					.list_title{
						font-size: 28rpx;
						color: #999;
						padding-left: 30rpx;
						margin-bottom: 30rpx;
					}
					.list{
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
	}

</style>

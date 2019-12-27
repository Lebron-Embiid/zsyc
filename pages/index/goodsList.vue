<template>
	<view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		
		<!-- <view class="header">
			<view class="target" v-for="(target,index) in orderbyList" @tap="select(index)" :key="index" :class="[target.selected?'on':'']">
				{{target.text}}
				<view v-if="target.orderbyicon" class="icon" :class="target.orderbyicon[target.orderby]"></view>
			</view>
		</view> -->
		<!-- 占位 -->
		<!-- <view class="place"></view> -->
		<!-- 商品列表 -->
		<scroll-view scroll-y="true" class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id" @tap="toGoods(goods)">
					<image mode="widthFix" :src="url+goods.pic"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">${{goods.price}}<text>${{goods.old_price}}</text></view>
						<!-- <view class="slogan">{{goods.slogan}}</view> -->
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				id: '',
				title: '商品列表',
				goodsList:[],
				loadingType: 'more',
				headerTop:"44px",
				headerPosition:"fixed",
				// orderbyList:[
				// 	{text:"销量",selected:true,orderbyicon:false,orderby:0},
				// 	{text:"价格",selected:false,orderbyicon:['sheng','jiang'],orderby:0},
				// 	{text:"好评",selected:false,orderbyicon:false,orderby:0}
				// ],
				orderby:"sheng",
				url: '',
				page: 1,
				type: 1
			};
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad: function (option) { 
			this.url = this.$http.url;
			//option为object类型，会序列化上个页面传递的参数
			// console.log(option.cid); //打印出上个页面传递的参数。
			if(option.name != undefined){
				this.title = option.name;
			}
			if(option.cid != undefined){
				this.id = option.cid;
			}
			if(option.ctype != undefined){
				this.type = option.ctype;
			}
			// 热门商品
			if(this.type == 3){
				console.log('热门商品');
				this.$http.getStoreMend({
					is_hot: 1,
					page: this.page,
					limit: 10
				}).then((data)=>{
					if(this.goodsList.length < 10){
						this.loadingType = 'noMore';
					}
					this.goodsList = data.data.list;
				})
			}
			// 推荐商品
			else if(this.type == 4){
				console.log('推荐商品');
				this.$http.getStoreMend({
					is_res: 1,
					page: this.page,
					limit: 10
				}).then((data)=>{
					if(this.goodsList.length < 10){
						this.loadingType = 'noMore';
					}
					this.goodsList = data.data.list;
				})
			}
			// 分类商品
			else{
				console.log('分类商品');
				console.log(this.id);
				this.$http.getStoreMend({
					c_id: this.id,
					page: this.page,
					limit: 10
				}).then((data)=>{
					if(this.goodsList.length < 10){
						this.loadingType = 'noMore';
					}
					this.goodsList = data.data.list;
				})
			}
			// uni.setNavigationBarTitle({
			// 	title: option.name
			// });
			
			//兼容H5下排序栏位置
			// #ifdef H5
				//定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
				let Timer = setInterval(()=>{
					let uniHead = document.getElementsByTagName('uni-page-head');
					if(uniHead.length>0){
						this.headerTop = uniHead[0].offsetHeight+'px';
						clearInterval(Timer);//清除定时器
					}
				},1);
			// #endif
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(()=>{
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom(){
			this.page++;
			// 热门
			if(this.type == 3){
				this.$http.getStoreMend({
					is_hot: 1,
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = 'loading';
					if(data.data.list.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.goodsList = this.goodsList.concat(data.data.list);
				})
			}else if(this.type == 4){
				this.$http.getStoreMend({
					is_res: 1,
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = 'loading';
					if(data.data.list.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.goodsList = this.goodsList.concat(data.data.list);
				})
			}else{
				this.$http.getStoreMend({
					c_id: this.id,
					page: this.page,
					limit: 10
				}).then((data)=>{
					this.loadingType = 'loading';
					if(data.data.list.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.goodsList = this.goodsList.concat(data.data.list);
				})
			}
		},
		methods:{
			//商品跳转
			toGoods(e){
				uni.navigateTo({
					url: '/pages/index/detail?cid=' + e.id+'&name='+e.name
				});
			},
			//排序类型
			select(index){
				let tmpTis = this.orderbyList[index].text+"排序 "
				if(this.orderbyList[index].orderbyicon){
					let type = this.orderbyList[index].orderby==0?'升序':'降序';
					if(this.orderbyList[index].selected){
						type = this.orderbyList[index].orderby==0?'降序':'升序';
						this.orderbyList[index].orderby = this.orderbyList[index].orderby==0?1:0;
					}
					tmpTis+=type
				}
				this.orderbyList[index].selected = true;
				let len = this.orderbyList.length;
				for(let i=0;i<len;i++){
					if(i!=index){
						this.orderbyList[i].selected = false;
					}
				}
				uni.showToast({title:tmpTis,icon:"none"});
			}
		}
		
	}
</script>

<style scoped lang="scss">
	.icon {
		font-size:26rpx;
	}
	.header{
		width: 92%;
		padding: 0 4%;
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		// position: fixed;
		// top: 44px;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1rpx #eee;
		margin-bottom: 30rpx;
		.target{
			width: 20%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #aaa;
			&.on{
				color: #555;
				border-bottom: 4rpx solid #1abc9c;
				font-weight: 600;
				font-size: 30rpx;
			}
		}
	}
.place{
		
		background-color: #ffffff;
		height: 100rpx;

	}
.goods-list{
	padding: 30rpx 0 10rpx;
	box-sizing: border-box;
	// height: 85vh;
		.loading-text{
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60rpx;
			color: #979797;
			font-size: 24rpx;
		}
		.product-list{
			width: 92%;
			padding: 0 4% 3vw 4%; 
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.product{
				width: 48%;
				border-radius: 20rpx;
				background-color: #fff;
				margin: 0 0 15rpx 0;
				box-shadow: 0rpx 5rpx 25rpx rgba(0,0,0,0.1);
				image{
					width: 100%;
					height: 320rpx;
					border-radius: 20rpx 20rpx 0 0;
				}
				.name{
					width: 92%;
					padding: 0 4%;
					font-size: 30rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.info{
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10rpx 4% 10rpx 4%;
					
					.price{
						color: #e65339;
						font-size: 30rpx;
						font-weight: 600;
						text{
							color: #ccc;
							font-size: 22rpx;
							text-decoration: line-through;
							margin-left: 20rpx;
							font-weight: normal;
						}
					}
					.slogan{
						color: #807c87;
						font-size: 24rpx;
					}
				}
			}
			
		}
	}
</style>

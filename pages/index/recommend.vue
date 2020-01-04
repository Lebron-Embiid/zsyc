<template>
	<view class="recommend">
		<uni-nav-bar left-icon="back" title="精选推荐"></uni-nav-bar>
		<scroll-view scroll-x="true" class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index,item.id)">{{item.name}}</view>
		</scroll-view>
		<view class="filter_nav_box">
			<view class="filter_nav_item" @tap="changeSortOne">
				<text>综合</text>
				<image class="icon" v-if="sort_one == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_one == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortTwo">
				<text>销量</text>
				<image class="icon" v-if="sort_two == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_two == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortThree">
				<text>新品</text>
				<image class="icon" v-if="sort_three == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_three == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSort">
				<text>价格</text>
				<view v-if="sort_type == 0">
					<image class="icon rotate" :src="down_icon_on" mode="widthFix"></image>
					<image class="icon" :src="down_icon" mode="widthFix"></image>
				</view>
				<view v-if="sort_type == 1">
					<image class="icon rotate" :src="down_icon" mode="widthFix"></image>
					<image class="icon" :src="down_icon_on" mode="widthFix"></image>
				</view>
				<view v-if="sort_type == null">
					<image class="icon rotate" :src="down_icon" mode="widthFix"></image>
					<image class="icon" :src="down_icon" mode="widthFix"></image>
				</view>
			</view>
			<view class="filter_nav_item" @tap="changeListType">
				<image class="list_icon" src="/static/icon/list.png" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="offline_scroll">
			<view class="offline_box" :class="[changeList == 1?'list':'']">
				<view class="offline_item" @tap="toDetail(item.goods_id)" v-for="(item,index) in recommendList" :key="index">
					<image :src="url+item.original_img" mode="widthFix"></image>
					<view class="off_box">
						<view class="off_title">{{item.goods_name}}</view>
						<view class="off_coupon">{{item.shop_price}}</view>
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
	export default{
		data(){
			return{
				id: 0,
				city: '深圳',
				loadingType: 'more',
				down_icon_on: '/static/icon/down1.png',
				down_icon: '/static/icon/down.png',
				recommendList: [],
				navbar:[{name:"精选"},{name:"上新"},{name:"达人"},{name:"衣装"}],
				currentTab: null,
				sort_one: 0,
				sort_two: 0,
				sort_three: 0,
				sort_type: null,
				changeList: 0,
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		methods:{
			navbarTap(e,id){
				console.log(e)
				this.currentTab = e;
				this.id = id;
				let params = {
					id: this.id,
					sort: 'goods_id',
					sort_asc: 'desc'
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getGoodsList(params).then((data)=>{
					this.recommendList = data.data.result.goods_list;
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?cid='+id
				})
			},
			changeSortOne(){
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_type = null;
				if(this.sort_one == 0){
					this.sort_one = 1;
					let params = {
						id: this.id,
						sort: 'goods_id',
						sort_asc: 'desc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}else{
					this.sort_one = 0;
				}
			},
			changeSortTwo(){
				this.sort_one = 0;
				this.sort_three = 0;
				this.sort_type = null;
				if(this.sort_two == 0){
					this.sort_two = 1;
					let params = {
						id: this.id,
						sort: 'sales_sum',
						sort_asc: 'desc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}else{
					this.sort_two = 0;
				}
			},
			changeSortThree(){
				this.sort_two = 0;
				this.sort_one = 0;
				this.sort_type = null;
				if(this.sort_three == 0){
					this.sort_three = 1;
					let params = {
						id: this.id,
						sort: 'is_new',
						sort_asc: 'desc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}else{
					this.sort_three = 0;
				}
			},
			changeSort(){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				if(this.sort_type == null){
					this.sort_type = 0;
					let params = {
						id: this.id,
						sort: 'shop_price',
						sort_asc: 'asc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}else if(this.sort_type == 0){
					this.sort_type = 1;
					let params = {
						id: this.id,
						sort: 'shop_price',
						sort_asc: 'desc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}else{
					this.sort_type = 0;
					let params = {
						id: this.id,
						sort: 'shop_price',
						sort_asc: 'asc'
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getGoodsList(params).then((data)=>{
						this.recommendList = data.data.result.goods_list;
					})
				}
			},
			changeListType(){
				if(this.changeList == 0){
					this.changeList = 1;
				}else{
					this.changeList = 0;
				}
			}
		},
		onLoad(opt) {
			this.url = this.$http.url;
			
			if(opt.cid != undefined){
				this.id = opt.cid;
				this.currentTab = opt.index;
			}
			
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getGoodsCategoryList(params).then((data)=>{
				this.navbar = data.data.result;
			})
			
			let params1 = {
				id: this.id,
				sort: 'is_hot',
				sort_asc: 'desc'
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.getGoodsList(params1).then((data)=>{
				this.recommendList = data.data.result.goods_list;
			})
		},
		onShow() {
			let that = this;
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					console.log(res);
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					// that.city = res.address;
			    }
			})
		}
	}
</script>

<style scoped lang="scss">
	.list_nav{
		white-space: nowrap;
		justify-content: flex-start;
		view{
			width: 150rpx;
			display: inline-block;
		}
	}
	.fixed_box{
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		color: #666;
		font-size: 28rpx;
		padding: 15rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		image{
			display: block;
			width: 34rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
	}
	.filter_nav_box{
		background: #fafafa;
		padding: 10rpx;
		box-sizing: border-box;
		height: 90rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #eee;
		.filter_nav_item{
			color: #666;
			font-size: 32rpx;
			background: #fdfdfd;
			width: 140rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			text{
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 70%;
				text-align: center;
			}
			.icon{
				display: block;
				width: 16rpx;
				height: 10rpx;
				margin-left: 10rpx;
				&.rotate{
					transform: rotate(180deg);
					margin-bottom: 6rpx;
				}
			}
			.list_icon{
				display: block;
				width: 36rpx;
				height: 36rpx;
			}
		}
	}
	.offline_scroll{
		height: 79vh;		
	}
	.offline_box{
		padding: 30rpx 30rpx 0;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		.offline_item{
			display: block;
			width: 48%;
			margin-bottom: 20rpx;
			text-align: center;
			image{
				display: block;
				width: 100%;
				height: 330rpx !important;
			}
			.off_title{
				color: #333;
				font-size: 32rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 10rpx 0;
			}
			.off_coupon{
				color: #f00;
				font-size: 28rpx;
			}
		}
		&.list{
			padding: 10rpx 0 0;
			.offline_item{
				width: 100%;
				padding: 20rpx 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				margin-bottom: 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				&:active{
					background: #eee;
				}
				image{
					width: 140rpx;
					height: 140rpx !important;
					margin-right: 30rpx;
				}
				.off_box{
					width: 60%;
					text-align: left;
				}
			}
		}
	}
</style>

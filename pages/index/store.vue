<template>
	<view class="store">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="store_box">
			<image :src="url+storeInfo.store_logo" mode="widthFix"></image>
			<view class="store_info">
				<view class="si_title">{{storeInfo.store_name}}</view>
				<view class="si_phone">{{storeInfo.store_phone}}</view>
				<view class="si_address">地址：{{storeInfo.location}}{{storeInfo.store_address}}</view>
			</view>
		</view>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view class="online_box" scroll-x="true" v-if="currentTab == 0">
			<view class="online_item_box" v-for="(item,index) in onlineList" :key="index">
				<view class="online_item" @tap="changeOnline(index,item.setmeal_id)" :class="[current==index?'active':'']">
					<view class="oi_title">{{item.setmeal_name}}</view>
					<!-- <view class="oi_status">{{item.status}}</view> -->
				</view>
			</view>
		</scroll-view>
		<view class="online_content" v-if="currentTab == 0">
			<view class="content_item" v-for="(item,index) in contentList" :key="index">
				<image :src="url+item.original_img" mode="widthFix"></image>
				<view class="ci_center">
					<view class="ci_title">{{item.goods_name}}</view>
					<!-- <view class="ci_type">品类：{{item.type}}</view> -->
					<view class="ci_car" style="color: #f00;font-size: 28rpx;margin: 30rpx 0 20rpx;"> <!-- 购物车： -->￥{{item.shop_price}}</view>
					<view class="ci_box">
						<view class="ci_num">
							<view class="text">库存<text>{{item.store_count}}</text>件</view>
							<view class="process" :style="{width: item.process+'%'}"></view>
						</view>
						<button type="primary" @tap.stop="toDetail(item.goods_id,current)" size="mini">马上抢</button>
					</view>
				</view>
			</view>
		</view>
		<view class="discount_box" v-if="currentTab == 1">
			<view class="discount_item" @tap="toDetail(item.goods_id)" v-for="(item,index) in discountList" :key="index">
				<image :src="url+item.original_img" mode="widthFix"></image>
				<view class="dis_title">{{item.goods_name}}</view>
				<view class="dis_price">￥{{item.shop_price}}</view>
			</view>
		</view>
		<block v-if="currentTab == 0">
			<fixed-list :list="fixedList" @selectMeal="changeMeal"></fixed-list>
		</block>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import fixedList from "@/components/fixedList.vue"
	export default{
		data(){
			return{
				id: '',
				title: '',
				navbar: [{name: '套餐'},{name: '折扣区'}],
				currentTab: 0,
				current: 0,
				storeInfo: {},
				fixedList: [],
				onlineList: [],
				contentList: [
					// {
					// 	id: 1,
					// 	src: '/static/img/online_img1.png',
					// 	title: '白鸭绒羽绒服',
					// 	type: '大衣',
					// 	car: '未选',
					// 	num: 198,
					// 	process: 50
					// }
				],
				discountList: [
					// {
					// 	id: 1,
					// 	pic: '/static/img/online_img1.png',
					// 	title: '女装黑主流',
					// 	price: '45.5'
					// }
				],
				loadingType: 'more',
				page: 1,
				url: '',
				setmeal_id: '',
				us_id: ''
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
			fixedList
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.id = opt.id;
			}
			this.url = this.$http.url;
			if(opt.us_id != undefined){
				this.setmeal_id = opt.setmeal_id;
				this.us_id = opt.us_id;
				this.current = opt.current;
			}
			
			let params2 = {
				token: uni.getStorageSync('token'),
				store_id: this.id
			};
			let sign2 = this.$sign.getSign(params2,this.AppSecret);
			params2.sign = sign2;
			this.$http.getStoreAbout(params2).then((data)=>{
				this.storeInfo = data.data.result;
				this.title = data.data.result.store_name;
			})
			
			let params1 = {
				token: uni.getStorageSync('token')
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			console.log(uni.getStorageSync('token'));
			this.$http.getCombo(params1).then((data)=>{
				this.onlineList = data.data.result.result;
				
				if(this.us_id == ''){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						setmeal_id: this.onlineList[this.current].setmeal_id
					}
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						setmeal_id: this.setmeal_id
					}
				}
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setThezone(params).then((data)=>{
					this.contentList = data.data.result.dataList;
					this.fixedList = [];
					for(let i in data.data.result.cate){
						let res = data.data.result.cate;
						this.fixedList.push({
							setmeal_id: res[i].id,
							setmeal_name: res[i].name
						})
					}
				})
			})
			
			let params = {
				token: uni.getStorageSync('token'),
				store_id: this.id
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getStoreGoods(params).then((data)=>{
				this.contentList = data.data.result.dataList;
				this.fixedList = [];
				for(let i in data.data.result.cate){
					let res = data.data.result.cate;
					this.fixedList.push({
						setmeal_id: res[i].id,
						setmeal_name: res[i].name
					})
				}
				console.log(this.fixedList);
			})
		},
		methods:{
			navbarTap(idx){
				this.currentTab = idx;
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						store_id: this.id,
						page: 0,
						limit: 10,
						type: 1
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getStoreGoods(params).then((data)=>{
						this.contentList = data.data.result.dataList;
						this.fixedList = [];
						for(let i in data.data.result.cate){
							let res = data.data.result.cate;
							this.fixedList.push({
								setmeal_id: res[i].id,
								setmeal_name: res[i].name
							})
						}
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						store_id: this.id,
						page: 0,
						limit: 10,
						type: 2
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getStoreGoods(params).then((data)=>{
						this.discountList = data.data.result.dataList;
					})
				}
			},
			changeOnline(idx,id){
				this.current = idx;
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10,
					setmeal_id: id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setThezone(params).then((data)=>{
					this.contentList = data.data.result.dataList;
					this.fixedList = [];
					for(let i in data.data.result.cate){
						let res = data.data.result.cate;
						this.fixedList.push({
							setmeal_id: res[i].id,
							setmeal_name: res[i].name
						})
					}
				})
			},
			changeMeal(index){
				console.log(index);
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10,
					setmeal_id: this.onlineList[this.current].setmeal_id,
					us_cat_id: this.fixedList[index].setmeal_id
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setThezone(params).then((data)=>{
					this.contentList = data.data.result.dataList;
					this.fixedList = [];
					for(let i in data.data.result.cate){
						let res = data.data.result.cate;
						this.fixedList.push({
							setmeal_id: res[i].id,
							setmeal_name: res[i].name
						})
					}
				})
			},
			toMealDetail(){
				uni.navigateTo({
					url: '/pages/meal/meal?type=off&current='+this.current
				})
			},
			toDetail(id,idx){
				uni.navigateTo({
					url: '/pages/index/detail?type=off&cid='+id+'&idx='+idx+'&us_id='+this.us_id
				})
			}
		},
		onReachBottom() {
			this.page++;
			if(this.currentTab == 0){
				let params = {
					token: uni.getStorageSync('token'),
					store_id: this.id,
					page: this.page,
					limit: 10,
					type: 1
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getStoreGoods(params).then((data)=>{
					if(data.data.result.dataList.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.contentList = this.contentList.concat(data.data.result.dataList);
				})
			}else{
				let params = {
					token: uni.getStorageSync('token'),
					store_id: this.id,
					page: this.page,
					limit: 10,
					type: 2
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.getStoreGoods(params).then((data)=>{
					if(data.data.result.dataList.length == 0){
						this.loadingType = 'noMore';
						return;
					}
					this.discountList = this.discountList.concat(data.data.result.dataList);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.store_box{
		background: #f60;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #eee;
		image{
			display: block;
			width: 250rpx;
			height: 100%;
			margin-right: 40rpx;
		}
		.store_info{
			width: 55%;
			color: #ff0;
			font-size: 32rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			padding: 40rpx 0;
			.si_title,.si_phone{
				width: 100%;
			}
			.si_address{
				width: 100%;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
	.discount_box{
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		flex-wrap: wrap;
		padding: 30rpx;
		box-sizing: border-box;
		background: #eee;
		.discount_item{
			width: 48%;
			margin-bottom: 30rpx;
			image{
				display: block;
				width: 100%;
				height: 310rpx !important;
				margin: 0 auto;
			}
			.dis_title{
				color: #333;
				font-size: 28rpx;
				font-weight: bold;
				margin: 20rpx 0 10rpx;
			}
			.dis_price{
				color: #ff2a3a;
				font-size: 32rpx;
			}
		}
	}
	.online_box{
		white-space: nowrap;
		background: #eee;
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
</style>

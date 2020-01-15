<template>
	<view class="online_area">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="线上发货专区"></uni-nav-bar>
		<image class="banner" src="/static/img/online_banner.jpg" mode="widthFix"></image>
		<scroll-view class="online_box" scroll-x="true" >
			<view class="online_item_box" v-for="(item,index) in onlineList" :key="index">
				<view class="online_item" @tap="changeOnline(index,item.setmeal_id)" :class="[current==index?'active':'']">
					<view class="oi_title">{{item.setmeal_name}}</view>
					<!-- <view class="oi_status">{{item.status}}</view> -->
				</view>
			</view>
		</scroll-view>
		<view class="online_content">
			<view class="content_item" v-for="(item,index) in contentList" :key="index">
				<image :src="url+item.original_img" mode="widthFix"></image>
				<view class="ci_center">
					<view class="ci_title">{{item.goods_name}}</view>
					<view class="ci_type"><!-- 品类： -->{{item.goods_remark}}</view>
					<!-- <view class="ci_car">购物车：{{item.car}}</view> -->
					<view class="ci_box">
						<view class="ci_num">
							<view class="text">库存<text>{{item.store_count}}</text>件</view>
							<view class="process" :style="{width: item.process+'%'}"></view>
						</view>
						<button type="primary" @tap="toDetail(item.goods_id,current)" size="mini">马上抢</button>
					</view>
				</view>
			</view>
		</view>
		<!-- <uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more> -->
		<fixed-list :list="fixedList" @selectMeal="changeMeal"></fixed-list>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import fixedList from "@/components/fixedList.vue"
	export default{
		data(){
			return{
				fixedList: [],
				onlineList: [
					// {
					// 	title: '女士套餐',
					// 	status: '火热抢购'
					// },{
					// 	title: '男士套餐',
					// 	status: '抢购中'
					// },{
					// 	title: '儿童套餐',
					// 	status: '甄选中'
					// },{
					// 	title: '高级套餐',
					// 	status: '即将开始'
					// },{
					// 	title: '尊享套餐',
					// 	status: '即将开始'
					// }
				],
				setmeal_id: '',
				us_id: '',
				current: 0,
				contentList: [
					// {
					// 	id: 1,
					// 	src: '/static/img/online_img1.png',
					// 	title: '白鸭绒羽绒服',
					// 	type: '大衣',
					// 	car: '未选',
					// 	num: 198,
					// 	process: 50
					// },{
					// 	id: 2,
					// 	src: '/static/img/online_img2.png',
					// 	title: '宽松长袖毛衣针织衫',
					// 	type: '毛衣',
					// 	car: '已选',
					// 	num: 198,
					// 	process: 50
					// }
				],
				loadingType: 'more',
				page: 1,
				url: ''
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
			fixedList
		},
		onLoad(opt) {
			this.url = this.$http.url;
			if(opt.us_id != undefined){
				this.setmeal_id = opt.setmeal_id;
				this.us_id = opt.us_id;
				this.current = opt.current;
				console.log(opt);
			}
			
			let params1 = {
				token: uni.getStorageSync('token')
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			console.log(uni.getStorageSync('token'));
			this.$http.getCombo(params1).then((data)=>{
				this.onlineList = data.data.result.result;
				let params = {};
				if(this.us_id == ''){
					params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						setmeal_id: this.onlineList[this.current].setmeal_id
					}
				}else{
					params = {
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
		},
		methods:{
			changeMeal(index){
				console.log(index);
				let params = {
					token: uni.getStorageSync('token'),
					page: 1,
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
			changeOnline(idx,id){
				this.current = idx;
				let params = {
					token: uni.getStorageSync('token'),
					page: 1,
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
			toMeal(){
				uni.navigateTo({
					url: '/pages/meal/meal?type=on&current='+this.current
				})
			},
			toDetail(id,idx){
				console.log(this.us_id);
				uni.navigateTo({
					url: '/pages/index/detail?type=on&cid='+id+'&idx='+idx+'&us_id='+this.us_id
				})
			}
		},
		onReachBottom() {
			this.page++;
			// let params = {
			// 	token: uni.getStorageSync('token'),
			// 	article_id: this.id,
			// 	page: this.page,
			// 	limit: 10
			// };
			// let sign = this.$sign.getSign(params,this.AppSecret);
			// params.sign = sign;
			// this.$http.getCommentList(params).then((data)=>{
				// if(data.data.result.length == 0){
				// 	this.loadingType = 'noMore';
				// 	return;
				// }
			// 	this.commentsList = this.commentsList.concat(data.data.result);
			// })
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

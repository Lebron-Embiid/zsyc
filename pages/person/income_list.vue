<template>
	<view class="income_list">
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<view class="filter_nav_box">
			<view class="filter_nav_item" @tap="changeSortOne">
				<text>全部</text>
				<image class="icon" v-if="sort_one == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_one == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<picker @change="bindLevelChange" :range="levels">
				<view class="filter_nav_item" @tap="changeSortTwo">
					<text>级别</text>
					<image class="icon" v-if="sort_two == 0" :src="down_icon" mode="widthFix"></image>
					<image class="icon" v-if="sort_two == 1" :src="down_icon_on" mode="widthFix"></image>
				</view>
			</picker>
			<view class="filter_nav_item" @tap="changeSortThree">
				<text>年份</text>
				<image class="icon" v-if="sort_three == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_three == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortFour">
				<text>月份</text>
				<image class="icon" v-if="sort_four == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_four == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			<view class="filter_nav_item" @tap="changeSortFive">
				<text>日期</text>
				<image class="icon" v-if="sort_five == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_five == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view scroll-y="true" class="income_scroll">
			<view class="income_list_box" v-if="currentTab == 0">
				<view class="income_title">本月</view>
				<view class="income_list_item">
					<view class="item_left">
						<view class="ili_title">分享会员 小贾</view>
						<view class="ili_time">2018.10.22</view>
					</view>
					<view class="item_center">分享</view>
					<view class="item_right">+9000</view>
				</view>
			</view>
			<view class="income_list_box" v-if="currentTab == 1">
				<!-- <view class="income_title">本月</view> -->
				<view class="income_list_item" v-for="(item,index) in teamList" :key="index">
					<view class="item_left">
						<view class="ili_title">{{item.mobile}}</view>
						<view class="ili_time">{{util.formatDate1(item.reg_time)}}</view>
					</view>
					<view class="item_right" style="font-size: 28rpx;">{{item.level_name}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				navbar:[{name: '分享收益'},{name: '我的会员'}],
				currentTab:0,
				down_icon_on: '/static/icon/down1.png',
				down_icon: '/static/icon/down.png',
				title: '分享会员收益',
				type: '',
				levels: ["会员"],
				sort_one: 0,
				sort_two: 0,
				sort_three: 0,
				sort_four: 0,
				sort_five: 0,
				page: 0,
				util: '',
				teamList: []
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.util = util;
			if(opt.name != undefined){
				this.title = opt.name;
				this.type = opt.type;
			}
			let params = {
				token: uni.getStorageSync('token'),
				page: 0,
				limit: 10,
				type: opt.type
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.rewardListData(params).then((data)=>{
				
			})
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token')
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.getReward(params).then((data)=>{
						
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.myTeam(params).then((data)=>{
						this.teamList = data.data.result;
						// new Date(parseInt(date)*1000).date.getMonth() + 1
					})
				}
			},
			bindLevelChange(e){
				console.log(e.detail.value);
			},
			changeSortOne(){
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				if(this.sort_one == 0){
					this.sort_one = 1;
					// let params = {
					// 	id: this.id,
					// 	sort: 'goods_id',
					// 	sort_asc: 'desc'
					// };
					// let sign = this.$sign.getSign(params,this.AppSecret);
					// params.sign = sign;
					// this.$http.getGoodsList(params).then((data)=>{
					// 	this.recommendList = data.data.result.goods_list;
					// })
				}else{
					this.sort_one = 0;
				}
			},
			changeSortTwo(){
				this.sort_one = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				if(this.sort_two == 0){
					this.sort_two = 1;
				}else{
					this.sort_two = 0;
				}
			},
			changeSortThree(){
				this.sort_two = 0;
				this.sort_one = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				if(this.sort_three == 0){
					this.sort_three = 1;
				}else{
					this.sort_three = 0;
				}
			},
			changeSortFour(){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_five = 0;
				if(this.sort_four == 0){
					this.sort_four = 1;
				}else{
					this.sort_four = 0;
				}
			},
			changeSortFive(){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				if(this.sort_five == 0){
					this.sort_five = 1;
				}else{
					this.sort_five = 0;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
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
	.income_scroll{
		height: 79vh;
		.income_list_box{
			.income_title{
				color: #999;
				font-size: 28rpx;
				background: #eee;
				padding: 10rpx 30rpx;
				box-sizing: border-box;
			}
			.income_list_item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 30rpx;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				.item_left{
					width: 40%;
					.ili_title{
						color: #333;
						font-size: 32rpx;
						margin-bottom: 10rpx;
					}
					.ili_time{
						color: #999;
						font-size: 24rpx;
					}
				}
				.item_center{
					color: #333;
					font-size: 28rpx;
				}
				.item_right{
					color: #333;
					font-size: 36rpx;
				}
			}
		}
	}
</style>

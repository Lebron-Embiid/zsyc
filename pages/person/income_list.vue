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
			 <!-- @tap="changeSortTwo" -->
			<picker :range="levels" @change="bindLevelChange">
				<view class="filter_nav_item">
					<text>{{level_txt}}</text>
					<image class="icon" v-if="sort_two == 0" :src="down_icon" mode="widthFix"></image>
					<image class="icon" v-if="sort_two == 1" :src="down_icon_on" mode="widthFix"></image>
				</view>
			</picker>
			 <!-- @tap="changeSortThree" -->
			<picker mode="date" :start="startDate" :end="endDate" fields="year" @change="bindYearChange">
			<view class="filter_nav_item">
				<text>{{year_txt}}</text>
				<image class="icon" v-if="sort_three == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_three == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			</picker>
			 <!-- @tap="changeSortFour" -->
			<picker :range="months" range-key="name" @change="bindMonthChange">
			<!-- <picker mode="date" :start="startDate" :end="endDate" fields="month" @change="bindMonthChange"> -->
			<view class="filter_nav_item">
				<text>{{month_txt}}</text>
				<image class="icon" v-if="sort_four == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_four == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			</picker>
			 <!-- @tap="changeSortFive" -->
			<picker :range="days" range-key="name" @change="bindDayChange">
			<!-- <picker mode="date" :start="startDate" :end="endDate" fields="day" @change="bindDayChange"> -->
			<view class="filter_nav_item">
				<text>{{day_txt}}</text>
				<image class="icon" v-if="sort_five == 0" :src="down_icon" mode="widthFix"></image>
				<image class="icon" v-if="sort_five == 1" :src="down_icon_on" mode="widthFix"></image>
			</view>
			</picker>
		</view>
		<scroll-view scroll-y="true" class="income_scroll">
			<view class="income_list_box" v-if="currentTab == 0">
				<!-- <view class="income_title">本月</view> -->
				<view class="income_list_item" v-for="(item,index) in incomeList" :key="index">
					<view class="item_left">
						<view class="ili_title">分享{{item.from_level_name}} {{item.from_user_name}}</view>
						<view class="ili_time">{{util.formatDate1(item.reg_time)}}</view>
					</view>
					<view class="item_center">分享</view>
					<view class="item_right">{{item.money}}</view>
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
				levels: [],
				months: [],
				days: [],
				level_txt: '级别',
				cur_level: '',
				startDate: '1920',
				endDate: '2050',
				year_txt: '年份',
				month_txt: '月份',
				cur_month: '',
				day_txt: '日期',
				cur_day: '',
				sort_one: 0,
				sort_two: 0,
				sort_three: 0,
				sort_four: 0,
				sort_five: 0,
				page: 0,
				util: '',
				incomeList: [],
				teamList: []
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			for(let i=1;i<=12;i++){
				this.months.push({
					name: i+'月',
					value: i
				});
			}
			for(let j=1;j<=31;j++){
				this.days.push({
					name: j+'日',
					value: j
				});
			}
			
			this.util = util;
			if(opt.name != undefined){
				this.title = opt.name;
				this.type = opt.type;
			}
			
			let params1 = {
				token: uni.getStorageSync('token')
			};
			let sign1 = this.$sign.getSign(params1,this.AppSecret);
			params1.sign = sign1;
			this.$http.getLevel(params1).then((data)=>{
				for(let i in data.data.result){
					this.levels.push(data.data.result[i]);
				}
				console.log(this.levels);
			})
			
			let params = {
				token: uni.getStorageSync('token'),
				page: 0,
				limit: 10,
				type: opt.type
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.rewardListData(params).then((data)=>{
				this.incomeList = data.data.result;
			})
		},
		methods:{
			navbarTap(e){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				this.currentTab = e;
				this.page = 0;
				this.level_txt = '级别';
				this.year_txt = '年份';
				this.month_txt = '月份';
				this.day_txt = '日期';
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: this.type
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.rewardListData(params).then((data)=>{
						this.incomeList = data.data.result;
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
					})
				}
			},
			bindLevelChange(e){
				this.sort_one = 0;
				this.sort_two = 1;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				this.level_txt = this.levels[e.detail.value];
				this.cur_level = e.detail.value+1;
				console.log(this.cur_level);
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: this.type,
						rank: this.cur_level
					};
					if(this.year_txt != '年份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'y',
							date: this.year_txt
						};
					}
					if(this.month_txt != '月份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.rewardListData(params).then((data)=>{
						this.incomeList = data.data.result;
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						rank: this.cur_level
					};
					if(this.year_txt != '年份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'y',
							date: this.year_txt
						};
					}
					if(this.month_txt != '月份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.myTeam(params).then((data)=>{
						this.teamList = data.data.result;
					})
				}
			},
			bindYearChange(e){
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 1;
				this.sort_four = 0;
				this.sort_five = 0;
				this.year_txt = e.detail.value.split('-')[0];
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: this.type,
						sort: 'y',
						date: this.year_txt
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							type: this.type,
							sort: 'y',
							date: this.year_txt
						};
					}
					if(this.month_txt != '月份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.rewardListData(params).then((data)=>{
						this.incomeList = data.data.result;
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						sort: 'y',
						date: this.year_txt
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'y',
							date: this.year_txt
						};
					}
					if(this.month_txt != '月份'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.myTeam(params).then((data)=>{
						this.teamList = data.data.result;
					})
				}
			},
			bindMonthChange(e){
				if(this.year_txt == '年份'){
					this.$api.msg('请先选择年份');
					return;
				}
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 1;
				this.sort_five = 0;
				
				// this.year_txt = e.detail.value.split('-')[0];
				// this.month_txt = e.detail.value.split('-')[1];
				this.month_txt = this.months[e.detail.value].name;
				this.cur_month = this.months[e.detail.value].value;
				console.log(this.cur_month);
				
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: this.type,
						sort: 'm',
						date: this.year_txt+'-'+this.cur_month
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							type: this.type,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.rewardListData(params).then((data)=>{
						this.incomeList = data.data.result;
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						sort: 'm',
						date: this.year_txt+'-'+this.cur_month
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'm',
							date: this.year_txt+'-'+this.cur_month
						};
					}
					if(this.day_txt != '日期'){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.myTeam(params).then((data)=>{
						this.teamList = data.data.result;
					})
				}
			},
			bindDayChange(e){
				if(this.year_txt == '年份'){
					this.$api.msg('请先选择年份');
					return;
				}
				if(this.month_txt == '月份'){
					this.$api.msg('请先选择月份');
					return;
				}
				this.sort_one = 0;
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 1;
				// this.year_txt = e.detail.value.split('-')[0];
				// this.month_txt = e.detail.value.split('-')[1];
				// this.day_txt = e.detail.value.split('-')[2];
				this.day_txt = this.days[e.detail.value].name;
				this.cur_day = this.days[e.detail.value].value;
				console.log(this.cur_day);
				
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						type: this.type,
						sort: 'd',
						date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							type: this.type,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.rewardListData(params).then((data)=>{
						this.incomeList = data.data.result;
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						page: 0,
						limit: 10,
						sort: 'd',
						date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
					};
					if(this.cur_level != ''){
						params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							rank: this.cur_level,
							sort: 'd',
							date: this.year_txt+'-'+this.cur_month+'-'+this.cur_day
						};
					}
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					this.$http.myTeam(params).then((data)=>{
						this.teamList = data.data.result;
					})
				}
			},
			changeSortOne(){
				// this.level_txt = '级别';
				// this.year_txt = '年份';
				// this.month_txt = '月份';
				// this.day_txt = '日期';
				this.sort_two = 0;
				this.sort_three = 0;
				this.sort_four = 0;
				this.sort_five = 0;
				if(this.sort_one == 0){
					this.sort_one = 1;
					
					if(this.currentTab == 0){
						let params = {
							token: uni.getStorageSync('token'),
							page: 0,
							limit: 10,
							type: this.type
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.rewardListData(params).then((data)=>{
							this.incomeList = data.data.result;
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
						})
					}
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

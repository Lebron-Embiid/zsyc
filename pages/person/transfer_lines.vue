<template>
	<view class="transfer_lines">
		<uni-nav-bar left-icon="back" title="额度管理" rightText="额度转出" @clickRight="toShowPopup"></uni-nav-bar>
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
						<view class="ili_title">XXX平台转入</view>
						<view class="ili_time">2018.10.22</view>
					</view>
					<view class="item_right">+9000</view>
				</view>
			</view>
			<view class="income_list_box" v-if="currentTab == 1">
				<view class="income_title">本月</view>
				<view class="income_list_item">
					<view class="item_left">
						<view class="ili_title">消费（订单：9826282592）</view>
						<view class="ili_time">2018.10.22</view>
					</view>
					<view class="item_right">-9000</view>
				</view>
			</view>
		</scroll-view>
		
		<uni-popup class="uni-popup" ref="transfer" type="bottom">
			<view class="transfer_popup_box">
				<image @tap="hidePopup" class="close_icon" src="/static/icon/close1.png" mode="widthFix"></image>
				<view class="transfer_over">剩余额度：80995</view>
				<view class="num_title">选择转出平台</view>
				<picker :range="platArr" @change="selectPlatform">
					<view class="plat_box">{{platArr[current]}} <image src="/static/icon/arrow.png" mode="widthFix"></image></view>
				</picker>
				<view class="num_title">数量</view>
				<uni-number-box :min="0" :max="99" @change="bindNumberChange"></uni-number-box>
			</view>
			<button type="primary" class="query_btn" @tap="querySell">确定</button>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default{
		data(){
			return{
				navbar:[{name: '额度往来'},{name: '额度消费'}],
				currentTab:0,
				down_icon_on: '/static/icon/down1.png',
				down_icon: '/static/icon/down.png',
				levels: ["会员"],
				sort_one: 0,
				sort_two: 0,
				sort_three: 0,
				sort_four: 0,
				sort_five: 0,
				platArr: ["AXXX平台","BXXX平台","CXXX平台"],
				current: 0
			}
		},
		onLoad(opt) {
			if(opt.type != undefined){
				this.title = opt.type;
			}
		},
		components:{
			uniNavBar,
			uniPopup,
			uniNumberBox
		},
		methods:{
			navbarTap(e){
				this.currentTab = e;
			},
			bindLevelChange(e){
				console.log(e.detail.value);
			},
			toShowPopup(idx){
				this.$refs.transfer.open();
			},
			hidePopup(){
				this.$refs.transfer.close();
			},
			querySell(){
				this.$refs.transfer.close();
			},
			bindNumberChange(e){
				console.log(e);
			},
			selectPlatform(e){
				this.current = e.detail.value;
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
	.transfer_popup_box{
		background: rgba(255,255,255,.9);
		padding: 30rpx 30rpx 200rpx;
		box-sizing: border-box;
		position: relative;
		.close_icon{
			display: block;
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
		.transfer_over{
			color: #333;
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 100rpx;
		}
		.plat_box{
			margin-bottom: 50rpx;
			color: #333;
			font-size: 32rpx;
			border: 1px solid #aaa;
			background: #fff;
			width: 80%;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				display: block;
				width: 16rpx;
				height: 32rpx;
				transform: rotate(90deg);
			}
		}
		.num_title{
			color: #666;
			font-size: 28rpx;
			margin-bottom: 20rpx;
		}
	}
	.query_btn{
		border-radius: 0;
		background: #fb496e;
		color: #fff;
		&:after{
			border: 0;
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
	.income_scroll{
		height: 78vh;
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
				.item_right{
					color: #333;
					font-size: 36rpx;
				}
			}
		}
	}
</style>

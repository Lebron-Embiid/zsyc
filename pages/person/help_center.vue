<template>
	<view class="help_center">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="帮助中心"></uni-nav-bar>
		<view class="help_box">
			<view class="help_title">常见问题</view>
			<view class="help_item" @tap="toClick(index)" :class="[item.is_click == 1?'show':'']" v-for="(item,index) in helpList" :key="index">
				<view class="help_top">
					<view class="ht_title">{{item.title}}</view>
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
				<view class="help_bottom">
					<block v-if="item.content!=''">
						<u-parse :content="item.content"></u-parse>
					</block>
				</view>
			</view>
			<uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uParse from "@/components/u-parse/u-parse.vue"
	export default{
		data(){
			return{
				loadingType: 'more',
				helpList: [
					// {
					// 	is_click: 0,
					// 	title: '1、如何获得套餐资格？如何使用？',
					// 	content: '您可以通过个人中心点击购买资格即可。'
					// }
				],
				page:1
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
			uParse
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token'),
				page: 1,
				limit: 15
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.helpList(params).then((data)=>{
				let res = data.data.result;
				for(let i in res){
					this.helpList.push({
						is_click: 0,
						id: res[i].id,
						time: res[i].add_time,
						title: res[i].title,
						content: res[i].content
					})
				}
			})
		},
		methods:{
			toClick(e){
				this.helpList[e].is_click = !this.helpList[e].is_click;
			}
		},
		onReachBottom() {
			this.page++;
			let params = {
				token: uni.getStorageSync('token'),
				page: this.page,
				limit: 15
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.helpList(params).then((data)=>{
				if(data.data.result.length == 0){
					this.loadingType = 'noMore';
					return;
				}
				let res = data.data.result;
				for(let i in res){
					this.helpList.push({
						is_click: 0,
						id: res[i].id,
						time: res[i].add_time,
						title: res[i].title,
						content: res[i].content
					})
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.help_box{
		background: #fff;
		.help_title{
			color: #333;
			font-size: 32rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
		}
		.help_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			.help_top{
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.ht_title{
					color: #333;
					font-size: 32rpx;
					width: 90%;
				}
				image{
					display: block;
					width: 16rpx;
					height: 32rpx;
					margin-top: 8rpx;
					transform: rotate(90deg);
				}
			}
			.help_bottom{
				display: none;
				font-size: 36rpx;
				margin-top: 20rpx;
			}
			&.show{
				.help_top{
					image{
						transform: rotate(-90deg);
					}
				}
				.help_bottom{
					display: block;
				}
			}
		}
	}
</style>

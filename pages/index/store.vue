<template>
	<view class="store">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="store_box">
			<image src="/static/img/rec_img3.png" mode="widthFix"></image>
			<view class="store_info">
				<view class="si_title">亮亮专营店</view>
				<view class="si_phone">1866981688</view>
				<view class="si_address">地址：广东省深圳市南山区西丽镇沙河西路12号</view>
			</view>
		</view>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<view class="online_content" v-if="currentTab == 0">
			<view class="content_item" v-for="(item,index) in contentList" :key="index">
				<image :src="item.src" mode="widthFix"></image>
				<view class="ci_center">
					<view class="ci_title">{{item.title}}</view>
					<view class="ci_type">品类：{{item.type}}</view>
					<view class="ci_car">购物车：{{item.car}}</view>
					<view class="ci_box">
						<view class="ci_num">
							<view class="text">库存<text>{{item.num}}</text>件</view>
							<view class="process" :style="{width: item.process+'%'}"></view>
						</view>
						<button type="primary" @tap="toDetail(item.id)" size="mini">马上抢</button>
					</view>
				</view>
			</view>
		</view>
		<view class="discount_box" v-if="currentTab == 1">
			<view class="discount_item" @tap="toDetail(item.id)" v-for="(item,index) in discountList" :key="index">
				<image :src="item.pic" mode="widthFix"></image>
				<view class="dis_title">{{item.title}}</view>
				<view class="dis_price">￥{{item.price}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				title: 'XXXX店铺',
				navbar: [{name: '套餐'},{name: '折扣区'}],
				currentTab: 0,
				contentList: [
					{
						id: 1,
						src: '/static/img/online_img1.png',
						title: '白鸭绒羽绒服',
						type: '大衣',
						car: '未选',
						num: 198,
						process: 50
					},{
						id: 2,
						src: '/static/img/online_img2.png',
						title: '宽松长袖毛衣针织衫',
						type: '毛衣',
						car: '已选',
						num: 198,
						process: 50
					}
				],
				discountList: [
					{
						id: 1,
						pic: '/static/img/online_img1.png',
						title: '女装黑主流',
						price: '45.5'
					},{
						id: 2,
						pic: '/static/img/online_img2.png',
						title: '女装黑主流',
						price: '105'
					},{
						id: 3,
						pic: '/static/img/online_img2.png',
						title: '女装黑主流',
						price: '105'
					}
				],
				loadingType: 'more',
				page: 0
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad(opt) {
			if(opt.id != undefined){
				
			}
		},
		methods:{
			navbarTap(idx){
				this.currentTab = idx;
			},
			toDetail(id){
				uni.navigateTo({
					url: '/pages/index/detail?cid='+id
				})
			}
		},
		onReachBottom() {
			// this.page++;
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
	.store_box{
		background: #f60;
		display: flex;
		justify-content: flex-start;
		align-items: stretch;
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
</style>

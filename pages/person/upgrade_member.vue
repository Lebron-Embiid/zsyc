<template>
	<view class="upgrade_member">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="会员升级" rightText="申请记录" @clickRight="toApplyRecord"></uni-nav-bar>
		<view class="help_box">
			<view class="member_top">
				<text>会员级别以及说明</text>
				<button type="primary" size="mini" @tap="toSubmit">提交申请</button>
			</view>
			<view class="help_item" @tap="toClick(index)" :class="[item.is_click == 1?'show':'']" v-for="(item,index) in memberList" :key="index">
				<view class="help_top">
					<view class="ht_title">{{item.title}}</view>
					<image src="/static/icon/arrow.png" mode="widthFix"></image>
				</view>
				<view class="help_bottom">
					{{item.content}}
				</view>
			</view>
			<!-- <uni-load-more :status="loadingType" backgroundColor="#efefef"></uni-load-more> -->
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default{
		data(){
			return{
				loadingType: 'more',
				memberList: [
					// {
					// 	is_click: 0,
					// 	title: '★ 联合创始人',
					// 	content: '1.配置10000个会员资格 2.创始人推创始人获得提成 20%，间接推荐创始人，再获得提成 10%。 3.创始人所配置的会员资格，公司负责其20 个名额，创始人提成 25%。 4.创始人直接推荐直营店获得 20%提成。同时获得直营店利润的10%。 5.创始人直接推荐分公司获得 20%提成，同时获得分公司红利润的 5%。 6.创始人拿公司收益的10%，其中3%平均分配，7%加权分红。'
					// },{
					// 	is_click: 0,
					// 	title: '★ 直营店',
					// 	content: '成为直营店（后台升级），换货时该店家获得干洗费10%的服务费。（商品上架时即标注每件商品的干洗费）。权益：1.会员权益（会员下单可选附近店自提货快递方式）'
					// },{
					// 	is_click: 0,
					// 	title: '★ 分公司',
					// 	content: '后台开通分公司等级。权益：1.会员权益 2.公司配置服装3000件指定服装发货给分公司并开通APP的店铺，配置3000个会员资格给分公司，通过线上APP-我的店铺进行分享，推荐一个用户成为会员，则分公司拿50%也就是1000元（2000*50%）。'
					// }
				]
			}
		},
		components:{
			uniNavBar,
			uniLoadMore
		},
		onLoad() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.vipLevel(params).then((data)=>{
				let res = data.data.result;
				for(let i in res){
					this.memberList.push({
						is_click: 0,
						id: res[i].level_id,
						title: res[i].level_name,
						content: res[i].describe
					})
				}
			})
		},
		methods:{
			toApplyRecord(){
				uni.navigateTo({
					url: '/pages/person/apply_record'
				})
			},
			toClick(e){
				this.memberList[e].is_click = !this.memberList[e].is_click;
			},
			toSubmit(){
				uni.navigateTo({
					url: '/pages/person/application'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.help_box{
		background: #fff;
		.member_top{
			padding: 20rpx 20rpx 20rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			color: #333;
			font-size: 32rpx;
			font-weight: bold;
			button{
				margin: 0;
				background: #f90;
				width: 45%;
				color: #fff;
				&:after{
					border: 0;
				}
			}
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
				font-size: 28rpx;
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

<template>
	<view class="process">
		<view class="page_bg"></view>
		<uni-nav-bar leftIcon="back" title="查看回复"></uni-nav-bar>
		<view class="logist_content">
			<view class="logist_box">
				<view class="logist_item" v-for="(item,index) in replyList" :key="index">
					<view class="li_box">
						<view class="li_time">{{item.type_msg}}</view>
						<view class="li_title" v-if="c_type == 0">【{{item.buy_user_name}}】{{item.message}}</view>
						<view class="li_title" v-else>【卖家】{{item.sell_user_name}}：{{item.message}}</view>
					</view>
				</view>
				<block v-if="replyList == '' || replyList.length == 0">
					<view class="not_have">暂无数据</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				order_id: '',
				page: 1,
				c_type: '',	//投诉类型   0:买家  1:卖家
				replyList:[
					// {
					// 	message: '没有收到款',
					// 	time: '2018.08.18 08:08'
					// },{
					// 	message: '已提交申诉，上传支付凭证',
					// 	time: '2018.08.18 08:08'
					// },{
					// 	message: '已确认订单',
					// 	time: '2018.08.18 08:08'
					// }
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.id != undefined){
				this.order_id = opt.id;
				this.c_type = opt.type;
			}
			let params = {
				token: uni.getStorageSync('token'),
				order_id: this.order_id,
				page: 1,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.appealList(params).then((data)=>{
				this.replyList = data.data.result;
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="scss">
	.not_have{
		margin: 50rpx auto 0;
	}
	.process{
		background: #eee;
	}
	.logist_content{
		.logist_box{
			padding: 0 30rpx;
			.logist_item{
				padding-left: 40rpx;
				padding-top: 30rpx;
				position: relative;
				:before{
					content: "";
					display: block;
					width: 1px;
					height: 100%;
					position: absolute;
					left: 13rpx;
					top: 0;
					background: #E2E2E2;
					z-index: 1;
				}
				:after{
					content: "";
					display: block;
					width: 13px;
					height: 13px;
					border-radius: 50%;
					background: #fff;
					box-sizing: border-box;
					border: 1px solid #ccc;
					position: absolute;
					left: 0;
					top: 60rpx;
					z-index: 2;
				}
				.li_box{
					background: #fff;
					border-radius: 10rpx;
					padding: 25rpx;
					box-sizing: border-box;
					border-bottom: 1px solid #F1F1F1;
					.li_title{
						color: #333;
						font-size: 32rpx;
					}
					.li_time{
						color: #999;
						font-size: 28rpx;
						margin-bottom: 5rpx;
					}
				}
				// &:first-of-type{
				// 	.li_box{
				// 		.li_title{
				// 			color: #fa3d34;
				// 		}
				// 	}
				// 	:after{
				// 		background: #fa3d34;
				// 	}
				// }
			}
		}
	}
</style>
<template>
	<view class="apply_record">
		<uni-nav-bar left-icon="back" title="会员申请记录"></uni-nav-bar>
		<view class="record_box">
			<view class="record_item" v-for="(item,index) in applyList" :key="index">
				<view>旧等级  新等级</view>
				<text v-if="item.status == 0">{{item.status_name}}</text>
				<text v-if="item.status == 2" class="red">{{item.status_name}}</text>
				<text v-if="item.status == 1" class="green">{{item.status_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				page: 1,
				applyList: [
					{
						
					}
				]
			}
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token'),
				page: this.page,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.applyLevelList(params).then((data)=>{
				
			})
		},
		components:{
			uniNavBar
		}
	}
</script>

<style scoped lang="scss">
	.record_box{
		.record_item{
			padding: 30rpx;
			box-sizing: border-box;
			color: #666;
			font-size: 32rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #eee;
			text{
				color: #999;
				font-size: 32rpx;
				&.red{
					color: #f00;
				}
				&.green{
					color: #1cd300;
				}
			}
		}
	}
</style>

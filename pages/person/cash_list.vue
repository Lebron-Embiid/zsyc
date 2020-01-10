<template>
	<view>
		<uni-nav-bar left-icon="back" title="提现账号"></uni-nav-bar>
		
		<view class="content">
			<view class="list">
				<view class="no-txt" v-if="accountList.length == 0">
					暂无提现账号
				</view>
				<view class="row" v-for="(row,index) in accountList" :key="index" @tap="select(row)">
					<view class="left">
						<view class="default" v-if="row.is_default == 1">
							默认
						</view>
					</view>
					<view class="center">
						<view class="address">
							账户类型：{{row.type}}
						</view>
						<view class="address">
							账号：{{row.account}}
						</view>
						<view class="address" v-if="row.code != 'alipay'">
							开户行：{{row.bank_name}}
						</view>
						<view class="address">
							户名：{{row.realname}}
						</view>
					</view>
					<view class="right">
						<!-- <view class="icon shanchu" @tap.stop="del(row)"></view> -->
						<image src="/static/icon/edit.png" @tap.stop="toEdit(row)" mode="widthFix"></image>
						<!-- <text @tap.stop="setDefault(row)">设为默认</text> -->
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新建提现账号
			</view>
		</view>
	</view>
</template>
<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				isSelect:false,
				accountList:[]
			};
		},
		components:{
			uniNavBar
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token'),
				page: 0,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getAccountList(params).then((data)=>{
				this.accountList = data.data.result;
			})
		},
		onLoad(e) {
			if(e.type=='select'){
				this.isSelect = true;
			}
		},
		methods:{
			del(row){
				var that = this;
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res)=>{
						if (res.confirm) {
							let params = {id: row.address_id,token: uni.getStorageSync('token')};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							that.$http.delAddress(params).then((data)=>{
								that.$api.msg(data.data.msg);
								if(data.data.status == 1){
									let params1 = {token: uni.getStorageSync('token')};
									let sign1 = this.$sign.getSign(params1,this.AppSecret);
									params1.sign = sign1;
									that.$http.getAccountList(params1).then((data)=>{
										that.accountList = data.data.result;
										
										uni.removeStorage({
											key:'selectAccount'
										})
									})
								}
							})
						} 
					}
				});
			},
			setDefault(row){
				let params = {address_id: row.address_id,token: uni.getStorageSync('token')};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setDefaultAddress(params).then((data)=>{
					// this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						let params1 = {token: uni.getStorageSync('token')};
						let sign1 = this.$sign.getSign(params1,this.AppSecret);
						params1.sign = sign1;
						
						this.$http.getAccountList(params1).then((data)=>{
							this.accountList = data.data.result;
							
							for(let i in this.addressList){
								let res = this.addressList;
								let tel = ""+this.addressList[i].mobile;
								let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
								this.addressList[i].phone = tel1;
							}
						})
					}
				})
			},
			toEdit(row){
				uni.setStorage({
					key:'account',
					data:row,
					success() {
						uni.navigateTo({
							url:"/pages/person/cash_edit?type=edit"
						})
					}
				});
			},
			add(){
				uni.navigateTo({
					url:"/pages/person/cash_edit?type=add"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'selectAccount',
					data:row,
					success() {
						uni.navigateBack();
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.no-txt{
		margin: 150rpx auto 0;
		color: #999;
		font-size: 30rpx;
	}
	.icon {
		// &.bianji {
		// 	&:before{content:"\e61b";}
		// }
		// &.tianjia {
		// 	&:before{content:"\e81a";}
		// }
	}
	.content{
		margin-bottom: 120rpx;
	}
	.add{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			display: flex;
			// box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #fd6974;
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				display: flex;
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
				margin-right: 10rpx;
			}
			font-size: 30upx;
		}
	}
	.list{
		display: flex;
		flex-wrap: wrap;
		.row{
			display: flex;
			width: 96%;
			padding: 30rpx 30rpx 30rpx 0;
			border-bottom: 1px solid #eee;
			.left{
				display: flex;
				width: 140rpx;
				flex-shrink: 0;
				align-items: center;
				.default{
					font-size: 22rpx;
					background-color: #fff;
					color: #ff2a3a;
					border: 1px solid #ff2a3a;
					padding: 5rpx 15rpx 5rpx;
					border-radius: 5rpx;
					margin-left: 20rpx;
				}
			}
			.center{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.name-tel{
					width: 100%;
					display: flex;
					align-items: stretch;
					.top_box{
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						height: 44rpx;
					}
					.name{
						color: #333;
						font-size: 32rpx;
						width: 140rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.tel{
						margin-left: 30rpx;
						font-size: 32rpx;
						color: #333;
					}
				}
				.address{
					display: flex;
					width: 100%;
					font-size: 28rpx;
					align-items: baseline;
					color: #999;
					margin-top: 10rpx;
				}
			}
			.right{
				display: flex;
				flex-shrink: 0;
				align-items: center;
				margin-left: 20upx;
				.icon{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80upx;
					height: 60upx;
					border-left: solid 1upx #aaa;
					font-size: 40upx;
					color: #777;
				}
				image{
					display: block;
					width: 36rpx;
					height: 36rpx;
				}
				text{
					font-size: 24rpx;
					color: #f90;
				}
			}
		}
	}
</style>

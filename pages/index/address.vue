<template>
	<view>
		<uni-nav-bar left-icon="back" title="选择地址"></uni-nav-bar>
		
		<view class="content">
			<view class="list">
				<view class="no-txt" v-if="addressList.length == 0">
					暂无收货地址
				</view>
				<view class="row" v-for="(row,index) in addressList" :key="index" @tap="select(row)">
					<!-- <view class="left">
						<view class="head">
							{{row.consignee.substring(0,1)}}
						</view>
					</view> -->
					<view class="center">
						<view class="name-tel">
							<view class="top_box">
								<view class="name">{{row.consignee}}</view>
								<view class="tel">{{row.mobile}}</view>
								<view class="default" v-if="row.is_default == 1">
									默认
								</view>
							</view>
						</view>
						<view class="address">
							{{row.province_name+'-'+row.city_name+'-'+row.district_name}}{{row.address}}
						</view>
					</view>
					<view class="right">
						<view class="icon shanchu" @tap.stop="del(row)"></view>
						<text @tap.stop="setDefault(row)">设为默认</text>
					</view>
				</view>
			</view>
		</view>
		<view class="add">
			<view class="btn" @tap="add">
				<view class="icon tianjia"></view>新增地址
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
				addressList:[]
			};
		},
		components:{
			uniNavBar
		},
		onShow() {
			this.$http.getAddressList({
				token: uni.getStorageSync('token')
			}).then((data)=>{
				this.addressList = data.data.result;
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
							that.$http.delAddress({
								id: row.address_id,
								token: uni.getStorageSync('token')
							}).then((data)=>{
								that.$api.msg(data.data.msg);
								if(data.data.status == 1){
									that.$http.getAddressList({
										token: uni.getStorageSync('token')
									}).then((data)=>{
										that.addressList = data.data.result;
										
										uni.removeStorage({
											key:'selectAddress'
										})
									})
								}
							})
						} 
					}
				});
			},
			setDefault(row){
				this.$http.setDefaultAddress({
					address_id: row.address_id,
					token: uni.getStorageSync('token')
				}).then((data)=>{
					// this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.$http.getAddressList({
							token: uni.getStorageSync('token')
						}).then((data)=>{
							this.addressList = data.data.result;
						})
					}
				})
			},
			edit(row){
				uni.setStorage({
					key:'address',
					data:row,
					success() {
						uni.navigateTo({
							url:"/pages/index/edit?type=edit"
						})
					}
				});
				
			},
			add(){
				uni.navigateTo({
					url:"/pages/index/edit?type=add"
				})
			},
			select(row){
				//是否需要返回地址(从订单确认页跳过来选收货地址)
				if(!this.isSelect){
					return ;
				}
				uni.setStorage({
					key:'selectAddress',
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
	.add{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			display: flex;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: rgb(255, 153, 0);
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
			padding: 20upx 2%;
			border-bottom: 1px solid #f4f4f4;
			.left{
				display: flex;
				width: 90upx;
				flex-shrink: 0;
				align-items: center;
				.head{
					display: flex;
					width: 70upx;
					height: 70upx;
					background:linear-gradient(to right,#ccc,#aaa);
					color: #fff;
					justify-content: center;
					align-items: center;
					border-radius: 60upx;
					font-size: 35upx;
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
					}
					.name{
						font-size: 34upx;
						width: 200rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.tel{
						margin-left: 30upx;
						font-size: 24upx;
						color: #777;
					}
					.default{
						font-size: 22upx;
						background-color: #f06c7a;
						color: #fff;
						padding: 8upx 18upx 5upx;
						border-radius: 24upx;
						margin-left: 20upx;
					}
				}
				.address{
					display: flex;
					width: 100%;
					font-size: 24upx;
					align-items: baseline;
					color: #777;
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
				text{
					font-size: 24rpx;
					color: #f90;
				}
			}
		}
	}
</style>

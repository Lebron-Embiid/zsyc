<template>
	<view class="write_order">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="填写订单"></uni-nav-bar>
		<view class="order_address" @tap="selectAddress">
			<view class="oa_left" v-if="has_address==false">
				<view class="oa_title">请选择地址</view>
			</view>
			<view class="oa_left" v-else>
				<view class="oa_title">{{recinfo.consignee}} <text>{{phone}}</text></view>
				<view class="oa_address">地址：{{recinfo.province_name}}{{recinfo.city_name}}{{recinfo.district_name}}{{recinfo.address}}</view>
			</view>
			<image src="/static/icon/arrow.png" mode="widthFix"></image>
		</view>
		<view class="order_goods" @tap="showGoodsPopup">
			<view class="og_left">
				<image v-for="(item,index) in goodsList" :key="index" :src="item.bar_code" mode="widthFix"></image>
			</view>
			<view class="og_right">
				共{{goodsNum}}件商品
				<image src="/static/icon/arrow.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="order_meal" v-if="combo.length!=0" @tap="selectMeal">
			套餐
			<view>1套 <image src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="order_info_box">
			<view class="order_info_item">
				余额支付 <input type="number" placeholder="请输入使用余额" v-model="user_money" />
			</view>
			<view class="oii_till line">您的可用余额 ¥ <text>{{over_money}}</text><button type="default" @tap="moneyCount" size="mini">使用</button></view>
			<view class="order_info_item">
				积分支付 <input type="number" placeholder="请输入使用积分" v-model="pay_points" />
			</view>
			<view class="oii_till line">1 积分抵 1元，您的可用积分 {{over_points}} 分<button type="default" @tap="pointCount" size="mini">使用</button></view>
			<view class="order_info_item">
				商品金额 <text>￥{{total_price}}</text>
			</view>
			<!--<view class="order_info_item">
				名额优惠 <text>-￥300.00</text>
			</view>
			<view class="order_info_item">
				名额消费 <text>v 600</text>
			</view> -->
			<view class="order_info_item" v-if="combo.length!=0">
				套餐使用 <text>无</text>
			</view>
			<view class="order_info_item">
				运费 <text>+￥{{post_fee}}</text>
			</view>
			<view class="textarea_box">
				<textarea v-model="message" @input="changeNum" placeholder="买家留言，45字以内" maxlength="45" />
				<text>{{num}}/45</text>
			</view>
		</view>
		<view class="fixed_pay_bottom">
			<view>应付：￥<text>{{pay_price}}</text></view>
			<button type="primary" @tap="toPay">去付款</button>
		</view>
		<uni-popup ref="goods" type="bottom">
			<view class="goods_popup_box">
				<view class="goods_popup_top">
					<view>商品清单 <text>(共{{goodsNum}}件商品)</text></view>
					<image @tap="closePop" src="/static/icon/close1.png" mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="goods_pop_scroll">
					<view class="goods_pop_item" v-for="(item,index) in goodsList" :key="index">
						<image :src="item.src" mode="widthFix"></image>
						<view class="gp_center">
							<view class="gp_title">{{item.goods_name}}</view>
							<view class="gp_info">{{item.spec_key_name}}</view>
							<view class="gp_price">￥{{item.goods_price}}</view>
						</view>
						<view class="gp_num">x{{item.goods_num}}</view>
					</view>
				</scroll-view>
				<button type="primary">确定</button>
			</view>
		</uni-popup>
		<uni-popup ref="meal" type="bottom">
			<view class="goods_popup_box">
				<view class="goods_popup_top">
					<view>优惠券</view>
					<image @tap="closePop1" src="/static/icon/close1.png" mode="widthFix"></image>
				</view>
				<scroll-view scroll-y="true" class="goods_pop_scroll meal_list">
					<view class="meal_item" v-for="(item,index) in mealList" :key="index">
						<view class="meal_top">
							<view class="meal_left" style="width: 40% !important;"><text>{{parseInt(item.setmeal_price)}}</text>元</view>
							<view class="meal_center">
								<view class="mc_title">{{item.setmeal_name}}</view>
								<view class="mc_info">{{item.setmeal_remark}}</view>
							</view>
							<view class="meal_right">
								<radio @tap="selectRadio(index)" color="#fb5860" :checked="true" />
							</view>
						</view>
						<view class="meal_bottom" :class="[item.is_show == true?'':'active']" @tap="changeTxt(index)">
							<view class="mb_left">全场通用：{{item.content}}</view>
							<image src="/static/icon/right.png" mode="widthFix"></image>
						</view>
					</view>
				</scroll-view>
				<button type="primary">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				phone: '',
				recinfo: {},
				goodsList: [
					// {
					// 	src: '/static/img/order_img2.png',
					// 	title: '精装女士大衣',
					// 	info: '普罗旺斯 优雅精致',
					// 	price: '118',
					// 	num: 1
					// }
				],
				mealList: [
					// {
					// 	price: '100',
					// 	type: '元',
					// 	title: '100元直减券',
					// 	info: '2018.06.02-2018.06.20',
					// 	content: '限时购、特价等优惠商品及详情页标注不可用券的商品除外。',
					// 	is_show: false,
					// 	checked: false
					// }
				],
				user_money: '',
				pay_points: '',
				over_money: '',
				over_points: '',
				message: '',
				num: 0,
				store_id: '',
				has_address: false,
				shipping_code: {},
				combo: [],
				pay_price: '',
				total_price: '',
				post_fee: ''
			}
		},
		computed:{
			goodsNum(){
				return this.goodsList.length;
			}
		},
		components:{
			uniNavBar,
			uniPopup
		},
		onLoad(opt) {
			if(opt.shipCode != undefined){
				this.shipping_code = JSON.parse(JSON.stringify(opt.shipCode));
				console.log(this.shipping_code);
			}
		},
		onShow() {
			let params = {token: uni.getStorageSync('token')};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.carConfirm(params).then((data)=>{
				if(data.data.status < 1){
					this.$api.msg(data.data.msg);
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						})
					},1500)
					return;
				}
				this.recinfo = data.data.result.addressList!=null?data.data.result.addressList:{};
				this.goodsList = data.data.result.cartList;
				this.total_price = data.data.result.totalPrice.total_fee;
				this.pay_price = data.data.result.totalPrice.total_fee;
				this.over_money = data.data.result.user_info.user_money;
				this.over_points = data.data.result.user_info.pay_points;
				this.mealList.push({
					us_id: data.data.result.combo.us_id,
					setmeal_id:data.data.result.combo.setmeal_id,
					setmeal_price: data.data.result.combo.setmeal_price,
					setmeal_name: data.data.result.combo.setmeal_name,
					setmeal_remark: data.data.result.combo.setmeal_remark,
					content: '限时购、特价等优惠商品及详情页标注不可用券的商品除外。',
					is_show: false,
					checked: false
				});
				this.combo = data.data.result.combo;
				this.store_id = data.data.result.store_id;
				if(this.recinfo == {}){
					this.has_address = false;
				}else{
					this.has_address = true;
					
					let tel = ""+this.recinfo.mobile;
					let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
					this.phone = tel1;
					
					// console.log(this.shipping_code);
					let params1 = {
						token: uni.getStorageSync('token'),
						address_id: this.recinfo.address_id,
						user_money: 0,
						pay_points: 0
					};
					let sign1 = this.$sign.getSign(params1,this.AppSecret);
					params1.sign = sign1;
					
					this.$http.submitConfirm(params1).then((data1)=>{
						this.post_fee = data1.data.result.postFee;
						this.pay_price = data1.data.result.payables;
					})
				}
				
				if(uni.getStorageSync('selectAddress') != ''){
					uni.getStorage({
						key:'selectAddress',
						success: (e) => {
							console.log(e);
							this.recinfo = e.data;
							
							let tel = ""+this.recinfo.mobile;
							let tel1 = tel.substr(0,3) + "****" + tel.substr(7);
							this.phone = tel1;
							
							this.has_address = true;
						}
					})
				}else{
					this.has_address = false;
				}
			})
		},
		methods:{
			selectAddress(){
				uni.navigateTo({
					url: '/pages/index/address?type=select'
				})
			},
			showGoodsPopup(){
				this.$refs.goods.open();
			},
			closePop(){
				this.$refs.goods.close();
			},
			closePop1(){
				this.$refs.meal.close();
			},
			selectMeal(){
				this.$refs.meal.open();
			},
			changeTxt(idx){
				this.mealList[idx].is_show = !this.mealList[idx].is_show;
			},
			selectRadio(idx){
				for(let i in this.mealList){
					this.mealList[i].checked = false;
				}
				this.mealList[idx].checked = true;
			},
			changeNum(e){
				this.num = e.detail.value.length;
			},
			moneyCount(){
				let params = {
					token: uni.getStorageSync('token'),
					address_id: this.recinfo.address_id,
					user_money: this.user_money?this.user_money:0
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.submitConfirm(params).then((data)=>{
					this.pay_price = data.data.result.payables;
					this.$api.msg(data.data.msg);
				})
			},
			pointCount(){
				let params = {
					token: uni.getStorageSync('token'),
					address_id: this.recinfo.address_id,
					pay_points: this.pay_points?this.pay_points:0,
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.submitConfirm(params).then((data)=>{
					this.pay_price = data.data.result.payables;
					this.$api.msg(data.data.msg);
				})
			},
			toPay(){
				if(this.recinfo == null){
					this.$api.msg('请选择地址');
					return;
				}
				this.$Debounce.canDoFunction({
					key: "submitConfirm",
					time: 1500,
					success:()=>{
						if(this.combo.length == 0){
							let params = {
								token: uni.getStorageSync('token'),
								address_id: this.recinfo.address_id,
								// shipping_code: JSON.stringify(this.shipping_code),
								user_money: this.user_money?this.user_money:0,
								pay_points: this.pay_points?this.pay_points:0,
								user_note: this.message,
								act: 'submit_order'
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.submitConfirm(params).then((data)=>{
								this.$api.msg(data.data.msg);
								if(data.data.status == 1){
									setTimeout(()=>{
										uni.redirectTo({
											url: '/pages/person/detail?id='+data.data.result.id
										})
									},1500)
								}
							})
						}else{
							let params = {
								token: uni.getStorageSync('token'),
								address_id: this.recinfo.address_id,
								us_id: this.combo.us_id,
								store_id: this.store_id,
								user_money: this.user_money?this.user_money:0,
								pay_points: this.pay_points?this.pay_points:0,
								user_note: this.message,
								act: 'submit_order'
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.cartCombo(params).then((data)=>{
								this.$api.msg(data.data.msg);
								if(data.data.status == 1){
									setTimeout(()=>{
										uni.redirectTo({
											url: '/pages/person/detail?id='+data.data.order_id+'&code='+data.data.result
										})
									},1500)
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.write_order{
		background: #eee;
	}
	.meal_list{
		padding: 0 30rpx;
		.meal_item{
			&:last-child{
				margin-bottom: 0;
			}
		}
	}
	.meal_list .meal_item .meal_top .meal_center{
		width: 50%;
	}
	.meal_list .meal_item .meal_top .meal_right{
		display: flex;
		justify-content: flex-end;
	}
	.goods_pop_item{
		.gp_center{
			.gp_title{
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
		}
	}
	.order_address{
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		background: #fff url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		&:active{
			background: #fafafa url('~@/static/icon/bottom_bg.png') left bottom repeat-x;
		}
		.oa_left{
			width: 90%;
			color: #999;
			font-size: 28rpx;
			font-weight: bold;
			.oa_title{
				color: #333;
				font-size: 32rpx;
				margin-bottom: 10rpx;
				text{
					margin-left: 15rpx;
				}
			}
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
		}
	}
	.order_goods{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		&:active{
			background: #fafafa;
		}
		.og_left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			image{
				display: block;
				width: 138rpx;
				height: 138rpx;
				margin-right: 20rpx;
				&:nth-child(n+4){
					display: none;
				}
			}
		}
		.og_right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #999;
			font-size: 32rpx;
			image{
				display: block;
				width: 16rpx;
				height: 32rpx;
				margin-left: 10rpx;
			}
		}
	}
	.order_meal{
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		color: #333;
		&:active{
			background: #fafafa;
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
			margin-left: 10rpx;
		}
		view{
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.order_info_box{
		background: #fff;
		margin-bottom: 120rpx;
		.oii_till{
			color: #999;
			font-size: 28rpx;
			border-top: 1px solid #eee;
			padding: 15rpx 30rpx;
			box-sizing: border-box;
			text-align: right;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			button{
				margin: 0 0 0 20rpx;
				border: 1rpx solid #ccc;
				box-sizing: border-box;
				&:after{
					border: 0;
				}
			}
			&.line{
				border-bottom: 1px solid #eee;
			}
		}
		.order_info_item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15rpx 30rpx;
			box-sizing: border-box;
			color: #333;
			font-size: 32rpx;
			input{
				text-align: right;
			}
		}
	}
	.goods_popup_box{
		background: rgba(233,233,233,1);
		.goods_popup_top{
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			view{
				color: #333;
				font-size: 36rpx;
				font-weight: bold;
				text{
					color: #666;
					font-size: 28rpx;
					font-weight: normal;
					margin-left: 10rpx;
				}
			}
			image{
				display: block;
				width: 32rpx;
				height: 32rpx;
			}
		}
		.goods_pop_scroll{
			max-height: 56vh;
			overflow: hidden;
			margin-bottom: 20rpx;
			background: #fff;
		}
		button{
			border-radius: 0;
			color: #fff;
			font-size: 32rpx;
			height: 100rpx;
			line-height: 100rpx;
			background: rgba(250,29,76,.8);
			&:active{
				background: rgba(250,29,76,1);
			}
			&:after{
				border: 0;
			}
		}
	}
</style>

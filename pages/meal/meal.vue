<template>
	<view class="meal">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我的套餐"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<!-- 购买套餐 -->
		<scroll-view scroll-y="true" class="meal_list" @scrolltolower="loadMore">
			<view class="meal_item" :class="[currentTab==2?'gray':'']" v-for="(item,index) in mealList" :key="index">
				<view class="meal_top">
					<view class="meal_left"><text>{{parseInt(item.setmeal_price)}}</text>元</view>
					<view class="meal_center">
						<view class="mc_title">{{item.setmeal_name}}</view>
						<view class="mc_info">{{item.setmeal_remark}}</view>
					</view>
					<view class="meal_right">
						<button type="primary" v-if="currentTab==0" size="mini">立即选购</button>
						<button type="primary" v-if="currentTab==1" size="mini">立即使用</button>
					</view>
				</view>
				<view class="meal_bottom" :class="[item.is_show == true?'':'active']" @tap="changeTxt(index)">
					<view class="mb_left">全场通用：{{item.content}}</view>
					<image src="/static/icon/right.png" mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				navbar:[{name:"购买套餐"},{name:"未使用"},{name:"已使用"}],
				currentTab:0,
				mealList: [
					// {
					// 	price: 2000,
					// 	title: '女士套餐',
					// 	info: '夏秋装8件，冬春装5件',
					// 	content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
					// 	is_show: false
					// }
				]
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			console.log(uni.getStorageSync('token'));
			this.$http.getCombo(params).then((data)=>{
				// this.mealList = data.data.result.result;
				for(let i in data.data.result.result){
					let res = data.data.result.result[i];
					this.mealList.push({
						is_show: false,
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						setmeal_id: res.setmeal_id,
						setmeal_name: res.setmeal_name,
						setmeal_price: res.setmeal_price,
						setmeal_remark: res.setmeal_remark
					})
					// this.mealList[i].content = '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。';
					// this.mealList[i].is_show = false;
				}
				console.log(this.mealList);
			})
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				if(this.currentTab == 0){
					let params = {
						token: uni.getStorageSync('token')
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					console.log(uni.getStorageSync('token'));
					this.$http.getCombo(params).then((data)=>{
						this.mealList = [];
						for(let i in data.data.result.result){
							let res = data.data.result.result[i];
							this.mealList.push({
								is_show: false,
								content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
								setmeal_id: res.setmeal_id,
								setmeal_name: res.setmeal_name,
								setmeal_price: res.setmeal_price,
								setmeal_remark: res.setmeal_remark
							})
						}
					})
				}else if(this.currentTab == 1){
					let params = {
						token: uni.getStorageSync('token'),
						type: 1
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					console.log(uni.getStorageSync('token'));
					this.$http.getCombo(params).then((data)=>{
						this.mealList = [];
						for(let i in data.data.result.result){
							let res = data.data.result.result[i];
							this.mealList.push({
								is_show: false,
								content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
								setmeal_id: res.setmeal_id,
								setmeal_name: res.setmeal_name,
								setmeal_price: res.setmeal_price,
								setmeal_remark: res.setmeal_remark
							})
						}
					})
				}else{
					let params = {
						token: uni.getStorageSync('token'),
						type: 2
					};
					let sign = this.$sign.getSign(params,this.AppSecret);
					params.sign = sign;
					console.log(uni.getStorageSync('token'));
					this.$http.getCombo(params).then((data)=>{
						this.mealList = [];
						for(let i in data.data.result.result){
							let res = data.data.result.result[i];
							this.mealList.push({
								is_show: false,
								content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
								setmeal_id: res.setmeal_id,
								setmeal_name: res.setmeal_name,
								setmeal_price: res.setmeal_price,
								setmeal_remark: res.setmeal_remark
							})
						}
					})
				}
			},
			changeTxt(idx){
				console.log(idx,this.mealList[idx].is_show);
				if(this.mealList[idx].is_show == false){
					this.mealList[idx].is_show = true;
				}else{
					this.mealList[idx].is_show = false;
				}
			},
			loadMore(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.meal_list{
		height: 85vh;
	}
</style>

<template>
	<view class="meal">
		<view class="page_bg"></view>
		<uni-nav-bar title="我的套餐"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<!-- 购买套餐 -->
		<view class="meal_list">
			<view class="meal_item" :class="[currentTab==2?'gray':'']" v-for="(item,index) in mealList" :key="index">
				<view class="meal_top">
					<view class="meal_left"><text>{{item.price}}</text>元</view>
					<view class="meal_center">
						<view class="mc_title">{{item.title}}</view>
						<view class="mc_info">{{item.info}}</view>
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
		</view>
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
					{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					},{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					},{
						price: 2000,
						title: '女士套餐',
						info: '夏秋装8件，冬春装5件',
						content: '除不加入套餐商品，套餐包含品类只能选购一件，二次更新对应品类付干洗费即可。',
						is_show: false
					}
				]
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
			},
			changeTxt(idx){
				this.mealList[idx].is_show = !this.mealList[idx].is_show;
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>

<template>
	<view class="my_collect">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="我的收藏"></uni-nav-bar>
		<view class="list_nav">
			<view v-for="(item,index) in navbar" :key="index" :class="[currentTab==index ? 'active' : '']" @click="navbarTap(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y="true" class="collect_box" @scrolltolower="loadMoreCollect">
			<view class="collect_item" v-for="(item,index) in collectList" :key="index">
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				navbar: [{name:"店铺"},{name:"商品"},{name:"文章"}],
				currentTab: 0,
				page: 0,
				collectList: [],
				url: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			this.url = this.$http.url;
			let params = {
				token: uni.getStorageSync('token'),
				page: 0,
				limit: 10
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserCollectStore(params).then((data)=>{
				this.collectList = data.data.result;
			})
		},
		methods:{
			navbarTap(e){
				console.log(e)
				this.currentTab = e;
				let params = {
					token: uni.getStorageSync('token'),
					page: 0,
					limit: 10
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				if(e == 0){
					this.$http.getUserCollectStore(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else if(e == 1){
					this.$http.getUserCollectGoods(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}else{
					this.$http.getUserCollectArticle(params).then((data)=>{
						this.collectList = data.data.result;
					})
				}
			},
			loadMoreCollect(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	
</style>

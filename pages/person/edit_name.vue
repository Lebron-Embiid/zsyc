<template>
	<view class="edit_name">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="编辑昵称" rightText="完成" @clickRight="clickRightBtn"></uni-nav-bar>
		<view class="edit_box">
			<input type="text" placeholder="4-20个字符，可由中英文、数字组成" v-model="name" />
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				name: ''
			}
		},
		components:{
			uniNavBar
		},
		onLoad(opt) {
			if(opt.name != undefined){
				this.name = opt.name;
			}
		},
		methods:{
			clickRightBtn(){
				if(this.name == ''){
					this.$api.msg('昵称不能为空！');
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					nickname: this.name
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.updateUserInfo(params).then((data)=>{
					uni.navigateBack({
						delta: 1
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.edit_box{
		height: 100rpx;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
		input{
			color: #999;
			font-size: 28rpx;
		}
	}
</style>

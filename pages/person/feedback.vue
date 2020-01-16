<template>
	<view class="feedback">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="意见反馈" rightText="提交" @clickRight="submit"></uni-nav-bar>
		<picker :range="feedback_arr" @change="selectFeedback">
			<view class="feedback_item">
				{{feed_type}}
				<image src="/static/icon/arrow.png" mode="widthFix"></image>
			</view>
		</picker>
		<view class="feedback_item">
			<input type="text" v-model="phone" placeholder="请填写手机号，方便我们联系你" />
		</view>
		<view class="feedback_item">
			<textarea v-model="feed_content" @input="valNum" maxlength="200" placeholder="请填写反馈内容，不超过200字" />
			<text class="len">{{length}}/200</text>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				feed_type: '请选择反馈类型',
				type: '',
				phone: '',
				feed_content: '',
				feedback_arr: [],
				length: 0
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
			this.$http.feedBackType(params).then((data)=>{
				this.feedback_arr = data.data.result;
			})
		},
		methods:{
			submit(){
				if(this.type == ''){
					this.$api.msg('请选择反馈类型');
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					type: this.type,
					mobile: this.phone,
					content: this.feed_content
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.feedBack(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.feed_type = '请选择反馈类型';
						this.type = '';
						this.phone = '';
						this.feed_content = '';
					}
				})
			},
			selectFeedback(e){
				this.feed_type = this.feedback_arr[e.detail.value];
				this.type = e.detail.value;
				console.log(this.type);
			},
			valNum(e){
				this.length = e.detail.value.length;
			}
		}
	}
</script>

<style scoped lang="scss">
	.feedback{
		background: #eee;
	}
	.feedback_item{
		background: #fff;
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 32rpx;
		position: relative;
		&:first-child{
			padding-right: 40rpx;
		}
		image{
			display: block;
			width: 16rpx;
			height: 32rpx;
			transform: rotate(90deg);
		}
		input{
			display: block;
			width: 100%;
			font-size: 32rpx;
		}
		textarea{
			font-size: 32rpx;
			background: #fafafa;
			display: block;
			width: 100%;
			padding: 10rpx;
			box-sizing: border-box;
		}
		.len{
			position: absolute;
			color: #333;
			font-size: 28rpx;
			right: 40rpx;
			bottom: 40rpx;
		}
	}
</style>

<template>
	<view class="changePassword">
		<uni-nav-bar left-icon="back" title="设置支付密码"></uni-nav-bar>
		<view class="form_box">
			<view class="form_item" v-for="(item,index) in loginPwd" :key="item.id">
				<view class="icon"><image src="/static/icon/pwd1.svg" mode="widthFix"></image></view>
				<view class="right_box">
					<view class="ipt_box">
						<block v-if="index == 0">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="password" />
							<input type="text" :placeholder="item.text" v-else v-model="password" />
						</block>
						<block v-if="index == 1">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="new_password" />
							<input type="text" :placeholder="item.text" v-else v-model="new_password" />
						</block>
						<block v-if="index == 2">
							<input type="password" :placeholder="item.text" v-if="item.type == 0" v-model="again_password" />
							<input type="text" :placeholder="item.text" v-else v-model="again_password" />
						</block>
					</view>
					<switchc text="可见|***" class="switch_btn" :sid="index" @change="switchchange($event,index)"></switchc>
				</view>
			</view>
			<button class="submit_btn" @tap="submitForm">修改</button>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				password: '',
				new_password: '',
				again_password: '',
				loginPwd: [
					// {
					// 	id: 1,
					// 	text: '请输入旧支付密码',
					// 	type: 0
					// },
					{
						id: 2,
						text: '请输入支付密码',
						type: 0
					},{
						id: 3,
						text: '请再次输入支付密码',
						type: 0
					}
				]
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		onShow() {
			
		},
		methods:{
			switchchange(e,idx) {
				if(e.value == true){
					this.loginPwd[idx].type = 1
				}else{
					this.loginPwd[idx].type = 0
				}
				// console.log(this.loginPwd[idx].type);
			},
			submitForm(){
				// console.log(this.password,this.new_password,this.again_password);
				// if(this.password == this.again_password){
				// 	this.$api.msg('旧密码与新密码一样');
				// 	return;
				// }
				if(this.new_password != this.again_password){
					this.$api.msg('新密码不一致');
					return;
				}
				let params = {
					new_password: this.new_password,
					confirm_password: this.again_password,
					token: uni.getStorageSync('token')
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setPayPassword(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.password = '';
						this.new_password = '';
						this.again_password = '';
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.form_box{
		padding: 30rpx;
		box-sizing: border-box;
		.basic_title{
			color: #999;
			font-size: 28rpx;
			padding-bottom: 15rpx;
			border-bottom: 1px solid #f2f2f2;
		}
	}
	.submit_btn{
		margin: 50rpx;
	}
</style>

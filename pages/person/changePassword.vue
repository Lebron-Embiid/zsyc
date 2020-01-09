<template>
	<view class="changePassword">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" :title="title"></uni-nav-bar>
		<view class="form_box">
			<view v-if="type == 'login'">
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
				<button v-if="password!='' && new_password!='' && again_password!=''" class="submit_btn red" @tap="submitForm">确定</button>
				<button v-else class="submit_btn">确定</button>
			</view>
			<view v-else>
				<view class="form_item" v-for="(trade,idx) in tradePwd" :key="trade.id" :class="[paypwd==null&&idx==0?'hide':'']">
					<view class="icon"><image src="/static/icon/pwd1.svg" mode="widthFix"></image></view>
					<view class="right_box">
						<view class="ipt_box">
							<block v-if="idx == 0">
								<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="trade_password" />
								<input type="text" :placeholder="trade.text" v-else v-model="trade_password" />
							</block>
							<block v-if="idx == 1">
								<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="new_trade_password" />
								<input type="text" :placeholder="trade.text" v-else v-model="new_trade_password" />
							</block>
							<block v-if="idx == 2">
								<input type="password" :placeholder="trade.text" v-if="trade.type == 0" v-model="again_trade_password" />
								<input type="text" :placeholder="trade.text" v-else v-model="again_trade_password" />
							</block>
						</view>
						<switchc text="可见|***" class="switch_btn" :sid="idx" @change="switchchange1($event,idx)"></switchc>
					</view>
				</view>
				<button v-if="trade_password!='' && new_trade_password!='' && again_trade_password!=''" class="submit_btn red" @tap="submitForm1">确定</button>
				<button v-else class="submit_btn">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
    import switchc from '@/components/zz-switchc/zz-switchc.vue'
	export default{
		data(){
			return{
				title: '修改登录密码',
				password: '',
				new_password: '',
				again_password: '',
				trade_password: '',
				new_trade_password: '',
				again_trade_password: '',
				loginPwd: [
					{
						id: 1,
						text: '旧登录密码',
						type: 0
					},{
						id: 2,
						text: '新登录密码',
						type: 0
					},{
						id: 3,
						text: '确认登录密码',
						type: 0
					}
				],
				tradePwd: [
					{
						id: 4,
						text: '旧支付密码',
						type: 0
					},{
						id: 5,
						text: '支付密码',
						type: 0
					},{
						id: 6,
						text: '确认支付密码',
						type: 0
					}
				],
				type: 'login',
				paypwd: null
			}
		},
		components:{
			uniNavBar,
			switchc
		},
		onLoad(opt) {
			if(opt.type != undefined){
				this.type = opt.type;
				if(opt.type == 'login'){
					this.title = '修改登录密码';
				}else{
					this.title = '修改支付密码';
				}
			}
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				this.paypwd = data.data.result.paypwd;
			})
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
					old_password: this.password,
					new_password: this.new_password,
					token: uni.getStorageSync('token')
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.changePassword(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.password = '';
						this.new_password = '';
						this.again_password = '';
					}
				})
			},
			submitForm1(){
				// console.log(this.trade_password,this.new_trade_password,this.again_trade_password);
				// if(this.trade_password == this.again_trade_password){
				// 	this.$api.msg('旧密码与新密码一样');
				// 	return;
				// }
				if(this.new_trade_password != this.again_trade_password){
					this.$api.msg('新密码不一致');
					return;
				}
				let params = {
					token: uni.getStorageSync('token'),
					new_password: this.new_trade_password,
					confirm_password: this.again_trade_password
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.setPayPassword(params).then((data)=>{
					this.$api.msg(data.data.msg);
					if(data.data.status == 1){
						this.trade_password = '';
						this.new_trade_password = '';
						this.again_trade_password = '';
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.changePassword{
		background: #eee;
	}
	.form_box{
		padding: 30rpx;
		box-sizing: border-box;
		.basic_title{
			color: #999;
			font-size: 28rpx;
			padding-bottom: 15rpx;
			border-bottom: 1px solid #f2f2f2;
		}
		.form_item{
			background: #fff;
			padding: 30rpx 20rpx;
			margin-bottom: 30rpx;
			border-bottom: 0;
			border-radius: 10rpx;
			&.hide{
				display: none;
			}
			input{
				font-size: 28rpx;
			}
		}
	}
	.submit_btn{
		width: 100%;
		color: #bbb;
		background: #e6e6e6;
		margin: 50rpx 0 0;
		border-radius: 10rpx;
		&.red{
			color: #fff;
			background: #fa6570;
		}
	}
</style>

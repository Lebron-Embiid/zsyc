<template>
	<view>
		<uni-nav-bar left-icon="back" :title="title" rightText="保存" @clickRight="save"></uni-nav-bar>
		
		<view class="content">
			<view class="row">
				<view class="nominal">
					账户类型
				</view>
				<view class="input">
					<picker range-key="value" :range="accountType" @change="selectType">
						{{account_val}}
					</picker>
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					账号
				</view>
				<view class="input">
					<input placeholder="请填写收款账号" type="text" v-model="account_number" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					户名
				</view>
				<view class="input">
					<input placeholder="请填写户名" type="text" v-model="real_name" />
				</view>
			</view>
			<view class="row" v-if="account_txt == '' || account_txt == 'bank'">
				<view class="nominal">
					开户行
				</view>
				<view class="input">
					<input placeholder="请填写开户行" type="text" v-model="bank_name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal width">
					设为默认收款账号
				</view>
				<view class="input switch">
					<switch color="#4cd864" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除提现账号
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				title: '新建提现账号',
				editType:'add',
				id:'',
				account_number:'',
				bank_name:'',
				real_name:'',
				isDefault:false,
				accountType: [{name:'alipay',value:'支付宝'},{name:'bank',value:'银行卡'}],
				account_txt: '',
				account_val: '请选择收款账户类型',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				linkList: [],
				defaultVal: [],
				level: 3
			};
		},
		onLoad(e) {
			// let params = {token: uni.getStorageSync('token')};
			// let sign = this.$sign.getSign(params,this.AppSecret);
			// params.sign = sign;
			// this.$http.accountName(params).then((data)=>{
				
			// })
			//获取传递过来的参数
			if(e.type != undefined){
				this.editType = e.type;
			}
			if(e.type=='edit'){
				this.title = '编辑提现账号';
				uni.getStorage({
					key:'account',
					success: (e) => {
						console.log(e);
						this.id = e.data.id;
						this.bank_name = e.data.bank_name;
						this.account_number = e.data.account;
						this.account_txt = e.data.code;
						this.isDefault = e.data.is_default==0?false:true;
						this.real_name = e.data.realname;
						this.account_val = e.data.type;
					}
				})
			}
		},
		methods: {
			selectType(e) {
				console.log(e)
				this.account_txt = this.accountType[e.detail.value].name;
				this.account_val = this.accountType[e.detail.value].value;
			},
			isDefaultChange(e){
				this.isDefault = e.detail.value;
			},
			del(){
				uni.showModal({
					title: '删除提示',
					content: '确定删除该收款账号？',
					success: (res)=>{
						if (res.confirm) {
							let params = {
								token: uni.getStorageSync('token'),
								id: this.id
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.deleteAccount(params).then((data)=>{
								if(data.data.status == 1){
									this.$api.msg(data.data.result);
									setTimeout(()=>{
										uni.navigateBack();
									},1500)
								}else{
									this.$api.msg(data.data.msg);
								}
							})
						}
					}
				});
			},
			save(){
				if(this.account_txt == ''){
					this.$api.msg('请选择收款账户类型');
					return;
				}
				
				let is_default = '';
				if(this.isDefault == true){
					is_default = 1;
				}else{
					is_default = 0;
				}
				console.log(is_default);
				this.$Debounce.canDoFunction({
					key: "addAddress",
					time: 1500,
					success:()=>{
						if(this.editType == 'add'){
							let params = {
								token: uni.getStorageSync('token'),
								account: this.account_number,
								real_name: this.real_name,
								bank_name: this.bank_name,
								code: this.account_txt,
								is_default: is_default
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.addAccountName(params).then((data)=>{
								if(data.data.status == 1){
									this.$api.msg(data.data.result);
									this.account_number = '';
									this.real_name = '';
									this.bank_name = '';
									this.account_txt = '';
									this.account_val = '请选择收款账户类型';
									this.isDefault = false;
									setTimeout(()=>{
										uni.navigateBack();
									},1500)
								}else{
									this.$api.msg(data.data.msg);
								}
							})
						}else{
							let params = {
								id: this.id,
								token: uni.getStorageSync('token'),
								account: this.account_number,
								real_name: this.real_name,
								bank_name: this.bank_name,
								code: this.account_txt,
								is_default: is_default
							};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.editAccount(params).then((data)=>{
								if(data.data.status == 1){
									this.$api.msg(data.data.result);
									this.account_number = '';
									this.real_name = '';
									this.bank_name = '';
									this.account_txt = '';
									this.account_val = '请选择收款账户类型';
									this.isDefault = false;
									setTimeout(()=>{
										uni.navigateBack();
									},1500)
								}else{
									this.$api.msg(data.data.msg);
								}
							})
						}
					}
				})
				
				// let data={"name":this.name,"head":this.name.substr(0,1),"tel":this.tel,"address":{"region":this.region,"detailed":this.detailed},"isDefault":this.isDefault}
				// if(this.editType=='edit'){
				// 	data.id = this.id
				// }
				// if(!data.name){
				// 	uni.showToast({title:'请输入收件人姓名',icon:'none'});
				// 	return ;
				// }
				// if(!data.tel){
				// 	uni.showToast({title:'请输入收件人电话号码',icon:'none'});
				// 	return ;
				// }
				// if(!data.address.detailed){
				// 	uni.showToast({title:'请输入收件人详细地址',icon:'none'});
				// 	return ;
				// }
				// if(data.address.region.value.length==0){
				// 	uni.showToast({title:'请选择收件地址',icon:'none'});
				// 	return ;
				// }
				// uni.showLoading({
				// 	title:'正在提交'
				// })
				// //实际应用中请提交ajax,模板定时器模拟提交效果
				// setTimeout(()=>{
				// 	uni.setStorage({
				// 		key:'saveAddress',
				// 		data:data,
				// 		success() {
				// 			uni.hideLoading();
				// 			uni.navigateBack();
				// 		}
				// 	})
				// },300)
				
				
			}
		}
	}
</script>
<style scoped lang="scss">

.save{
		view{
			display: flex;
		}
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
		.btn{
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: rgb(255, 153, 0);
			color: #fff;
			justify-content: center;
			align-items: center;
			.icon{
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}
			font-size: 30upx;
		}
	}
	.content{
		display: flex;
		flex-wrap: wrap;
		view{
			display: flex;
		}
		.row{
			width: 94%;
			
			margin: 0 3%;
			border-top: solid 1upx #eee;
			.nominal{
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
				&.width{
					width: 50%;
				}
			}
			.input{
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;
				&.switch{
					justify-content: flex-end;
				}
				.textarea{
					margin: 20upx 0;
					min-height: 120upx;
				}
			}
			.del{
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: center;
				font-size: 36upx;
				color: #f06c7a;
				background-color: rgba(255,0,0,0.05);
				border-bottom: solid 1upx #eee;
			}
		}
	}
	
</style>

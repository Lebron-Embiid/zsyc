<template>
	<view>
		<uni-nav-bar left-icon="back" :title="title" rightText="保存" @clickRight="save"></uni-nav-bar>
		
		<view class="content">
			<view class="row">
				<view class="nominal">
					账户类型
				</view>
				<view class="input">
					<input placeholder="请填写收款账户类型" type="text" v-model="name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					账号
				</view>
				<view class="input">
					<input placeholder="请填写收款账号" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					开户行
				</view>
				<view class="input">
					<input placeholder="如果为银行卡请填写" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					户名
				</view>
				<view class="input">
					<input placeholder="如果为银行卡请填写" type="text" v-model="tel" />
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
				editType:'edit',
				id:'',
				name:'',
				tel:'',
				detailed:'',
				isDefault:false,
				cityPickerValue: [0, 0, 1],
				pickerValueDefault: [0, 1, 0],
				pickerText: '',
				themeColor: '#007AFF',
				region:{label:"请点击选择地址",value:[],cityCode:""},
				linkList: [],
				defaultVal: [],
				level: 3
			};
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			isDefaultChange(e){
				this.isDefault = e.detail.value;
			},
			del(){
				uni.showModal({
					title: '删除提示',
					content: '你将删除这个收货地址',
					success: (res)=>{
						if (res.confirm) {
							let params = {id: this.id};
							let sign = this.$sign.getSign(params,this.AppSecret);
							params.sign = sign;
							this.$http.delAddress(params).then((data)=>{
								
							})
							uni.setStorage({
								key:'delAddress',
								data:{id:this.id},
								success() {
									uni.navigateBack();
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			save(){
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
						let params = {
							token: uni.getStorageSync('token'),
							consignee: this.name,
							mobile: this.tel,
							province: this.region.value[0],
							city: this.region.value[1],
							district: this.region.value[2],
							address: this.detailed,
							is_default: is_default
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.addAddress(params).then((data)=>{
							this.$api.msg(data.data.msg);
							if(data.data.status == 1){
								setTimeout(()=>{
									uni.navigateBack();
								},1500)
							}
						})
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
		},
		onLoad(e) {
			let params = {};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			
			this.$http.getAreaList(params).then((data)=>{
				this.linkList = data.data;
				uni.setStorageSync('account',data.data);
				// console.log(this.linkList,this.defaultVal);
			})
			//获取传递过来的参数
			this.editType = e.type;
			if(e.type=='edit'){
				uni.getStorage({
					key:'account',
					success: (e) => {
						this.id = e.data.id;
						this.name = e.data.name;
						this.tel = e.data.tel;
						this.detailed = e.data.address.detailed;
						this.isDefault = e.data.isDefault;
						this.cityPickerValue = e.data.address.region.value;
						this.region = e.data.address.region;
					}
				})
			}
			
		}
	};
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

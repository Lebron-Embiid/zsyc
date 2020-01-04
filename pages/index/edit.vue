<template>
	<view>
		<uni-nav-bar left-icon="back" title="添加地址" rightText="保存" @clickRight="save"></uni-nav-bar>
		
		<view class="content">
			<view class="row">
				<view class="nominal">
					收货人
				</view>
				<view class="input">
					<input placeholder="请填写收货人姓名" type="text" v-model="name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					手机号
				</view>
				<view class="input">
					<input placeholder="请填写收货人手机号" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					所在地区
				</view>
				<view class="input" @tap="chooseCity">
					{{region.cityCode==""?region.label:region.cityCode}}
				</view>
				
			</view>
			<view class="row">
				<view class="nominal">
					详细地址
				</view>
				<view class="input">
					<textarea v-model="detailed" auto-height="true" placeholder="如街道、楼牌号等"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal width">
					设为默认收获地址
				</view>
				<view class="input switch">
					<switch color="#4cd864" :checked="isDefault" @change=isDefaultChange />
				</view>
			</view>
			<view class="row" v-if="editType=='edit'" @tap="del">
				<view class="del">
					删除收货地址
				</view>
			</view>
		</view>
		<!-- <view class="save" @tap="save">
			<view class="btn">
				保存地址
			</view>
		</view> -->
		<!-- <simple-address 
			ref="simpleAddress" 
			:pickerValueDefault="pickerValueDefault" 
			@onConfirm="onConfirm" 
			themeColor='#099'
		></simple-address> -->
		<w-picker
		    mode="linkage"
		    :level="3"
		    :defaultVal="['北京市','市辖区','东城区']"
		    @confirm="onConfirm"
		    ref="linkage"
		    :linkList="linkList"
		    themeColor="rgb(255, 153, 0)"
		></w-picker>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	// import simpleAddress from "@/components/simple-address/simple-address.nvue"
	export default {
		components: {
			uniNavBar,
			wPicker
			// simpleAddress
		},
		data() {
			return {
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
			chooseCity() {
				// this.$refs.mpvueCityPicker.show()
				this.$refs.linkage.show()
			},
			openAddres() {
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				// console.log(e);
				this.pickerText = JSON.stringify(e)
				this.region.value = e.checkValue;
				this.region.cityCode = e.result;
				console.log(this.region);
				// this.cityPickerValue = e.value;
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
				uni.setStorageSync('address',data.data);
				// console.log(this.linkList,this.defaultVal);
			})
			//获取传递过来的参数
			this.editType = e.type;
			if(e.type=='edit'){
				uni.getStorage({
					key:'address',
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
			
		},
		onUnload() {
			this.$refs.linkage.hide()
			// if (this.$refs.mpvueCityPicker.showPicker) {
			// 	this.$refs.mpvueCityPicker.pickerCancel()
			// }
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

<template>
	<view class="person_info">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="个人信息"></uni-nav-bar>
		<view class="setting_box avatar_box line" @tap="selectAvatar">
			<view class="set_left">头像</view>
			<view class="set_right"><image class="avatar" :src="avatar" mode="widthFix"></image><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box line" @tap="changeUserName">
			<view class="set_left">用户名</view>
			<view class="set_right">{{username}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<navigator :url="'/pages/person/edit_name?name='+nickname" class="setting_box line">
			<view class="set_left">昵称</view>
			<view class="set_right">{{nickname}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<view class="setting_box line" @tap="selectSex">
			<view class="set_left">性别</view>
			<view class="set_right">{{sex_name}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<picker mode="date" @change="selectBirth" :value="birth">
			<view class="setting_box">
				<view class="set_left">出生日期</view>
				<view class="set_right">{{birth}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
			</view>
		</picker>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import util from "@/common/util.js"
	export default{
		data(){
			return{
				avatar: '',
				avatar1: '',
				avatarList: ['拍照','我的相册'],
				username: '',
				nickname: '',
				sexIndex: 0,
				sex_name: '',
				sex: ['保密','男', '女'],
				birth: ''
			}
		},
		components:{
			uniNavBar
		},
		onShow() {
			let params = {
				token: uni.getStorageSync('token')
			};
			let sign = this.$sign.getSign(params,this.AppSecret);
			params.sign = sign;
			this.$http.getUserInfo(params).then((data)=>{
				if(data.data.result.head_pic != '/public/image/toux-icon.png'){
					this.avatar = this.$http.url+data.data.result.head_pic;
				}else{
					this.avatar = '/static/avatar/avatar.png';
				}
				this.username = data.data.result.mobile;
				this.nickname = data.data.result.nickname;
				
				let sex = data.data.result.sex;
				switch(sex){
					case 0: 
						this.sex_name = '保密';
						this.sexIndex = 0;
						break;
					case 1:
						this.sex_name = '男';
						this.sexIndex = 1;
						break;
					default:
						this.sex_name = '女';
						this.sexIndex = 2;
						break;
				}
				
				let date = new Date();
				let year = date.getFullYear()
				let month = date.getMonth()<10?'0' + (date.getMonth() + 1):date.getMonth() + 1
				let day = date.getDate()<10?'0' + date.getDate():date.getDate()
				if(data.data.result.birthday != 0){
					this.birth = util.formatDate(data.data.result.birthday);
				}else{
					this.birth = year+'-'+month+'-'+day;
				}
			})
		},
		methods:{
			selectAvatar(){
				let that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['camera','album'], //从相册选择
				    success: function (res) {
				        console.log(JSON.stringify(res.tempFilePaths));
						
						let params = {
							'token': uni.getStorageSync('token'),
							'path': 'head_pic'
						};
						let sign = that.$sign.getSign(params,that.AppSecret);
						params.sign = sign;
						
						uni.uploadFile({
							url: that.$http.url+'Api/User/uploadFiles', //图片接口
							filePath: res.tempFilePaths[0],
							name: 'file',
							header:{
								'timestamp': new Date().getTime()
							},
							formData: params,
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data);
								if(data.status == 1){
									that.avatar = that.$http.url + data.result;
									that.avatar1 = data.result;
								
									let params = {
										token: uni.getStorageSync('token'),
										head_pic: that.avatar1
									};
									let sign = that.$sign.getSign(params,that.AppSecret);
									params.sign = sign;
									that.$http.updateUserInfo(params).then((data)=>{})
								}else{
									that.$api.msg(data.msg);
								}
							}
						})
				    }
				});
			},
			changeUserName(){
				this.$api.msg('用户名不支持修改哟！');
			},
			selectSex(){
				let that = this;
				uni.showActionSheet({
					itemList: that.sex,
					success:(res)=>{
						this.sexIndex = res.tapIndex;
						this.sex_name = this.sex[res.tapIndex];
						let params = {
							token: uni.getStorageSync('token'),
							sex: this.sexIndex
						};
						let sign = this.$sign.getSign(params,this.AppSecret);
						params.sign = sign;
						this.$http.updateUserInfo(params).then((data)=>{})
					}
				})
			},
			selectBirth(e){
				this.birth = e.detail.value;
				let params = {
					token: uni.getStorageSync('token'),
					birthday: this.birth
				};
				let sign = this.$sign.getSign(params,this.AppSecret);
				params.sign = sign;
				this.$http.updateUserInfo(params).then((data)=>{})
			}
		}
	}
</script>

<style scoped lang="scss">
	.person_info{
		background: #eee;
	}
</style>
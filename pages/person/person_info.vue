<template>
	<view class="person_info">
		<view class="page_bg"></view>
		<uni-nav-bar left-icon="back" title="个人信息"></uni-nav-bar>
		<view class="setting_box avatar_box line" @tap="selectAvatar">
			<view class="set_left">头像</view>
			<view class="set_right"><image class="avatar" :src="avatar" mode="widthFix"></image><image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<view class="setting_box line">
			<view class="set_left">用户名</view>
			<view class="set_right">715627319<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<navigator url="/pages/person/edit_name" class="setting_box line">
			<view class="set_left">昵称</view>
			<view class="set_right">小靓<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</navigator>
		<view class="setting_box line" @tap="selectSex">
			<view class="set_left">性别</view>
			<view class="set_right">{{sex[sexIndex]}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
		</view>
		<picker mode="date" @change="selectBirth">
			<view class="setting_box">
				<view class="set_left">出生日期</view>
				<view class="set_right">{{birth}}<image class="arrow" src="/static/icon/arrow.png" mode="widthFix"></image></view>
			</view>
		</picker>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default{
		data(){
			return{
				avatar: '/static/avatar/avatar.png',
				avatarList: ['拍照','我的相册'],
				sexIndex: 0,
				sex: ['男', '女', '保密'],
				birth: '2008-08-18'
			}
		},
		components:{
			uniNavBar
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
							'path': 'comment'
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
								}else{
									that.$api.msg(data.msg);
								}
							}
						})
				    }
				});
			},
			selectSex(){
				let that = this;
				uni.showActionSheet({
					itemList: that.sex,
					success:(res)=>{
						this.sexIndex = res.tapIndex;
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						console.log(this.sex[res.tapIndex]);
					}
				})
			},
			selectBirth(e){
				this.birth = e.detail.value;
			}
		}
	}
</script>

<style scoped lang="scss">
	.person_info{
		background: #eee;
	}
</style>
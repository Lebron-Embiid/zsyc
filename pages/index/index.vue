<template>
	<view class="content">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.loadExecution();
		},
		methods: {
			loadExecution: function(){
				/**
				 * 获取本地存储中launchFlag的值
				 * 若存在，说明不是首次启动，直接进入首页；
				 * 若不存在，说明是首次启动，进入引导页；
				 */
				try {
					// uni.clearStorageSync('launchFlag');
				    let value = uni.getStorageSync('launchFlag');
					console.log('launchFlag:'+value);
					let token = uni.getStorageSync('token');
					console.log('token:'+token);
					if(token != ''){
						uni.switchTab({
							url: '/pages/index/shop'
						})
						return;
					}
				    if (value) {
				        if (value == true) {
				            uni.redirectTo({
				                url: '/pages/login/login'
				            });
				        } else {
				            uni.redirectTo({
				                url: '/pages/index/guide'
				            });
				        }
				    } else {
						uni.setStorage({
							key: 'launchFlag', 
							data: true, 
							success: function () {
								console.log('error时存储launchFlag');
							} 
						}); 
				        uni.redirectTo({
				            url: '/pages/index/guide'
				        });
				    }
				} catch(e) {
					// error 
					uni.setStorage({ 
						key: 'launchFlag', 
						data: true, 
						success: function () {
							console.log('error时存储launchFlag');
						} 
					}); 
					uni.redirectTo({ url: '/pages/index/guide' }); 
				}
				return;
				uni.redirectTo({
				    url: '/pages/login/login'
				});
			}
		}
	}
</script>

<style>
	
</style>

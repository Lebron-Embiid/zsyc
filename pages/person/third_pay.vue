<template>
	<view class="third_pay">
		<web-view :url="url"></web-view>
		<!-- <u-parse :content="url"></u-parse> -->
	</view>
</template>

<script>
	import uParse from "@/components/u-parse/u-parse.vue"
	export default{
		data(){
			return{
				url: ''
			}
		},
		components:{
			uParse
		},
		onLoad(opt) {
			let url = opt.url;
			console.log(url);
			this.url = url;
						
			// #ifdef APP-PLUS
			if(uni.getSystemInfoSync().platform == 'android'){
				plus.runtime.openURL(this.url);
			}
			if(uni.getSystemInfoSync().platform == 'ios'){
				plus.runtime.install(this.url);
			}
			// #endif
			
			// console.log(this.url);
			// if(opt.order_id != undefined){
			// 	this.order_id = opt.order_id;
			// 	this.pay_radio = opt.pay_radio;
			// 	this.url = this.$http.url + 'index.php/Api/Payment/getPay/order_id/'+this.order_id+'/pay_radio/pay_code='+this.pay_radio
			// 	console.log(this.url);
			// }
		}
	}
</script>

<style>
</style>

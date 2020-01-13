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
			setTimeout(()=>{
				this.url = url;
			},5000)
			
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

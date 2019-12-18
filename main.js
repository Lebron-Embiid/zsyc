import Vue from 'vue'
import App from './App'
import api from '@/common/vmeitime-http/'
import Debounce from '@/common/debounce.js'

Vue.config.productionTip = false

App.mpType = 'app'

const msg = (title, duration=1500, mask=true, icon='none')=>{ 
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

Vue.prototype.$Debounce = Debounce;
Vue.prototype.$http = api;
Vue.prototype.$api = {msg};

const app = new Vue({
    ...App
})
app.$mount()

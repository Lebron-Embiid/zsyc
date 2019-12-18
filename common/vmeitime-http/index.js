import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
export const url = http.config.baseUrl
// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log(response)
		
		// if(response.data.status == 40001){
		// 	setTimeout(function(){
		// 		uni.reLaunch({
		// 			url: '/pages/login/login'
		// 		})
		// 	},1500)
		// }
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data
    })
}

// 登录
// export const checkLogin = (data) => {
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 			'AUTHORIZATION': uni.getStorageSync('token')
// 		}
// 	}
//     return http.request({
//         url: 'Login/checkLogin',
//         method: 'POST', 
//         data
// 		// handle:true
//     })
// }
// // 注册
// export const formRegister = (data) => {
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 			'AUTHORIZATION': uni.getStorageSync('token')
// 		}
// 	}
//     return http.request({
//         url: 'Login/register',
//         method: 'POST', 
//         data
// 		// handle:true
//     })
// }
// // 找回密码
// export const forgetPassword = (data) => {
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 			'AUTHORIZATION': uni.getStorageSync('token')
// 		}
// 	}
//     return http.request({
//         url: 'Login/setpsw',
//         method: 'POST', 
//         data
//     })
// }
// // 发送邮箱验证码
// export const sendEmailCode = (data) => {
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 			'AUTHORIZATION': uni.getStorageSync('token')
// 		}
// 	}
//     return http.request({
//         url: 'Home/Login/sendEmailCode',
//         method: 'POST', 
//         data
//     })
// }
// // 资讯列表
// export const getNewsList = (data) => {
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
// 			'AUTHORIZATION': uni.getStorageSync('token')
// 		}
// 	}
// 	http.interceptor.response = (response) => {
// 		if(response.data.status === 40001){
// 			uni.showToast({
// 				title: '登录失效,请重新登录',
// 				icon: 'none',
// 				duration: 1500,
// 				mask: true
// 			});
// 			uni.removeStorageSync('token');
// 			setTimeout(function(){
// 				uni.reLaunch({
// 					url: '/pages/login/login'
// 				})
// 			},1500)
// 			return;
// 		}
// 		if(response.data.status === 40002){
// 			uni.showToast({
// 				title: '账号已冻结',
// 				icon: 'none',
// 				duration: 1500,
// 				mask: true
// 			});
// 			uni.removeStorageSync('token');
// 			setTimeout(function(){
// 				uni.reLaunch({
// 					url: '/pages/login/login'
// 				})
// 			},1500)
// 			return;
// 		}
// 	}
//     return http.request({
//         url: 'News/index',
//         method: 'POST', 
//         data
//     })
// }

// if(data.data.status == 40001){
// 	this.$api.msg('请登录');
// 	setTimeout(function(){
// 		uni.reLaunch({
// 			url: '/pages/login/login'
// 		})
// 	},1500)
// }


// this.$http.formRegister({
					
// }).then((data)=>{
	// this.$api.msg(data.data.message);
	// if(data.data.status == 1){
		
	// }
// }).catch((err)=>{
	
// })

// 防重复点击
// this.$Debounce.canDoFunction({
// 	key: "getcode",
// 	time: 1500,
// 	success:()=>{
		
// 	}
// })

// 来解除事件锁定
// this.$Debounce.releaseKey("getcode");

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	url,
	test
}
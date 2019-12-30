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
export const userLogin = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/login',
        method: 'POST', 
        data
    })
}
// 注册
export const userRegister = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/reg',
        method: 'POST', 
        data
    })
}
// 找回密码
export const forgetPassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/forgetPassword',
        method: 'POST', 
        data
    })
}
// 发送验证码
export const sendValidateCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/send_validate_code',
        method: 'POST', 
        data
    })
}
// 修改用户密码
export const changePassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/password',
        method: 'POST', 
        data
    })
}


// 首页
export const getIndexList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status === 40001){
			uni.showToast({
				title: '登录失效,请重新登录',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
		if(response.data.status === 40002){
			uni.showToast({
				title: '账号已冻结',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
	}
    return http.request({
        url: 'Api/Index/home',
        method: 'POST', 
        data
    })
}

// 获取商品一级分类
export const getGoodsCategoryList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/goodsCategoryList',
        method: 'POST', 
        data
    })
}
// 获取商品子级分类
export const getGoodsSecAndThirdCategoryList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/goodsSecAndThirdCategoryList',
        method: 'POST', 
        data
    })
}
// 商品列表
export const getGoodsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/goodsList',
        method: 'POST', 
        data
    })
}
// 商品详情
export const getGoodsInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/goodsInfo',
        method: 'POST', 
        data
    })
}
// 商品评论
export const getGoodsComment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/getGoodsComment',
        method: 'POST', 
        data
    })
}
// 添加购物车
export const addCar = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Cart/addCart',
        method: 'POST', 
        data
    })
}
// 购物车列表
export const carList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102'){
			uni.showToast({
				title: '登录超时,请重新登录!',
				icon: 'none',
				duration: 1500,
				mask: true
			});
			uni.removeStorageSync('token');
			setTimeout(function(){
				uni.reLaunch({
					url: '/pages/login/login'
				})
			},1500)
			return;
		}
	}
    return http.request({
        url: 'Api/Cart/cartList',
        method: 'POST', 
        data
    })
}
// 删除购物车
export const delCar = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Cart/delCart',
        method: 'POST', 
        data
    })
}
// 购物车确认结算
export const carConfirm = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Cart/cart2',
        method: 'POST', 
        data
    })
}

// 确认提交订单
export const submitConfirm = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Cart/cart3',
        method: 'POST', 
        data
    })
}

// 订单列表 
export const getOrderList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getOrderList',
        method: 'POST', 
        data
    })
}
// 取消订单 
export const cancelOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/cancelOrder',
        method: 'POST', 
        data
    })
}


// 获取省市区
export const getAreaList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/getAreaList',
        method: 'POST', 
        data
    })
}
// 获取省市 
export const getProvince = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/getPro',
        method: 'POST', 
        data
    })
}
// 获取省市 
export const getCity = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/getCity',
        method: 'POST', 
        data
    })
}
// 获取地区 
export const getArea = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/getArea',
        method: 'POST', 
        data
    })
}

// 添加收货地址 
export const addAddress = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/addAddress',
        method: 'POST', 
        data
    })
}
// 添加收货地址 
export const getAddressList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getAddressList',
        method: 'POST', 
        data
    })
}
// 删除收货地址 
export const delAddress = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/del_address',
        method: 'POST', 
        data
    })
}
// 设置默认收货地址 
export const setDefaultAddress = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/setDefaultAddress',
        method: 'POST', 
        data
    })
}
// 订单详情 
export const getOrderDetail = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getOrderDetail',
        method: 'POST', 
        data
    })
}
// 申请退货退款 
export const returnGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/return_goods',
        method: 'POST', 
        data
    })
}
// 获取退货服务类型 
export const returnGoodReason = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Home/Api/returnGoodReason',
        method: 'POST', 
        data
    })
}
// 售后详情 
export const returnGoodsInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/return_goods_info',
        method: 'POST', 
        data
    })
}
// 退换货列表 
export const returnGoodsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/return_goods_list',
        method: 'POST', 
        data
    })
}
// 订单确认收货 
export const orderConfirm = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/orderConfirm',
        method: 'POST', 
        data
    })
}
// 添加订单评论 
export const orderCommentAdd = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/order_comment_add',
        method: 'POST', 
        data
    })
}
// 获取用户信息 
export const getUserInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/userInfo',
        method: 'POST', 
        data
    })
}
// 修改用户信息 
export const updateUserInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/updateUserInfo',
        method: 'POST',
        data
    })
}
// 收藏或取消收藏商品 
export const collectGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Goods/collectGoods',
        method: 'POST',
        data
    })
}
// 收藏或取消收藏店铺 
export const collectStoreOrNo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Store/collectStoreOrNo',
        method: 'POST',
        data
    })
}
// 获取收藏店铺列表 
export const getUserCollectStore = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getUserCollectStore',
        method: 'POST',
        data
    })
}
// 获取收藏商品列表 
export const getUserCollectGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getUserCollectGoods',
        method: 'POST',
        data
    })
}

// 获取收藏商品列表 
export const articleClass = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/articleClass',
        method: 'POST',
        data
    })
}

// if(data.data.status == 40001){
// 	this.$api.msg('请登录');
// 	setTimeout(function(){
// 		uni.reLaunch({
// 			url: '/pages/login/login'
// 		})
// 	},1500)
// }

// let params = {
// 	token: uni.getStorageSync('token')
// };
// let sign = this.$sign.getSign(params,this.AppSecret);
// params.sign = sign;
// this.$http.getUserInfo(params).then((data)=>{
	
// })

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
	test,
	userLogin,
	forgetPassword,
	userRegister,
	sendValidateCode,
	changePassword,
	getIndexList,
	getGoodsCategoryList,
	getGoodsSecAndThirdCategoryList,
	getGoodsList,
	getGoodsInfo,
	getGoodsComment,
	addCar,
	carList,
	delCar,
	carConfirm,
	submitConfirm,
	getOrderList,
	cancelOrder,
	getAreaList,
	getProvince,
	getCity,
	getArea,
	addAddress,
	getAddressList,
	delAddress,
	setDefaultAddress,
	getOrderDetail,
	returnGoods,
	returnGoodReason,
	returnGoodsInfo,
	returnGoodsList,
	orderConfirm,
	orderCommentAdd,
	getUserInfo,
	updateUserInfo,
	collectGoods,
	collectStoreOrNo,
	getUserCollectStore,
	getUserCollectGoods,
	articleClass
}
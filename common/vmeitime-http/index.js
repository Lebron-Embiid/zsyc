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
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/getUserCollectGoods',
        method: 'POST',
        data
    })
}

// 获取发现分类列表 
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
// 获取发现文章列表 
export const articleList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/articleList',
        method: 'POST',
        data
    })
}
// 获取文章内容 
export const getArticleDetail = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/detail',
        method: 'POST',
        data
    })
}
// 文章点赞 
export const ArticleLike = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/articleLike',
        method: 'POST',
        data
    })
}
// 文章收藏 
export const articleCollect = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Article/articleCollect',
        method: 'POST',
        data
    })
}
// 获取用户文章收藏 
export const getUserCollectArticle = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/getUserCollectArticle',
        method: 'POST',
        data
    })
}
// 文章评论 
export const articleComment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Article/articleComment',
        method: 'POST',
        data
    })
}
// 获取文章评论列表 
export const getCommentList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Article/getCommentList',
        method: 'POST',
        data
    })
}
// 文章评论点赞 
export const articleCommentLike = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/articleCommentLike',
        method: 'POST',
        data
    })
}

// 设置支付密码 
export const setPayPassword = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/payPassword',
        method: 'POST',
        data
    })
}
// 上传图片 
export const uploadFiles = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/uploadFiles',
        method: 'POST',
        data
    })
}

// 收款方式类型 
export const payType = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserPayment/payType',
        method: 'POST',
        data
    })
}
// 添加收款方式 
export const addPayment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserPayment/add',
        method: 'POST',
        data
    })
}
// 删除收款方式 
export const deletePayment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserPayment/delete',
        method: 'POST',
        data
    })
}
// 收款方式列表 
export const paymentList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserPayment/paymentList',
        method: 'POST',
        data
    })
}
// 设置收款方式状态
export const setDefaultStatus = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserPayment/setDefaultStatus',
        method: 'POST',
        data
    })
}
// 设置会员资格挂卖
export const setUserCount = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserCount/add',
        method: 'POST',
        data
    })
}
// 会员上级资格挂卖 
export const getParentCount = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserCount/getParentCount',
        method: 'POST',
        data
    })
}

// 会员资格挂卖列表
export const getUserCountlist = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserCount/listData',
        method: 'POST',
        data
    })
}
// 取消挂卖
export const cancelUserCount = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCount/cancel',
        method: 'POST',
        data
    })
}
// 购买资格下单
export const addUserCountOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/add',
        method: 'POST',
        data
    })
}
// 购买资格订单列表
export const userCountOrderList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserCountOrder/listData',
        method: 'POST',
        data
    })
}
// 购买资格订单详情
export const userCountOrderInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserCountOrder/info',
        method: 'POST',
        data
    })
}
// 资格订单买家确认付款
export const userCountOrderConfirmOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/confirmOrder',
        method: 'POST',
        data
    })
}
// 买家取消订单
export const userCountOrderCancel = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/cancel',
        method: 'POST',
        data
    })
}
// 卖家确认会员资格订单
export const userCountSuccessOrder = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/successOrder',
        method: 'POST',
        data
    })
}
// 买家申诉反馈类型
export const buyApplyType = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/buyApplyType',
        method: 'POST',
        data
    })
}
// 卖家申诉反馈类型
export const sellApplyType = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/sellApplyType',
        method: 'POST',
        data
    })
}
// 发起申诉
export const appeal = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/appeal',
        method: 'POST',
        data
    })
}
// 查看回复
export const appealList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserCountOrder/appealList',
        method: 'POST',
        data
    })
}
// 会员升级页面
export const vipLevel = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/level',
        method: 'POST',
        data
    })
}
// 提交升级
export const applyLevel = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/applyLevel',
        method: 'POST',
        data
    })
}
// 升级申请记录
export const applyLevelList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/applyLevelList',
        method: 'POST',
        data
    })
}
// 帮助中心
export const helpList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Article/helpList',
        method: 'POST',
        data
    })
}
// 推荐二维码
export const shareCode = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/shareCode',
        method: 'POST',
        data
    })
}
// 我的收益
export const getReward = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Reward/index',
        method: 'POST',
        data
    })
}
// 获取级别
export const getLevel = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Reward/getLevel',
        method: 'POST',
        data
    })
}

// 我的会员
export const myTeam = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Reward/myTeam',
        method: 'POST',
        data
    })
}
// 奖金类型名称
export const rewardName = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Reward/rewardName',
        method: 'POST',
        data
    })
}

// 收益列表
export const rewardListData = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Reward/listData',
        method: 'POST',
        data
    })
}

// 商城订单支付页面
export const shopOrderPay = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Cart/cart4',
        method: 'POST',
        data
    })
}
// 调取第三方支付（提交支付）
export const thirdPay = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Payment/getCode',
        method: 'POST',
        data
    })
}
// 提现收款类型
export const accountName = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/accountName',
        method: 'POST',
        data
    })
}
// 添加提现收款账号
export const addAccountName = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/add',
        method: 'POST',
        data
    })
}
// 设置提现账号默认状态
export const setAccountDefault = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/setDefaultStatus',
        method: 'POST',
        data
    })
}
// 编辑提现收款账号
export const editAccount = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/edit',
        method: 'POST',
        data
    })
}
// 删除提现收款账号
export const deleteAccount = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/delete',
        method: 'POST',
        data
    })
}
// 获取默认提现账号
export const getAccountDefault = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/UserBank/getDefault',
        method: 'POST',
        data
    })
}

// 提现收款账号列表
export const getAccountList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/UserBank/listData',
        method: 'POST',
        data
    })
}

// 提现申请页面
export const withdrawApply = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/withdrawalsIndex',
        method: 'POST',
        data
    })
}
// 申请提现
export const withdrawals = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/withdrawals',
        method: 'POST',
        data
    })
}
// 提现申请列表
export const withdrawalsList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/withdrawalsList',
        method: 'POST',
        data
    })
}
// 提现订单详情
export const withdrawalsInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/withdrawalsInfo',
        method: 'POST',
        data
    })
}
// 提现确认同意
export const withdrawalsConfirm = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/withdrawalsConfirm',
        method: 'POST',
        data
    })
}
// 获取在线支付方式 
export const onlinePay = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/onlinePay',
        method: 'POST',
        data
    })
}
// 申请充值 
export const recharge = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/User/recharge',
        method: 'POST',
        data
    })
}
// 充值订单第三方支付 
export const getPayThird = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Payment/getPay',
        method: 'GET',
        data
    })
}
// 充值列表 
export const rechargeList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/User/rechargeList',
        method: 'POST',
        data
    })
}
// 消息通知列表 
export const getNoticesList = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'Api/Notices/listData',
        method: 'POST',
        data
    })
}
// 消息通知详情 
export const getNoticesInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/Notices/info',
        method: 'POST',
        data
    })
}

// 优惠活动文章列表 
export const getDiscountArticle = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/DiscountArticle/listData',
        method: 'POST',
        data
    })
}
// 优惠活动文章详情 
export const getArticleInfo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'Api/DiscountArticle/info',
        method: 'POST',
        data
    })
}
// 我的套餐
export const getCombo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'api/User/combo',
        method: 'POST',
        data
    })
}
// 立即选购套餐
export const urchase_once = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'api/User/urchase_once',
        method: 'POST',
        data
    })
}

// 获取线上发货专区
export const setThezone = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'api/Index/setThezone',
        method: 'POST',
        data
    })
}
// 获取线下提货专区
export const getStreet = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'api/Store/street',
        method: 'POST',
        data
    })
}
// 获取店铺商品列表
export const getStoreGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'api/Store/storeGoods',
        method: 'POST',
        data
    })
}
// 店铺信息
export const getStoreAbout = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'api/Store/about',
        method: 'POST',
        data
    })
}
// 商品搜索
export const searchGoods = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'api/Goods/search',
        method: 'POST',
        data
    })
}
// 文章搜索
export const searchArticle = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'api/Article/search',
        method: 'POST',
        data
    })
}
// 套餐提交订单
export const cartCombo = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
    return http.request({
        url: 'api/Cart/cartCombo',
        method: 'POST',
        data
    })
}
// 评论订单
export const userComment = (data) => {
	http.interceptor.request = (config) => {
		config.header = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			'token': uni.getStorageSync('token'),
			'timestamp': new Date().getTime()
		}
	}
	http.interceptor.response = (response) => {
		if(response.data.status == '-102' || response.data.status == '-101' || response.data.status == '-100'){
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
        url: 'api/User/comment',
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
	articleClass,
	articleList,
	getArticleDetail,
	ArticleLike,
	articleCollect,
	getUserCollectArticle,
	articleComment,
	getCommentList,
	articleCommentLike,
	setPayPassword,
	uploadFiles,
	payType,
	addPayment,
	deletePayment,
	paymentList,
	setDefaultStatus,
	setUserCount,
	getParentCount,
	getUserCountlist,
	cancelUserCount,
	addUserCountOrder,
	userCountOrderList,
	userCountOrderInfo,
	userCountOrderConfirmOrder,
	userCountOrderCancel,
	userCountSuccessOrder,
	buyApplyType,
	sellApplyType,
	appeal,
	appealList,
	vipLevel,
	applyLevel,
	applyLevelList,
	helpList,
	shareCode,
	getReward,
	getLevel,
	myTeam,
	rewardName,
	rewardListData,
	shopOrderPay,
	thirdPay,
	accountName,
	addAccountName,
	setAccountDefault,
	editAccount,
	deleteAccount,
	getAccountDefault,
	getAccountList,
	withdrawApply,
	withdrawals,
	withdrawalsList,
	withdrawalsInfo,
	withdrawalsConfirm,
	onlinePay,
	recharge,
	getPayThird,
	rechargeList,
	getNoticesList,
	getNoticesInfo,
	getDiscountArticle,
	getArticleInfo,
	getCombo,
	urchase_once,
	setThezone,
	getStreet,
	getStoreGoods,
	getStoreAbout,
	searchGoods,
	searchArticle,
	cartCombo,
	userComment
}
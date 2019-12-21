<template>
	<view>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="back"><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view> 
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon" @tap="toHome"><image src="/static/icon/home.png" mode="widthFix"></image></view>
					<view class="icon" @tap="toShare"><image src="/static/icon/share_icon.png" mode="widthFix"></image></view>
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<!-- <view class="icon cart" @tap="joinCart"></view> -->
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="back" ><view class="icon xiangqian" @tap="back" v-if="showBack"></view></view>
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon" @tap="toHome"><image src="/static/icon/home1.png" mode="widthFix"></image></view>
					<view class="icon" @tap="toShare"><image src="/static/icon/share_icon1.png" mode="widthFix"></image></view>
					<!-- <view class="icon tongzhi" @tap="toMsg"></view> -->
					<!-- <view class="icon cart" @tap="joinCart"></view> -->
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box" @tap="toCostomer">
					<view class="icon kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="keep">
					<view class="icon" :class="[isKeep?'shoucangsel':'shoucang']"></view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>
		<!-- share弹窗 -->
		<view class="share" :class="shareClass" @touchmove.stop.prevent="discard" @tap="hideShare">
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="h1">分享</view>
				<view class="list">
					<view class="box">
						<image src="../../static/share/wx.png"></image>
						<view class="title">
							微信好友
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/pyq.png"></image>
						<view class="title">
							朋友圈
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/wb.png"></image>
						<view class="title">
							新浪微博
						</view>
					</view>
					<view class="box">
						<image src="../../static/share/qq.png"></image>
						<view class="title">
							QQ
						</view>
					</view>
				</view>
				<view class="btn" @tap="hideShare">
					取消
				</view>
			</view>
			
		</view>
		<!-- 快递-模态层弹窗 -->
		<view class="popup service" :class="serviceClass" @tap="hideService">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" style="overflow-y: scroll;" @tap.stop="discard">
				<view class="layer_goods_box" style="align-items: center;">
					<view></view>
					<view>快递</view>
					<image src="/static/icon/close1.png" @tap="hideService" class="close_img" mode="widthFix"></image>
				</view>
				<view class="courier_box">
					<view class="courier_item" @tap="selectCourier(index)" v-for="(item,index) in goodsData.couriers" :key="index">
						<text class="cour_label">{{item.label}}</text>
						<view class="cour_right">
							<view class="cr_title">{{item.from}}至 <text>{{item.to}}</text></view>
							<view class="cr_price">快递：{{item.price}}</view>
						</view>
					</view>
				</view>
				<!-- <view class="content">
					<view class="row" v-for="(item,index) in goodsData.service" :key="index">
						<view class="title">{{item.name}}</view>
						<view class="description">{{item.description}}</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="hideService">完成</view></view> -->
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" style="overflow-y: scroll;" @tap.stop="discard">
				<view class="layer_goods_box">
					<image src="/static/img/order_img3.png" mode="widthFix"></image>
					<view class="layer_goods_info">
						<view class="lgi_title">价格：<text>￥28</text></view>
						<view class="lgi_title">额度：<text>￥723</text></view>
						<view>库存：<text>8778</text></view>
					</view>
					<image src="/static/icon/close1.png" @tap="hideSpec" class="close_img" mode="widthFix"></image>
				</view>
				<view class="content layer_goods_content">
					<view class="spec_item" v-for="(item,index) in goodsData.spec" :key="index">
						<view class="title">{{item.title}}</view>
						<view class="sp">
							<view v-for="(list,idx) in item.list" :class="[list.isShow?'on':'',subIndex[index] == idx?'on':'']" @tap="setSelectSpec(list.name,index,$event,idx)" :key="idx">{{list.name}}</view>
						</view>
					</view>
					<!-- v-if="selectSpec!=null" -->
					<view class="length" >
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="goodsData.number" />
							</view>
							<view class="add"  @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn"><view class="button" @tap="finishSpec(btn)">完成</view></view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in swiperList" :key="swiper.id">
					<image :src="swiper.img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">
				<view
					class="dots"
					v-for="(swiper, idx) in swiperList"
					:class="[currentSwiper == idx ? 'on' : '']"
					:key="idx"
				></view>
			</view>
			<view class="layer_words_box">
				<text class="lwb_title">女士套餐</text>
				<text>衬衫</text>
				<button type="primary" size="mini">前往折扣区单购</button>
				<text>未选</text>
			</view>
			<!-- <view class="indicator">{{currentSwiper+1}}/{{swiperList.length}}</view> -->
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="title">
				{{goodsData.name}}
			</view>
			<view class="spec_info">{{goodsData.info}}</view>
			<!-- <view class="price">￥{{goodsData.price}} <text v-if="goodsData.old_price != null">￥{{goodsData.old_price}}</text></view> -->
			<view class="stock">库存：{{goodsData.stock}}</view>
		</view>
		<!-- 服务-规则选择 -->
		<view class="info-box spec">
			<view class="row" @tap="showSpec(false)">
				<!-- <view class="text">选择</view> -->
				<view class="content">
					<view>请选择规格数量</view>
					<!-- <view class="sp">
						<view v-for="(item,index) in goodsData.spec" :key="index" :class="[index==selectSpec?'on':'']">{{item}}</view>
					</view>
					 -->
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
			<view class="row" @tap="showService">
				<!-- <view class="text">服务</view> -->
				<view class="content">
					<view>请选择快递方式</view>
					<!-- <view class="serviceitem" v-for="(item,index) in goodsData.service" :key="index">{{item.name}}</view> -->
				</view>
				<view class="arrow"><view class="icon xiangyou"></view></view>
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments">
			<view class="row">
				<view class="text">用户评价({{goodsData.comment.number}})</view>
				<view class="arrow" @tap="toRatings">
					<view class="show" @tap="showComments(goodsData.id)">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toRatings">
				<view class="user-info">
					<view class="face"><image :src="goodsData.comment.userface"></image></view>
					<view class="username">{{goodsData.comment.username}}</view>
				</view>
				<view class="content">
					{{goodsData.comment.content}}
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description">
			<view class="title">———— 商品详情 ————</view>
			<view class="content">
				<block v-if="descriptionStr!=''">
					<u-parse :content="descriptionStr"></u-parse>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
import uParse from '@/components/u-parse/u-parse.vue'
export default {
	data() {
		return {
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11,//层级
			afterHeaderzIndex: 10,//层级
			beforeHeaderOpacity: 1,//不透明度
			afterHeaderOpacity: 0,//不透明度
			//是否显示返回按钮
			// #ifndef MP
			showBack:true,
			// #endif
			//轮播主图数据
			swiperList: [
				{ id: 1, img: 'https://ae01.alicdn.com/kf/HTB1Mj7iTmzqK1RjSZFjq6zlCFXaP.jpg' },
				{ id: 2, img: 'https://ae01.alicdn.com/kf/HTB1fbseTmzqK1RjSZFLq6An2XXaL.jpg' },
				{ id: 3, img: 'https://ae01.alicdn.com/kf/HTB1dPUMThnaK1RjSZFtq6zC2VXa0.jpg' },
				{ id: 4, img: 'https://ae01.alicdn.com/kf/HTB1OHZrTXzqK1RjSZFvq6AB7VXaw.jpg' }
			],
			//轮播图下标
			currentSwiper: 0,
			anchorlist:[],//导航条锚点
			selectAnchor:0,//选中锚点
			serviceClass: '',//服务弹窗css类，控制开关动画
			specClass: '',//规格弹窗css类，控制开关动画
			shareClass:'',//分享弹窗css类，控制开关动画
			// 商品信息
			goodsData:{
				id:1,
				name:"商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题商品标题",
				info: "店长推荐 两件99元 暗扣防走光",
				price:"127.00",
				stock: 129,
				number:1,
				service:[
					{name:"正品保证",description:"此商品官方保证为正品"},
					{name:"极速退款",description:"此商品享受退货极速退款服务"},
					{name:"7天退换",description:"此商品享受7天无理由退换服务"}
				],
				couriers: [
					{
						label: '顺丰',
						from: '上海',
						to: '深圳/罗湖区',
						price: '8.00'
					},{
						label: '申通',
						from: '上海',
						to: '深圳/罗湖区',
						price: '8.00'
					},{
						label: '中通',
						from: '上海',
						to: '深圳/罗湖区',
						price: '8.00'
					},{
						label: '顺丰',
						from: '上海',
						to: '深圳/罗湖区',
						price: '8.00'
					}
				],
				spec:[
					{
						title: '颜色',
						list: [{
							"name": "粉色"
						}, {
							"name": "红色"
						}, {
							"name": "蓝色"
						}, {
							"name": "黄色"
						}]
					},
					{
						title: '尺码',
						list: [{
							"name": "22"
						}, {
							"name": "32"
						}, {
							"name": "41"
						}, {
							"name": "42"
						}, {
							"name": "43"
						}, {
							"name": "44"
						}, {
							"name": "48"
						}]
					}
				],
				comment:{
					number:102,
					userface:'../../static/img/face.jpg',
					username:'大黑哥',
					content:'很不错，之前买了很多次了，很好看，能放很久，和图片色差不大，值得购买！'
				}
			},
			goods_id: '',
			selectSpec:[-1,-1],//选中规格
			isKeep:false,//收藏
			//商品描述html
			content: '',
			descriptionStr:'<div style="text-align:center;"><img width="100%" src="https://ae01.alicdn.com/kf/HTB1t0fUl_Zmx1VjSZFGq6yx2XXa5.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB1LzkjThTpK1RjSZFKq6y2wXXaT.jpg"/><img width="100%" src="https://ae01.alicdn.com/kf/HTB18dkiTbvpK1RjSZPiq6zmwXXa8.jpg"/></div>',
			url: '',
			selectArr: [], //存放被选中的值
			shopItemInfo: {}, //存放要和选中的值进行匹配的数据
			subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
			btn: 0	,//0:加入购物车  1:立即购买
		};
	},
	components:{
		uParse
	},
	onLoad(option) {
		this.url = this.$http.url;
		console.log(option.cid);
		if(option.name != undefined){
			uni.setNavigationBarTitle({
				title: option.name
			});
			this.goods_id = option.cid;
			// console.log(this.goods_id);
		}
		// uni.showLoading({
		// 	title: '加载中'
		// })
		this.$http.getStoreDetails({
			g_id: option.cid
		}).then((data)=>{
			// console.log(data.data);
			let res = data.data;
			this.goodsData.id = res.id;
			this.goodsData.name = res.name;
			this.goodsData.price = res.price;
			this.goodsData.old_price = res.old_price;
			this.goodsData.stock = res.stock;
			this.swiperList = res.pic_list;
			this.content = res.content==null?'':res.content;
			// uni.hideLoading();
		})
		// #ifdef MP
		//小程序隐藏返回按钮
		this.showBack = false;
		// #endif
		//option为object类型，会序列化上个页面传递的参数
	},
	// onUnload() {
	// 	uni.hideLoading();
	// },
	onShow(){
		this.calcAnchor();//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确

		this.checkItem(-1);
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop>=this.anchorlist[2].top?2:e.scrollTop>=this.anchorlist[1].top?1:0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	// 上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
	// onReachBottom() {
	// 	uni.showToast({ title: '触发上拉加载' });
	// },
	methods: {
		selectCourier(idx){
			
		},
		//轮播图指示器
		swiperChange(event) {
			this.currentSwiper = event.detail.current;
		},
		toHome(){
			uni.switchTab({
				url: '/pages/index/shop'
			})
		},
		// 分享
		toShare(){
			this.shareClass = 'show';
		},
		hideShare(){
			this.shareClass = 'hide';
			// setTimeout(() => {
				this.shareClass = 'none';
			// }, 150);
		},
		//收藏
		keep(){
			this.isKeep = this.isKeep?false:true;
		},
		// 加入购物车
		joinCart(){
			this.btn = 0;
			this.showSpec(false);
			// if(this.selectSpec==null){
			// 	return this.showSpec(()=>{
			// 		uni.showToast({title: "已加入购物车"});
			// 	});
			// }
		},
		//立即购买
		buy(){
			this.btn = 1;
			this.showSpec(false);
			// if(this.selectSpec==null){
			// 	return this.showSpec(()=>{
			// 		this.toConfirmation();
			// 	});
			// }
		},
		//商品评论
		toRatings(){
			uni.navigateTo({
				url:'/pages/index/ratings'
			})
		},
		//跳转确认订单页面
		toConfirmation(){
			let tmpList=[];
			let goods = {id:this.goodsData.id,img:'../../static/img/p1.jpg',name:this.goodsData.name,spec:'规格:'+this.goodsData.spec[this.selectSpec],price:this.goodsData.price,number:this.goodsData.number};
			tmpList.push(goods);
			uni.setStorage({
				key:'buylist',
				data:tmpList,
				success: () => {
					uni.navigateTo({
						url:'/pages/index/confirmation'
					})
				}
			})
		},
		//跳转评论列表
		showComments(goodsid){
			console.log(goodsid);
		},
		//选择规格
		setSelectSpec(item, index, event, idx){
			if (this.selectArr[index] != item) {
				this.$set(this.selectArr, index, item);
				this.$set(this.subIndex, index, idx);
			
			} else {
				this.$set(this.selectArr, index, '');
				this.$set(this.subIndex, index, -1); //去掉选中颜色
			}
			this.checkItem(index);
		},
		checkItem(clickIndex) {
			var option = this.goodsData.spec;
			for (let i = 0, len = option.length; i < len; i++) {
				if (i == clickIndex) {
					continue;
				}
				let len2 = option[i].list.length;
				for (let j = 0; j < len2; j++) {
					if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
						continue;
					}
					let choosed_copy = [...this.selectArr];
					this.$set(choosed_copy, i, this.goodsData.spec[i].list[j].name);
					let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
					if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
						this.$set(this.goodsData.spec[i].list[j], 'isShow', true);
					} else {
						this.$set(this.goodsData.spec[i].list[j], 'isShow', false);
					}
				}
			}
		},
		//减少数量
		sub(){
			if(this.goodsData.number<=1){
				return;
			}
			this.goodsData.number--;
		},
		//增加数量
		add(){
			this.goodsData.number++;
		},
		// 跳转锚点
		toAnchor(index){
			this.selectAnchor = index;
			uni.pageScrollTo({scrollTop: this.anchorlist[index].top,duration: 200});
		},
		// 计算锚点高度
		calcAnchor(){
			this.anchorlist=[
				{name:'主图',top:0},
				{name:'评价',top:0},
				{name:'详情',top:0}
			]
			let commentsView = uni.createSelectorQuery().select("#comments");
			commentsView.boundingClientRect((data) => {
				let statusbarHeight = 0;
				//APP内还要计算状态栏高度
				// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
				// #endif
				let headerHeight = uni.upx2px(100);
				this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
				this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				
			}).exec();
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		//服务弹窗
		showService() {
			console.log('show');
			this.serviceClass = 'show';
		},
		//关闭服务弹窗
		hideService() {
			this.serviceClass = 'hide';
			// setTimeout(() => {
				this.serviceClass = 'none';
			// }, 200);
		},
		//规格弹窗
		showSpec(fun) {
			console.log('show');
			this.specClass = 'show';
			this.specCallback = fun;
		},
		specCallback(){
			return;
		},
		finishSpec(){
			this.specClass = 'hide';
			this.specClass = 'none';
			if(this.btn == 0){
				this.$http.addCar({
					g_id: this.goodsData.id,
					num: this.goodsData.number
				}).then((data)=>{
					if(data.data.status == 1){
						uni.showToast({title: "已加入购物车"});
					}else{
						this.$api.msg(data.data.message);
					}
				})
			}else{
				uni.navigateTo({
					url:'/pages/index/confirmation?id='+this.goodsData.id+'&num='+this.goodsData.number
				})
			}
		},
		//关闭规格弹窗
		hideSpec() {
			this.specClass = 'hide';
			//回调
			
			// this.selectSpec&&this.specCallback&&this.specCallback();
			// this.specCallback = false;
			// setTimeout(() => {
				this.specClass = 'none';
			// }, 200);
		},
		discard() {
			//丢弃
		}
	}
};
</script>

<style scoped lang="scss">
.indicator {
	position: absolute;
	bottom: 50px !important;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background: none !important;
	.dots {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: #f62152;
		margin-right: 8px;
		&:last-child{
			margin-right: 0;
		}
		&.on {
			background: #fff;
		}
	}
}

.layer_words_box{
	position: absolute;
	width: 100%;
	height: 45px;
	left: 0;
	bottom: 0;
	z-index: 30;
	background: rgba(255,118,26,.8);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	box-sizing: border-box;
	color: #fff;
	font-size: 32rpx;
	.lwb_title{
		margin-right: 30rpx;
	}
	button{
		color: #fff;
		background: #f90;
		&:after{
			border: 0;
		}
	}
}

page {
	background-color: #f8f8f8;
}
@keyframes showPopup {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes hidePopup {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}
		100% {
			transform: translateY(0);
		}
	}

.icon {
	font-size: 26rpx;
}
.status {
	width: 100%;
	height: 0;
	position: fixed;
	z-index: 10;
	top: 0;
	/*  #ifdef  APP-PLUS  */
	height: var(--status-bar-height); //覆盖样式
	/*  #endif  */
	background-color: #f1f1f1;
	transition: opacity 0.05s linear;
}
.header {
	width: 100%;

	height: 100rpx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */
	.before,
	.after {
		width: 92%;
		padding: 0 4%;
		height: 100rpx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
		/*  #endif  */
		transition: opacity 0.05s linear;
		.back {
			width: 125rpx;
			height: 60rpx;
			flex-shrink: 0;
			.icon {
				margin-left: -10%;
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 42rpx;
			}
		}
		.middle {
			width: 100%;
		}
		.icon-btn {
			width: 125rpx;
			height: 60rpx;
			flex-shrink: 0;
			display: flex;
			.icon {
				&:first-child{
					margin-right: 5rpx;
				}
				width: 60rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 42rpx;
				image{
					display: block;
					max-width: 40rpx;
					max-height: 40rpx;
				}
			}
		}
	}
	.before {
		.back {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
		.icon-btn {
			.icon {
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				
			}
		}
	}
	.after {
		background-color: #f1f1f1;
		.back {
			.icon {
				color: #666;
			}
		}
		.icon-btn {
			.icon {
				color: #666;
			}
		}
		.middle {
			font-size: 32rpx;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 7%;
			view {
				width: (100%/3);
				padding: 0 3%;
				height: 90rpx;
				margin: 0 3%;
				display: flex;
				justify-content: center;
				align-items: center;
				&.on {
					margin-bottom: -4rpx;
					color: #f47952;
					border-bottom: solid 4rpx #f47952;
				}
			}
		}
	}
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 100vw;
	swiper {
		width: 100%;
		height: 100vw;
		swiper-item {
			image {
				width: 100%;
				height: 100vw;
			}
		}
	}
	.indicator{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25rpx;
		height: 40rpx;
		border-radius: 40rpx;
		font-size: 22rpx;
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}
.info-box {
	width: 92%;
	padding: 30rpx 4%;
	background-color: #fff;
	margin-bottom: 20rpx;
}

.goods-info {
	.price {
		font-size: 46rpx;
		font-weight: 600;
		color: #f47925;
		text{
			color: #ccc;
			font-size: 28rpx;
			font-weight: normal;
			margin-left: 50rpx;
			text-decoration: line-through;
		}
	}
	.spec_info{
		color: #999;
		font-size: 32rpx;
		margin: 10rpx 0;
	}
	.stock{
		color: #999;
		font-size: 32rpx;
	}
	.title {
		color: #333;
		font-size: 40rpx;
	}
}
.spec {
	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30rpx 0;
		&:last-child{
			margin-bottom: 0;
			border-bottom: 0;
		}
		.text {
			font-size: 24rpx;
			color: #a2a2a2;
			margin-right: 20rpx;
		}
		.content {
			color: #333;
			font-size: 32rpx;
			display: flex;
			flex-wrap: wrap;
			.serviceitem{
				margin-right: 10rpx;
			}
			.sp {
				width: 100%;
				display: flex;
				view {
					background-color: #f6f6f6;
					padding: 5rpx 10rpx;
					color: #999;
					margin-right: 10rpx;
					font-size: 20rpx;
					border-radius: 5rpx;
					&.on{
						border: solid 1rpx #f47952;
						padding: 4rpx 8rpx;
					}
				}
			}
		}
		.arrow {
			position: absolute;
			right: 4%;
			.icon {
				color: #ccc;
			}
		}
	}
}
.comments {
	.row {
		width: 100%;
		height: 40rpx;
		display: flex;
		align-items: center;
		margin: 0 0 30rpx 0;
		.text {
			font-size: 30rpx;
		}
		.arrow {
			font-size: 28rpx;
			position: absolute;
			right: 4%;
			color: #f00;
			.show {
				display: flex;
				align-items: center;
				.icon {
					color: #ccc;
				}
			}
		}
	}
	.comment {
		width: 100%;
		.user-info {
			width: 100%;
			// height: 80rpx;
			display: flex;
			align-items: center;
			.face {
				width: 80rpx;
				height: 80rpx;
				margin-right: 10rpx;
				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 100%;
				}
			}
			.username {
				font-size: 32rpx;
				color: #000;
			}
		}
		.content {
			margin-top: 10rpx;
			color: #333;
			font-size: 32rpx;
		}
	}
}
.description {
	.title {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 26rpx;
		color: #999;
	}
}
.footer {
	position: fixed;
	bottom: 0rpx;
	width: 92%;
	padding: 0 4%;
	height: 99rpx;
	border-top: solid 1rpx #eee;
	background-color: #fff;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.icons {
		display: flex;
		height: 80rpx;
		margin-left: -4%;
		.box {
			width: 90rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			.icon {
				font-size: 40rpx;
				color: #828282;
			}
			.text {
				display: flex;
				justify-content: center;
				width: 100%;
				font-size: 22rpx;
				color: #666;
			}
		}
	}
	.btn {
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		overflow: hidden;
		display: flex;
		margin-right: -2%;
		.joinCart,
		.buy {
			width: 50%;
			height: 80rpx;
			padding: 0;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
		}
		.joinCart {
			background-color: #f0b46c;
		}
		.buy {
			background-color: #f06c7a;
		}
	}
}

.layer_goods_box{
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
	padding-top: 30rpx;
	image{
		display: block;
		width: 186rpx;
		height: 186rpx;
		margin-right: 20rpx;
	}
	.layer_goods_info{
		width: 70%;
		color: #333;
		font-size: 32rpx;
		view{
			margin-top: 10rpx;
		}
		.lgi_title{
			text{
				color: #ff2a3a;
				font-size: 36rpx;
			}
		}
	}
	.close_img{
		display: block;
		width: 32rpx;
		height: 32rpx;
		margin: 0;
	}
}
.layer_goods_content{
	// height: 70%;
}

.courier_box{
	width: 100%;
	height: 90%;
	padding-top: 30rpx;
	padding-bottom: 30rpx;
	box-sizing: border-box;
	.courier_item{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		color: #333;
		font-size: 32rpx;
		background: #fafafa;
		padding: 30rpx 10rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		&:last-child{
			border-bottom: 0;
		}
		.cour_label{
			padding: 5rpx 15rpx;
			background: #fff;
			border: 1px solid #eee;
			box-sizing: border-box;
			border-radius: 5rpx;
			margin-right: 20rpx;
		}
		.cour_right{
			.cr_price{
				color: #999;
				font-size: 28rpx;
				margin-top: 10rpx;
			}
		}
	}
}


.popup {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 20;
	display: none;
	.mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 21;
		background-color: rgba(0, 0, 0, 0.6);
	}
	.layer {
		position: fixed;
		z-index: 22;
		bottom: -70%;
		width: 92%;
		padding: 0 4%;
		height: 70%;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-content: space-between;
		.content {
			width: 100%;
			padding: 20rpx 0;
		}
		.btn {
			width: 100%;
			height: 100rpx;
			.button {
				width: 100%;
				height: 80rpx;
				border-radius: 40rpx;
				color: #fff;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #f47952;
				font-size: 28rpx;
			}
		}
	}
	
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.2s linear both;
		}
		.layer {
			animation: showLayer 0.2s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.2s linear both;
		}
		
		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}
	&.none {
		display: none;
	}
	&.service {
		.row {
			margin: 30rpx 0;
			.title {
				font-size: 30rpx;
				margin: 10rpx 0;
			}
			.description {
				font-size: 28rpx;
				color: #999;
			}
		}
	}
	&.spec {
		.title {
			font-size: 30rpx;
			margin: 30rpx 0;
		}
		.sp {
			display: flex;
			view {
				font-size: 28rpx;
				padding: 5rpx 20rpx;
				border-radius: 8rpx;
				margin: 0 30rpx 20rpx 0;
				background-color: #f6f6f6;
				&.on {
					padding: 3rpx 18rpx;
					border: solid 1rpx #f47925;
				}
			}
		}
		.length{
			margin-top: 30rpx;
			margin-bottom: 50rpx;
			// border-top: solid 1rpx #aaa;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			.text{
				font-size: 30rpx;
				margin-bottom: 30rpx;
			}
			.number{
				display: flex;
				align-items: center;
				.input{
					width: 80rpx;
					height: 60rpx;
					margin: 0 10rpx;
					background-color: #f3f3f3;
					display: flex;
					justify-content: center;
					align-items: center;
					text-align: center;
					input{
						width: 80rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;
						font-size: 26rpx;
					}
				}
				
				.sub ,.add{
					width: 60rpx;
					height: 60rpx;
					background-color: #f3f3f3;
					border-radius: 5rpx;
					.icon{
						font-size: 30rpx;
						width: 60rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
		
	}
}
.share{
	display: none;
	&.show {
		display: block;
		.mask{
			animation: showPopup 0.15s linear both;
		}
		.layer {
			animation: showLayer 0.15s linear both;
		}
	}
	&.hide {
		display: block;
		.mask{
			animation: hidePopup 0.15s linear both;
		}
		
		.layer {
			animation: hideLayer 0.15s linear both;
		}
	}
	&.none {
		display: none;
	}
	.mask{
		background-color: rgba(0,0,0,.5);
		position: fixed;
		width: 100%;
		height: 100%;
		top:0;
		z-index: 11;
	}
	.layer{
		width: 92%;
		position: fixed;
		z-index: 12;
		padding: 0 4%;
		top: 100%;
		background-color: rgba(255,255,255,0.9);
		.list{
			width: 100%;
			display: flex;
			padding:10rpx 0 30rpx 0;
			.box{
				width: 25%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				image{
					width: 13.8vw;
					height: 13.8vw;
				}
				.title{
					margin-top: 10rpx;
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 26rpx;
				}
			}
		}
		.btn{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			border-top: solid 1rpx #666666;
		}
		.h1{
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34rpx;
		}
	}
}
</style>

<script>
	export default {
		globalData:{
			is_login: false,
			app_logo: '/static/logo.png'
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	page,body{
		background: #fff;
	}
	uni-modal .uni-modal__btn_primary{
		color: #f60 !important;
	}
	.uni-picker-container .uni-picker-action.uni-picker-action-confirm{
		color: #f60 !important;
	}
	.page_bg{background: #eee !important;min-height: 100%;position: fixed;width: 100%;z-index: -1;left: 0;top: 0;}
	.status_bar {
	    height: var(--status-bar-height);  
	    width: 100%;
	    background-color: #ff9900;
	}
	.fixed-top{
		height: 45px;
	}
	.gray-place{
		height: 20rpx;
		background: #efefef;
	}
	.mb100{
		height: 100rpx;
	}
	
	.time_title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		&.bold{
			view{
				font-weight: bold;
			}
		}
		navigator{
			color: #666;
			font-size: 28rpx;
		}
	}
	
	.list_nav{
		background: #fff;
		color: #666;
		font-size: 32rpx;
		text-align: center;
		overflow: hidden;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		view{
			padding: 25rpx 0;
			position: relative;
			&.active{
				color: #ff2a3a;
				font-weight: bold;
			}
			&.active:after{
				content: "";
				width: 45rpx;
				height: 6rpx;
				background: #ff2a3a;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
			}
		}
	}
	
	.wxParse{
		-webkit-user-select: text;
	}
	.wxParse image,.wxParse .img,.wxParse image>img{
		display: block !important;
		max-width: 100% !important;
		margin: 0 !important;
		padding: 0 !important;
		opacity: 1 !important;
	}
	
	.submit_btn{
		background: $free-orange-low;
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 32rpx;
		border-radius: 50rpx;
		margin-bottom: 50rpx;
		position: relative;
		transition: all .5s ease;
		.loading{
			display: block;
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			left: 38%;
			top: 50%;
			transform: translate(-50%,-50%);
			z-index: 1;
		}
		&:active{
			background: $free-orange-high;
		}
		&:after{
			border: 0;
		}
	}
	
	.white_logo_box{
		background: $free-orange-low;
		padding: 30rpx 30rpx 20rpx;
		box-sizing: border-box;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
		image{
			display: block;
			width: 70%;
			margin: 0 auto;
		}
	}
	
	.form_item{
		padding: 30rpx 0 30rpx 20rpx;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(228, 228, 228, 1);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		.icon{
			opacity: .3;
			margin-right: 20rpx;
			&.no{
				opacity: 1;
			}
			image{
				display: block;
				width: 40rpx;
				height: 40rpx;
			}
		}
		.right_box{
			width: 95%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.ipt_box{
				width: 75%;
				padding-right: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				input{
					display: block;
					width: 90%;
				}
				image{
					display: none;
					width: 40rpx;
					height: 40rpx;
					&.active{
						display: block;
					}
				}
			}
			&.all{
				.ipt_box{
					width: 100%;
				}
			}
			input{
				font-size: 26rpx;
				margin-right: 20rpx;
			}
		}
		.switch_btn{
			margin-left: 20rpx;
		}
	}
</style>

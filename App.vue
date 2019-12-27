<script>
	export default {
		globalData:{
			is_login: false,
			app_logo: '/static/logo.png'
		},
		onLaunch: function() {
			console.log('App Launch')
			let random = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
			let ranLen = random.length;
			let uni_code = [];
			for (let i = 0; i < 20; i++) {
			  uni_code.push({
			    code: random.charAt(Math.floor(Math.random() * ranLen))
			  })
			}
			uni.setStorageSync('unique_id',uni_code.map(item => item.code).join(''));
			console.log(uni.getStorageSync('unique_id'));
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
	
	.not_have{
		width: 100%;
		text-align: center;
		// margin: 300upx 0 0;
		font-size: 28upx;
		color: #999;
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
	
	.fixed_bottom_btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 0;
		color: #fff !important;
		background: rgba(250,29,76,.8) !important;
		transition: background .3s ease;
		&:active{
			background: rgba(250,29,76,1) !important;
		}
		&:after{
			border: 0;
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
	
	.textarea_box{
		background: #fafafa;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		border-top: 1px solid #ccc;
		position: relative;
		textarea{
			background: #fff;
			display: block;
			width: 100%;
			height: 150rpx;
			padding: 10rpx;
			box-sizing: border-box;
			font-size: 28rpx;
		}
		text{
			color: #999;
			font-size: 28rpx;
			position: absolute;
			right: 50rpx;
			bottom: 20rpx;
		}
	}
	
	.fixed_pay_bottom{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 30rpx;
		box-sizing: border-box;
		color: #ff0036;
		font-size: 28rpx;
		background: #fff;
		z-index: 10;
		text{
			font-size: 36rpx;
			margin-left: 5rpx;
		}
		button{
			margin: 0;
			padding: 0;
			width: 220rpx;
			text-align: center;
			height: 100rpx;
			line-height: 100rpx;
			border-radius: 0;
			color: #fff;
			background: rgba(250,29,76,1);
			&:active{
				background: rgba(250,29,76,.8);
			}
			&:after{
				border: 0;
			}
		}
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
	
	.goods_pop_item{
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #333;
		font-size: 32rpx;
		image{
			display: block;
			width: 144rpx;
			height: 144rpx;
		}
		.gp_center{
			width: 50%;
			.gp_info{
				color: #999;
				font-size: 28rpx;
				margin: 15rpx 0 10rpx;
			}
			.gp_price{
				color: #ff2a3a;
				font-size: 32rpx;
			}
		}
	}
	
	// 套餐样式
	.meal_list{
		padding: 30rpx;
		box-sizing: border-box;
		background: #eee;
		.meal_item{
			margin-bottom: 30rpx;
			color: #fff;
			font-size: 24rpx;
			.meal_top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 60rpx 40rpx 50rpx 20rpx;
				box-sizing: border-box;
				border-radius: 10rpx 10rpx 0 0;
				background: #f08781 url('~@/static/icon/bg1.png') left bottom repeat-x;
				.meal_left{
					width: 32%;
					font-size: 40rpx;
					text{
						font-size: 56rpx;
						font-weight: bold;
						margin-right: 5rpx;
					}
				}
				.meal_center{
					width: 40%;
					.mc_title{
						font-size: 36rpx;
						font-weight: bold;
						margin-bottom: 10rpx;
					}
				}
				.meal_right{
					width: 138rpx;
					button{
						width: 138rpx;
						font-size: 24rpx;
						padding: 0;
						margin: 0;
						color: #f08781;
						background: #f4dedd;
						&:after{
							border: 0;
						}
					}
				}
			}
			.meal_bottom{
				background: #d8676b;
				border-radius: 0 0 10rpx 10rpx;
				padding: 15rpx 30rpx 20rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				.mb_left{
					width: 92%;
				}
				image{
					display: block;
					width: 16rpx !important;
					height: 28rpx !important;
					transform: rotate(-90deg);
				}
				&.active{
					.mb_left{
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					image{
						transform: rotate(90deg);
					}
				}
			}
			&.gray{
				.meal_top{
					background: #dbdbdb url('~@/static/icon/bg.png') left bottom repeat-x;
				}
				.meal_bottom{
					background: #d3d3d3;
				}
			}
		}
	}
</style>

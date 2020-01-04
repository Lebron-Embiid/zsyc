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
	
	.mb20{
		margin-bottom: 20rpx;
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
	
	.setting_box{
		background: #fff;
		box-sizing: border-box;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		&:active{
			background: #fafafa;
		}
		&.line{
			border-bottom: 1px solid #eee;
		}
		&.avatar_box{
			padding: 20rpx 30rpx;
		}
		.set_left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #333;
			font-size: 32rpx;
			image{
				display: block;
				width: 90rpx;
				height: 90rpx !important;
				border-radius: 50%;
				margin-right: 20rpx;
			}
		}
		.set_right{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #999;
			font-size: 32rpx;
			.avatar{
				display: block;
				width: 100rpx;
				height: 100rpx !important;
				border-radius: 50%;
			}
			.arrow{
				display: block;
				width: 16rpx;
				height: 32rpx;
				margin-left: 20rpx;
			}
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
		border-top: 1px solid #eee;
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
			font-size: 32rpx;
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
	
	.find_content_box{
		margin-bottom: 20rpx;
		background: #fff;
		&:last-child{
			margin-bottom: 0;
		}
		&:active{
			background: #f6f6f6;
		}
		.find_content_item{
			padding: 30rpx;
			box-sizing: border-box;
			.find_title{
				color: #333;
				font-size: 40rpx;
				margin-bottom: 20rpx;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.find_desc{
				margin-bottom: 20rpx;
				font-size: 32rpx;
				color: #999;
				overflow : hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				word-wrap: break-word;
				word-break: break-all;
			}
			.pic{
				display: block;
				width: 100%;
			}
		}
		.find_content_item1{
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: stretch;
			.fci_left{
				display: flex;
				flex-wrap: wrap;
				width: 55%;
				.find_title{
					width: 100%;
					color: #333;
					font-size: 36rpx;
					margin-bottom: 10rpx;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.find_desc{
					font-size: 32rpx;
					color: #999;
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					word-wrap: break-word;
					word-break: break-all;
				}
				.find_bottom{
					width: 100%;
					align-self: flex-end;
					view{
						display: inline-block;
						image{
							display: inline-block;
							vertical-align: middle;
							margin-bottom: 8rpx;
						}
					}
				}
			}
			.fci_right{
				image{
					display: block;
					width: 270rpx;
					height: 270rpx !important;
				}
			}
		}
		.find_bottom{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30rpx;
			view{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				margin-right: 40rpx;
				color: #999;
				font-size: 24rpx;
				image{
					display: block;
					width: 26rpx;
					height: 26rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	
	.message_box{
		background: #fff;
		.message_item{
			padding: 0 0 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			// &:active{
			// 	background: #fafafa;
			// }
			.icon_box{
				width: 100rpx !important;
				height: 100rpx !important;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
				background: #f59120;
				&.red{
					background: #ff7d58;
				}
				&.blue{
					background: #6da0e6;
				}
				.icon{
					display: block;
					max-width: 54rpx;
					max-height: 58rpx !important;
				}
			}
			.msg_content{
				width: 82%;
				padding: 30rpx 30rpx 30rpx 0;
				border-bottom: 1px solid #eee;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.msg_box{
					width: 90%;
					.msg_title{
						color: #333;
						font-size: 34rpx;
						margin-bottom: 10rpx;
					}
					.msg_info{
						color: #999;
						font-size: 28rpx;
					}
				}
				.arrow{
					display: block;
					width: 16rpx;
					height: 32rpx;
				}
			}
			&:last-child{
				.msg_content{
					border-bottom: 0;
				}
			}
		}
	}
	
	.upload_img_box{
		margin-top: 20rpx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		.upload_btn{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			width: 150rpx;
			height: 150rpx;
			padding: 20rpx 0;
			box-sizing: border-box;
			color: #999;
			font-size: 24rpx;
			border: 1px solid #ccc;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			image{
				display: block;
				width: 52rpx;
				height: 52rpx;
			}
			view{
				width: 100%;
				text-align: center;
			}
		}
		.upload_img_item{
			width: 150rpx;
			height: 150rpx;
			border: 1px solid #ccc;
			box-sizing: border-box;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			position: relative;
			.img{
				display: block;
				max-width: 100%;
				max-height: 100% !important;
			}
			.del_icon{
				position: absolute;
				right: 0;
				top: 0;
				width: 40rpx;
				height: 40rpx;
				background: #f00;
			}
		}
	}
	
	
	.online_content{
		background: #fafafa;
		.content_item{
			padding: 30rpx;
			box-sizing: border-box;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			image{
				display: block;
				width: 230rpx;
				height: 230rpx !important;
			}
			.ci_center{
				width: 62%;
				color: #999;
				font-size: 24rpx;
				.ci_title{
					color: #333;
					font-size: 32rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.ci_type{
					margin: 25rpx 0 20rpx;
				}
				.ci_car{
					margin-bottom: 20rpx;
				}
				.ci_box{
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.ci_num{
						width: 192rpx;
						padding: 5rpx 0;
						text-align: center;
						border-radius: 30rpx;
						border: 1px solid #fee5e7;
						position: relative;
						.text{
							position: relative;
							z-index: 3;
							text{
								margin-left: 5rpx;
							}
						}
						.process{
							position: absolute;
							height: 100%;
							left: 0;
							top: 0;
							background: #feeff0;
							border-radius: 15rpx;
						}
					}
				}
			}
			button{
				display: flex;
				justify-content: center;
				align-self: flex-end;
				padding: 0;
				margin: 0;
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				background: #f60;
				margin-left: 30rpx;
				color: #fff;
				transition: all .5s ease;
				&:active{
					opacity: .8;
				}
				&:after{
					border: 0;
				}
			}
		}
	}
</style>

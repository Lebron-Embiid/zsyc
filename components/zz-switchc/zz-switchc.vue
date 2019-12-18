<template>
	<view>
		<view class="weui-switch" :class="{'weui-switch-on' : isChecked}" :value="value" :sid="sid" @click="toggle" :style="{color:bgcolor, width: width+'px'}">
			<view v-if="isChecked && direction.length > 0" class="switch-checked" >
				{{direction[0]}}
			</view>
			<view v-if="!isChecked && direction.length > 0" class="switch-ischecked">
				{{direction[1]}}
			</view>
		</view>
	</view>
</template>

<script>
	 export default {
        name: 'switchComponent',
        props: {
			value: {
				type: Boolean,
				default: false
			},
			//背景颜色
			bgcolor: {
				type: String,
				default: "#ff9900"
			},
			//宽度 px
			width: {
				type: Number,
				default: 52
			},
			text: {
				type: String,
				default: ''
			},
			sid: {
				type: Number,
				default: 0,
			}
        },
        data () {
            return {
                isChecked: this.value,
            }
        },
        computed: {
            direction () {
                if (this.text) {
                    return this.text.split('|')
                } else {
                    return []
                }
            }
        },
        watch: {
			value (val) {
				this.isChecked = val
			},
			isChecked(val) {
				let textTemp = '';
				if(val) {
					textTemp = this.text.split('|')[0];
				} 
				if(!val) {
					textTemp = this.text.split('|')[1];
				}
				let ob = {
					sid: this.sid,
					value: val,
					text: textTemp
				}
				this.$emit('change', ob);
			}
        },
        methods: {
          toggle(e) {
            this.isChecked = !this.isChecked;
          }
        }
    }   
</script>

<style>
	
	.weui-switch {
		position:relative;
        display: block;
        position: relative;
        width: 120rpx !important;
        height: 48rpx;
		line-height: 48rpx;
		border: 1px solid #C0C0C0;
        outline: 0;
		font-size: 24rpx;
        border-radius: 32rpx;
        box-sizing: border-box;
        transition: background-color 0.1s, border 0.1s;
        cursor: pointer;
    }
	
    .weui-switch:before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 118rpx;
        height: 44rpx;
        border-radius: 30rpx;
        background-color: #ccc;
        transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
    }
	
    .weui-switch:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 44rpx;
        height: 44rpx;
        border-radius: 30rpx;
        background-color: #FFFFFF;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
    }
	
    .weui-switch-on {
		border-color: #ff9900;
        background-color: #ff9900;
    }
	
	/* 背景颜色设计 */
    .weui-switch-on:before {
        border-color: #353535;
		background-color: #ff9900;
    }
	
    .weui-switch-on:after {
		border-color: #fcc038;
        transform: translateX(66rpx);
		left: 8rpx;
    }
	
	.switch-checked {
		width:100%;
		height:100%;
		position:absolute;
		padding:0 10rpx;
		box-sizing: border-box;
		line-height:40rpx;
		color:#FFF;
		user-select:none;
	}
	
	.switch-ischecked {
		width:100%;
		height:100%;
		position:absolute;
		padding:0 10rpx;
		box-sizing: border-box;
		right:4rpx;
		line-height:44rpx;
		/* color:#7A7A7A; */
		color: #fff;
		text-align:right;
		user-select:none;
	}
</style>

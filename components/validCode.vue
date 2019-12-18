<template>
	<view class="ValidCode disabled-select" @click="refreshCode">
		<text v-for="(item, index) in codeList" :key="index">{{item.code}}</text>
	</view>
</template>

<script>
export default {
  name: 'validCode',
  props: {
    length: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      codeList: []
    }
  },
  mounted () {
    this.createdCode()
  },
  methods: {
    refreshCode () {
      this.createdCode()
    },
    createdCode () {
      let len = this.length,
        codeList = [],
        chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
        charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen))
        })
      }
      // 指向
      this.codeList = codeList
      // 将当前数据派发出去
      this.$emit('update:value', codeList.map(item => item.code).join(''))
    }
  }
}
</script>

<style scoped lang="scss">
  .ValidCode{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
	width: 240rpx !important;
	height: 80rpx;
	padding: 0 20rpx;
	// border: 1px solid #DCDFE6;
	border-radius: 8px;
	margin-left: 20rpx;
	background: #fff;
	overflow: hidden;
	box-sizing: border-box;
    text{
      display: inline-block;
    }
  }
</style>
/*
 * @Author: chenjun
 * @Date:   2017-12-28 17:09:21
 * @Last Modified by:   0easy-23
 * @Last Modified time: 2017-12-29 10:09:23
 * 签名生成	
 * kAppKey,kAppSecret为常量，
 * params，传入的参数，string || object
 * 需要借助md5.js
 * 规则：将所有参数字段按首字母排序， 拼接成key1 = value1 & key2 = value2的格式，再在末尾拼接上key = appSecret， 再做MD5加密生成sign
 */

import md5 from '@/common/md5.min.js'

function getSign(params, AppSecret) {
    if (typeof params == "string") {
        return paramsStrSort(params,AppSecret);
    } else if (typeof params == "object") {
        var arr = [];
        for (var i in params) {
            arr.push((i + "=" + params[i]));
        }
        return paramsStrSort(arr.join(("&")),AppSecret);
    }
}

function paramsStrSort(paramsStr,AppSecret) {
    var url = paramsStr;
    var urlStr = url.split("&").sort().join("&");
    var newUrl = urlStr + '&key=' + AppSecret;
    return md5(newUrl);
}

export default{
	getSign
}
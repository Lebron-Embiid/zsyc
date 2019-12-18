const phoneList = {
	CN: ["中国","^(\\+?0?86\\-?)?1[345789]\\d{9}$"],
	TW: ["台湾","^(\\+?886\\-?|0)?9\\d{8}$"],
	HK: ["香港","^(\\+?852\\-?)?[569]\\d{3}\\-?\\d{4}$"],
	MS: ["马来西亚","^(\\+?6?01){1}(([145]{1}(\\-|\\s)?\\d{7,8})|([236789]{1}(\\s|\\-)?\\d{7}))$"],
	PH: ["菲律宾","^(\\+?0?63\\-?)?\\d{10}$"],
	TH: ["泰国","^(\\+?0?66\\-?)?\\d{10}$"],
	SG: ["新加坡","^(\\+?0?65\\-?)?\\d{10}$"],
	/* 以上是项目可能设计到的市场，一下是其他国家的手机号校验正则，欢迎补充*/
	DZ: ["阿尔及利亚", "^(\\+?213|0)(5|6|7)\\d{8}$"],
	SY: ["叙利亚","^(!?(\\+?963)|0)?9\\d{8}$"],
	SA: ["沙特阿拉伯","^(!?(\\+?966)|0)?5\\d{8}$"],
	US: ["美国","^(\\+?1)?[2-9]\\d{2}[2-9](?!11)\\d{6}$"],
	CZ: ["捷克共和国","^(\\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$"],
	DE: ["德国","^(\\+?49[ \\.\\-])?([\\(]{1}[0-9]{1,6}[\\)])?([0-9 \\.\\-\\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$"],
	DK: ["丹麦","^(\\+?45)?(\\d{8})$"],
	GR: ["希腊","^(\\+?30)?(69\\d{8})$"],
	AU: ["澳大利亚","^(\\+?61|0)4\\d{8}$"],
	GB: ["英国","^(\\+?44|0)7\\d{9}$"],
	CA: ["加拿大","^(\\+?1)?[2-9]\\d{2}[2-9](?!11)\\d{6}$"],
	IN: ["印度","^(\\+?91|0)?[789]\\d{9}$"],
	NZ: ["新西兰","^(\\+?64|0)2\\d{7,9}$"],
	ZA: ["南非","^(\\+?27|0)\\d{9}$"],
	ZM: ["赞比亚","^(\\+?26)?09[567]\\d{7}$"],
	ES: ["西班牙","^(\\+?34)?(6\\d{1}|7[1234])\\d{7}$"],
	FI: ["芬兰","^(\\+?358|0)\\s?(4(0|1|2|4|5)?|50)\\s?(\\d\\s?){4,8}\\d$"],
	FR: ["法国","^(\\+?33|0)[67]\\d{8}$"],
	IL: ["以色列","^(\\+972|0)([23489]|5[0248]|77)[1-9]\\d{6}"],
	HU: ["匈牙利","^(\\+?36)(20|30|70)\\d{7}$"],
	IT: ["意大利","^(\\+?39)?\\s?3\\d{2} ?\\d{6,7}$"],
	JP: ["日本","^(\\+?81|0)\\d{1,4}[ \\-]?\\d{1,4}[ \\-]?\\d{4}$"],
	NO: ["挪威","^(\\+?47)?[49]\\d{7}$"],
	BE: ["比利时","^(\\+?32|0)4?\\d{8}$"],
	PL: ["波兰","^(\\+?48)? ?[5-8]\\d ?\\d{3} ?\\d{2} ?\\d{2}$"],
	BR: ["巴西","^(\\+?55|0)\\-?[1-9]{2}\\-?[2-9]{1}\\d{3,4}\\-?\\d{4}$"],
	PT: ["葡萄牙","^(\\+?351)?9[1236]\\d{7}$"],
	RU: ["俄罗斯","^(\\+?7|8)?9\\d{9}$"],
	RS: ["塞尔维亚","^(\\+3816|06)[- \\d]{5,9}$"],
	R:  ["土耳其","^(\\+?90|0)?5\\d{9}$"],
	VN: ["越南","^(\\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$"]
}

function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

// 时间戳转年月日 时分秒
const formatTime = date => {
    date = new Date(parseInt(date)*1000);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
	
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 时间戳转年月日
const formatDate = date => {
    date = new Date(parseInt(date)*1000);
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-');
    // return [month, day].map(formatNumber).join('.');
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

export default{
	phoneList,
	friendlyDate,
	formatTime,
	formatDate
}
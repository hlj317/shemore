const request                               = require("@node/request");

const newRequest = request.defaults({
	forever: true,
	pool: {
		maxSockets: 500,
	},
	agentOptions: {
		keepAliveMsecs: 60 * 1000,
	},
	json: true,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
});

class Wxhandler {
	async getOpenId(code, wxType = 7) {
		console.log("进入 getOpenId 函数");
		console.log(`code 是 ${code}`);
		console.log(`wxType 是 ${wxType}`);
		if (!code || !wxType) {
			console.log("meiyou code 和 wxtype");
			return false;
		}
		try {
			console.log(`开始请求 php的接口，code是 ${code}`);
			let result = await newRequest.get("http://api.beibei.com/mroute.html", {
				method: "beibei.h5.open.auth",
				source: "weixin",
				code,
				wx_type: wxType,
			});
			console.log("请求结束，结果如下");
			console.log(result.body);
			return result;
		} catch (e) {
			return false;
		}
	}
}

module.exports = Wxhandler;

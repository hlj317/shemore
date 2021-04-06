// @date    16/10/11 封装request 目前只支持get 后期可以看看是否需要支持带客户端cookie的post
// @date    17/10/19 支持带客户端cookie的请求
const request = require("request");
const cache = require("./cache");
const REQ_TIMEOUT = 5000;
const INIT_CACHE_TIME = 300;
/**
 * 获取数据
 * @param options
 * @returns {Promise}
 */
const getData = (options) => {
	let params = {
		url: options.url,
		method: options.method || "GET",
		timeout: options.timeout || REQ_TIMEOUT,
		gzip: true,
	};
	if(options.method === "POST"){
		params.json = true;
		params.headers = {
			"content-type": "application/json"
		};
		params.body = options.data;
	}
	if (options.cookie) {
		params.headers = {
			Cookie: options.cookie,
		};
	}
	return new Promise((resolve) => {
		request(params, (error, response, body) => {
			if (!error && (response.statusCode === 200 || response.statusCode === 304)) {
				
				if (options.cache) {
					cache.set(`cache_${options.url}`, body, options.cacheTime || INIT_CACHE_TIME).catch((e) => {
						// 记录下redis的set error
						console.error(`redis set error:${e}`);

					});
				}
				// 用于当接口不可用时调用
				cache.set(`back_${options.url}`, body).catch((e) => {
					// 记录下redis的set error
					console.error(`redis set error${e.message}`);

				});
				resolve(body);
			} else {
				console.error(error);
				resolve(null);
			}
		});
	});
};

module.exports = async (options) => {
	let data = null;
	if (options.cache) {
		data = await cache.get(`cache_${options.url}`);
	}
	if (data) {
		return data;
	}
	data = await getData(options);
	if (data === null) {
		data = await cache.get(`back_${options.url}`);
	}
	return data;
};


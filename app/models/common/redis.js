const Redis                 = require("@node/redis");
// const _                     = require("underscore");
// const g                     = require("../config/code.js");

let redisClient = "";

let init = async () => {
	if (redisClient) {
		return redisClient;
	}
	try {
		redisClient = await Redis.connect();
	} catch (e) {
		console.log(e);
	}
	return redisClient;
};

let get = async (key) => {
	if (typeof key !== "string") {
		key = String(key);
	}
	let result = await redisClient.get(key);
	return result;
};

let set = async (key, value, expire = 24 * 3600 * 15) => {
	if (typeof value !== "string") {
		value = JSON.stringify(value);
	}

	let result = await redisClient.set(key, value, expire);
	return result;
};

module.exports = {
	init,
	get,
	set,
};

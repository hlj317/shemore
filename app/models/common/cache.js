const Redis = require("ioredis");
// const _ = require("underscore");
// const g = require("../config/code.js");
// const LRU = require("lru-cache");

let client;
// let localData = {};
// let cacheLru = new LRU({
// 	max: 1000,
// 	maxAge: 1000 * 60 * 5,
// });

// let xidLru = new LRU({
// 	max: 2000000,
// 	maxAge: 1000 * 3600 * 24,
// });

let set = async (key, value, expire = 600) => {
	let res =  await client.set(key, String(value), "EX", +expire);
	return res;
};

let get = async (key, type = "cache") =>
	await new Promise((resolve, reject) => {
		console.log(type);
		let val;

		if (val) {
			resolve(val);
		} else {
			client.get(key, (err, reply) => {
				/* istanbul ignore else  */

				if (!err) {
					// lru.set(key, reply);
					resolve(reply);
				} else {
					reject(err);
				}
			});
		}
	});

let del = async (key) => {
	client.del(key);
};

let init = async (redisConf, isWeb) => {
	if (client) {
		return false;
	}

	if (!redisConf) {
		// throw new RedisConfigError(redisConf);
	}

	if (redisConf.length > 1) {
		client = new Redis.Cluster(redisConf);
	} else {
		client = new Redis(redisConf[0]);
	}

	client.on("error", (err) => console.log(err));

	client.on("end", () => console.log("Redis connect end"));

	await new Promise((resolve, reject) => {
		client.on("ready", (err) => {
			if (err) {
				console.log(err);

				reject(err);
			} else {
				console.log("Redis connected");
				resolve(true);
			}
		});
	});

	if (isWeb) {
		await hotLoad();
	}

	for (let val of process.argv) {
		if (val === "web") {
			await hotLoad();

			break;
		}
	}
};

// let loadOneKey = async (key) => {
// 	await new Promise((resolve) => {
// 		client.get(key, (err, reply) => {
// 			xidLru.set(key, reply);
// 			resolve();
// 		});
// 	});
// };

let hotLoad = async () => {
	return;

	// let loadKeys = null;
	// let time = +new Date();
	// let index = 0;

	// await new Promise((resolve) => {
	// 	client.keys("ux*", (err, reply) => {
	// 		console.log(`hot load key: ux*, count: 0 / ${reply.length}`);
	// 		loadKeys = reply;
	// 		resolve();
	// 	});
	// });

	// for (let key of loadKeys) {
	// 	await loadOneKey(key);

	// 	index++;

	// 	if (+new Date() - time > 1000) {
	// 		time = +new Date();
	// 		console.log(`hot load key: ux*, count: ${index} / ${loadKeys.length}`);
	// 	}
	// }
};

let getClient = () => client;

module.exports = {
	set,
	get,
	del,
	init,
	getClient,
};

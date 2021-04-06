// const _ = require("underscore");
// const base64 = require("base-64");
// const GroupModel = require("../model/groupsModel.js");
const AccountModel = require("../model/accountModel.js");
const MovieModel = require("../model/movieModel.js");
const SqlModel = require("../model/sqlModel.js");

class BaseClass {
	constructor() {
		// this.groupModel = GroupModel.instance();
		this.accountModel = AccountModel.instance();
		this.movieModel = MovieModel.instance();
		this.sqlModel = SqlModel.instance();
		this.ctx = "";
	}

	static instance() {
		const clazz = this.name;
		if (!BaseClass.instances[clazz]) {
			BaseClass.instances[clazz] = new this();
		}

		return BaseClass.instances[clazz];
	}

	/**
     * 检查方法 方法只能是'get'或者 'post'
     *
     * @param method
     * @returns {boolean}
     */
	checkMethod(method) {
		method = method.toLowerCase();
		return method === "get" || method === "post";
	}

	responseErrorMessage(errCode = 0, message = "请求失败，检查网络") {
		this.ctx.body = {
			success: false,
			errCode,
			err_code: errCode,
			message,
		};
	}

}

BaseClass.instances = {};

module.exports = BaseClass;
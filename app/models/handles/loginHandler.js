const BaseClass = require("./baseClass.js");
const g = require("../config/code.js");
const cache = require("../../helpers/cache");
// const session = require("koa-session");

class loginHandler extends BaseClass {
	constructor() {
		super();
	}

	/**
     *
     * @param ctx
     * @param next
     * @param oid 新用户oid
     * @returns {Promise<*>}
     */
	async run(ctx, next,isLogin,message) {

		if(isLogin){
			ctx.body = {
				success: true,
				message: message || "登录成功"
			};
		}else{
			ctx.body = {
				success: false,
				message: message || "密码错误"
			};
		}

		return next();
	}

	async handler(ctx, next) {

		this.ctx = ctx;
		this.next = next;
		let sessionId = "",
			isLocked = false,
			tokenSessionId = "",
			username = "",
			password = "",
			errorLoginNums = 0,
			isLogin = false,
			runDate = "";
        
		if (!this.checkMethod(ctx.request.method)) {
			this.responseErrorMessage(405, "请求方法无效");
			return next();
		}

		isLocked = await cache.get("isLocked");

		if(isLocked){
			runDate = await this.run(ctx, next,false,"账号已被锁定");
		}else{
			sessionId = await cache.get("sessionId");
			tokenSessionId = ctx.cookies.get("sessionId");
			if(sessionId && sessionId === tokenSessionId){
				runDate = await this.run(ctx, next,true,"登陆成功");
			}else{
				username = ctx.request.body.username;
				password = ctx.request.body.password;
				isLogin = await this.accountModel.getAccount(username,password);
				if(isLogin){
					sessionId = 10000000 + Math.floor(Math.random() * 89999999);
					await cache.set("sessionId",sessionId,60 * 60 * 24).catch(e => console.error(`redis set error${e.message}`));
					//用户存一下cookie
					let days = 24 * 60 * 60 * 1000;
					ctx.set("Access-Control-Allow-Origin", "*");
					ctx.set("Access-Control-Allow-Methods", "POST, GET");
					ctx.set("Access-Control-Max-Age", "3600");
					ctx.set("Access-Control-Allow-Credentials", "true");
					ctx.set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
					ctx.cookies.set("sessionId", sessionId, {
						httpOnly: false,
						// domain: ctx.request.header.host,
						expires: new Date(Date.now() + days)
					});
					ctx.cookies.set("username", username, {
						httpOnly: false,
						// domain: ctx.request.header.host,
						expires: new Date(Date.now() + days)
					});
					runDate = await this.run(ctx, next,isLogin,"登陆成功");
				}else{
					errorLoginNums = await cache.get("errorLoginNums");
					if(errorLoginNums++ >= 5){
						await cache.set("isLocked",true,60 * 60 * 24).catch(e => console.error(`redis set error${e.message}`));
						await cache.del("errorLoginNums").catch(e => console.error(`redis set error${e.message}`));
						runDate = await this.run(ctx, next,false,"账号已被锁定");
					}else{
						await cache.set("errorLoginNums",errorLoginNums,10).catch(e => console.error(`redis set error${e.message}`));
						runDate = await this.run(ctx, next,false,"登陆失败");
					}
				}
			}
		}

		return runDate;

	}

	/**
     * 判断战队是否已经存在,
     * @param gid
     * @returns {Promise<void>}
     */
	async checkGroupInvalid(gid) {
		if (!gid) {
			return false;
		}
		let result = await this.groupModel.getGroupInfo(gid);
		if (result) {
			return true;
		}
		return false;
	}

	/**
     * 添加新成员
     * @param ctx
     * @param newMemberOid
     * @param groupId
     * @param userInfo
     * @returns {Promise<boolean>}
     */
	async addNewMember(ctx, newMemberOid, groupId, userInfo) {
		if (!newMemberOid || !groupId) {
			return false;
		}
		let initialPlayNum = await this.getBconf(g.INITIAL_TOTALL_PLAY_NUM) || 5;
		let res = await this.playerModel.addNewPlayer(userInfo, groupId, initialPlayNum);
		console.log(res);
	}

	/**
     *  判断groupId 是否为正整数
     * @param groupId
     * @returns {boolean}
     */
	checkGroupIdValid(groupId) {
		return (/(^[0-9]\d*$)/.test(groupId));
	}
}

module.exports = loginHandler;
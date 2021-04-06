"use strict";

const AbstractError = require("../common/abstractError.js");
/**
 * @abstract
 */

class BaseModel {
	/**
     * @param {String}
     */
	constructor(tableName, dbName) {
		if (!tableName || !dbName) {
			throw new AbstractError(this.constructor.name);
		}
		/**
         * @type {String}
         */
		this.tableName = tableName;
		/**
         * @type {String}
         */
		this.dbName = dbName;
	}
	/**
     *  @public
     *  @return {*}
     */
	static instance() {
		const clazz = this.name;
		if (!BaseModel.instances[clazz]) {
			BaseModel.instances[clazz] = new this();
		}
		return BaseModel.instances[clazz];
	}
	/**
     * 获取table名称
     * @protected
     * @returns {String|*}
     */
	getTableName() {
		return this.tableName;
	}
	getRealTableName() {
		let tableName = this.getTableName();
		if (!tableName) {
			throw new Error("tablename can not be empty");
		}
		return tableName;
	}
}

BaseModel.instances = {};

module.exports = BaseModel;
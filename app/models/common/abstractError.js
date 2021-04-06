"use strict";

/**
 *  根据业务场景，对Error进行了一次封装
 */
class abstractError extends Error {
	/**
     * @param clas 报错的class
     */
	constructor(clas) {
		let errorMessage = `can not instantiate abstract class ${clas}`;
		super(errorMessage);
	}
}

module.exports = abstractError;

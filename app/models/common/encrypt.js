const moment                = require("moment");
const crypto                = require("crypto");
const g                     = require("../config/code.js");

class Encrypt {
	/**
     *
     * @param openId
     * @returns {String}
     */
	static encodeSendToken(openId) {
		const date   = moment().format("YYYYMMDDHHmmss");
		const sendId = `${date}|${openId}|${Math.random()}`;

		return this.aesEncode(sendId, this.algorithm.AES128ECB, g.CARD_COLLECT_SENDID_KEY);
	}

	static aesEncode(data, algorithm, password) {
		let crypted;

		try {
			const cipher = crypto.createCipher(algorithm, password);

			crypted = cipher.update(data, "utf8", "hex");
			crypted += cipher.final("hex");
		} catch (e) {
			// Log.out(e);
		}

		return crypted;
	}

	static decodeSendToken(decrypted) {
		let sendId = this.aesDecode(decrypted, this.algorithm.AES128ECB, g.CARD_COLLECT_SENDID_KEY);

		if (!sendId) {
			return false;
		}

		let date,
			openId;

		[date, openId] = sendId.split("|");

		return {
			date,
			openId,
		};
	}

	static aesDecode(data, algorithm, password) {
		let dec = "";

		try {
			const decipher = crypto.createDecipher(algorithm, password);

			dec = decipher.update(data, "hex", "utf8");
			dec += decipher.final("utf8");
		} catch (e) {
			console.log(e);
		}

		return dec;
	}
}

Encrypt.algorithm = {
	AES256CTR: "aes-256-ctr",
	AES128ECB: "aes-128-ecb",
};

console.log(Encrypt.decodeSendToken("4709dc279bdb62e7899a1389a5a3dc1688b5ee896a305a1b5ea9290f24cca4a72961f6286609fe0e55d4768297d967fc6c58e1ddd410263dda47716fa080a667"));

// module.exports  = Encrypt;

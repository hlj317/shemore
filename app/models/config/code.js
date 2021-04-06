// TODO 重新主动授权的code 统一成 101

// 请求方法无效, 请求方法只能是get或post
const BASE_INVALID_REQUEST_METHOD = 100;
// 请重新 主动授权
const BASE_RE_ACTIVE_AUTHORIZATION = 101;
// 请重新静默授权
const BASE_RE_SILENT_AUTHORIZATION = 102;
// 缺少 code 和 token_o
const BASE_LACK_REQUEST_CODE_AND_TOKEN_O = 103;
// token_o 解析出来，没有oid
const BASE_TOKEN_O_DECODE_NO_OID = 104;
// 插入player表时，没有insert_id
const BASE_ADD_PLAYER_TABLE_BUT_NO_INSERT_ID = 105;
// 插入player表时失败
const BASE_ADD_PLAYER_TABLE_BUT_FAIL = 106;
// 在黑名单中，也就是曾经离开过该战队
const IN_BLACK_LIST = 107;

// 所有修改数据的接口，都会判断是否活动结束
const OUT_OF_DATE = 108;

// 缺少必要的参数
const LACK_PARAM = 0;
// 请求既没有OID, 也没有code
const LACK_OID_AND_CODE = 1;
// code 失效或无正确
const INVALID_CODE = 2;
// cookie中有值，但是数据库中没有, 重新请求code
const IN_COOKIE_NOT_IN_MYSQL = 3;


// 加入战队接口，group_id不规范，只能是纯数字
const JOIN_INVALIDD_GROUP_ID = 200;
// 加入战队接口，group_id在数据库中不存在
const JOIN_NO_GROUP_ID = 201;
// 加入战队接口，oid已经在其他战队中
const JOIN_BUT_IN_OTHER_GROUP = 202;
// 加入战队接口，oid 已经在该战队中，并且是队长
const JOIN_BUT_ALREADY_CAPTIN = 203;
// 加入战队接口，想加入的队伍已经满员了
const JOIN_BUT_GROUP_FULL_PERSON = 204;
// 加入战队接口，想加入的队伍已经失效了（队长跑路了）
const JOIN_BUT_GROUP_INVALID = 205;


// 脱离队伍，但是oid数据库中没有
const LEAVE_GROUP_BUT_NOT_OID = 300;
// 脱离队伍，但是group_id数据库中没有
const LEAVE_GROUP_BUT_NOT_GROUPID = 301;
// 脱离队伍，但oid是该战队的队长
const LEAVE_GROUP_BUT_IS_CAPTIN = 302;
// 脱离队伍，但oid 不在该战队中
const LEAVE_GROUP_BUT_NOT_IN_GROUP = 303;


// 踢出用户，但是不在同一个队伍
const DELETE_PLAYER_BUT_NOT_IN_ONE_GROUP = 400;
// 踢出用户，但是请求人不是队长
const DELETE_PLAYER_BUT_NOT_CAPTIN = 401;
// 踢出用户，但是该战队不存在
const DELETE_PLAYER_BUT_NO_GID = 402;
// 踢出用户，但是被踢的用户是队长
const DELETE_PLAYER_BUT_OUTPLAYER_IS_CAPTIN = 403;
// 踢出用户，但是被踢出去的人 out_id 不存在
const DELETE_PLAYER_BUT_NOT_OUT_OID = 404;
// 踢出用户，但是oid 不存在
const DELETE_PLAYER_BUT_NOT_OID = 405;

// 获取我的团队接口，该oid不存在
const GROUP_INFO_NEW_PLAYER_NO_OID = 101;

// 分享出去增加可玩次数，该oid不存在
const PLAY_AGAIN_NO_OID = 600;

// 更改战队名称，但oid 不在数据库中
const CHANGE_GROUP_NAME_BUT_NOT_OID = 700;
// 更改战队名称，但oid不是队长
const CHANGE_GROUP_NAME_BUT_NOT_CAPTIN = 701;
// 更改战队名称，但grup_id不存在
const CHANGE_GROUP_NAME_BUT_NOT_GROUP_ID = 702;
// 更改战队名称，但参数 new_name 不存在
const CHANGE_GROUP_NAME_BUT_LACK_NAME = 703;
// 更改战队名称，但参数 new_name 长度超出了上限
const CHANGE_GROUP_NAME_BUT_NAME_LONG = 704;

// 更新成绩接口 没有token_g
const UPDATE_SCORE_BUT_NO_TOKEN_G = 800;
// 更新成绩接口 token_g解密失败
const UPDATE_SCORE_BUT_TOKEN_DECODE_WRONG = 801;
// 更新成绩接口 token_g失效了
const UPDATE_SCORE_BUT_TOKEN_EXPIRE = 802;
// 更新成绩接口 token_g解密出来的oid失效了
const UPDATE_SCORE_BUT_OID_WRONG = 803;
// 更新成绩接口 token_o解密出来的用户信息不存在
const UPDATE_SCORE_BUT_NO_OID = 804;
// 更新成绩接口 level等级被串改
const UPDATE_SCORE_BUT_LEVEL_WRONG = 805;
// 更新成绩接口 参数缺失
const UPDATE_SCORE_BUT_LACK_PARAMS = 806;
// 更新成绩接口 JS MD5 对不上
const UPDATE_SCORE_BUT_JS_WRONG = 807;
// 更新成绩接口 JSON MD5 对不上
const UPDATE_SCORE_BUT_JSON_WRONG = 808;
// 更新成绩接口 bearSize 被篡改
const UPDATE_SCORE_BUT_BEARSIZE_WRONG = 809;
// 更新成绩接口 但是没有可玩次数了
const UPDATE_SCORE_BUT_NO_LEFT_NUM = 810;
// 更新成绩接口 token只能用一次，但是被多次使用了
const UPDATE_SCORE_BUT_TOKEN_MULTI_USE = 811;
// 更新成绩接口 用户提交的行为记录异常
const UPDATE_SCORE_BUT_WRONG_DATA = 812;
// 更新成绩接口 用户没有提交interval
const UPDATE_SCORE_BUT_NO_INTERVAL = 813;
//d 更新成绩接口 用户在黑名单中
const UPDATE_SCORE_BUT_IN_BLACK_LIST = 814;

// 排行榜接口 page 或者 pageSize不合规
const RANK_INVALID_PAGE_OR_PAGESIZE = 900;

// 初始化游戏 但是没有可玩次数了
const INIT_GAME_BUT_NO_LEFT_NUM = 1000;
// 初始化游戏 但是传过来的oid数据库中不存在
const INIT_GAME_BUT_NOT_OID = 1001;

const SUBMIT_BUT_NOT_FINISH = 2001;
const SUBMIT_BUT_NOT_OID = 2002;
const SUBMIT_BUT_NOT_WINNER = 2003;
const SUBMIT_BUT_INVALID_INFO = 2004;
const SUBMIT_BUT_ALREADY_IN = 2005;

const GET_WINNER_INFO_BUT_NOT_WINNER = 3001;
const GET_WINNER_INFO_BUT_IS_ONLINE = 3002;

// 首页接口
const HOME_PAGE_NO_OID = 101;



// 用户最初一开始可以玩的次数 bconf 配置
const INITIAL_TOTALL_PLAY_NUM = "/bconf/member/activity/flybear908_initial_play_total_num";
// bconf 配置，json1的md5码
const JSON_1 = "/bconf/member/activity/flybear_908_game_json_2_md5";
// bconf 配置，json2的md码
const JSON_2 = "/bconf/member/activity/flybear_908_game_json_2_md5";

// 队伍最多有多少人
const MAX_GROUP_NUM = 5;
// 队伍的名称最多可以多长12  数据库设计是verchar 30个字符
const MAX_GROUP_NAME_LENGTH = 12;
// 分享一次可以加多少人
const SHARE_ADD_LEFT_NUM = 5;

const DEFAULT_WX_NICKNAME = "佚名";
const DEFAULT_WX_AVATAR = "https://b3.beicdn.com/upload/face/base/img_mine_default_avatar.png";
const DEFAULT_WX_NICKNAME_ARR = [
	"欧阳克",
	"故人江海别",
	"送舟行",
	"来年秋风起",
	"您可真混蛋",
	"哥哥",
	"烦琐事",
	"鹤居",
	"赐我白绫",
	"清梦",
	"鴉",
	"嗣音",
	"酒话",
	"万花筒",
	"路远马亡",
	"何日重到苏澜桥",
	"炭火舔着夜色",
	"豆蔻红妆 ",
	"无羡",
	"皓目",
	"吟啸",
	"折扇戏美人",
	"酬卿",
	"着青衣",
	"魍魉",
	"沧海寄余心",
	"君子好逑",
	"时年七月",
	"灼琴",
	"吞食回忆",
	"欲笑还颦",
	"星河",
	"蓝忘机",
	"西洋镜",
	"世间万物明澈见底",
	"莫玄羽",
	"鬼島",
	"魏无羡",
	"拟歌先敛",
	"共醉",
	"求不得",
	"三郎",
	"悠悠桃花香",
	"谢怜",
	"野马踏春生",
	"魏无羡",
	"似是嘲讽",
	"离心咒",
	"琼梦",
	"魏无羡",
	"樱染",
	"权御",
	"犹如故人归",
	"残志",
	"囚心锁",
	"入梦寻君",
	"风间",
	"花城",
	"北渚南山",
	"諵笙",
	"千郗",
	"桀桀",
	"扶苏",
	"怪我了",
	"哈拉嘿",
	"张十一",
	"小柴柴",
	"张文豪",
	"好吃哦",
	"情未了",
	"权志龙",
	"陌路人",
	"温小峥",
	"陌生人",
	"处网友",
	"残曦月",
	"啊彭哥",
	"孟浩浩",
	"小新星",
	"毒师铭",
	"巫妖王",
	"爱与诚",
	"屌炸天",
	"邓克诚",
	"青凋牧",
	"博雅轩",
	"小仔仔",
	"喵大仙",
	"格格巫",
	"千秋岁",
	"何大大",
	"洃煌",
	"凤求凰",
	"小哥哥",
	"小头头",
	"吉宝宝",
	"酒未醒",
	"允许你",
	"弥乐佛",
	"老顽童",
	"大酋长",
	"上进心",
	"凉米饭",
	"星满楼",
	"柒狐陌",
	"部落君",
	"牧羊人",
	"正经鬼",
	"风华月",
	"或许吧",
	"自由人",
	"巴菲特",
	"清晨雨露",
	"江自空流",
	"火曾穆杀",
	"汤圆乖乖",
	"超级会员",
	"兴想事诚",
	"一生回忆",
	"自由世界",
	"人生如画",
	"柯迪哥哥",
	"冰山一角",
	"欲望天下",
	"下恶如鬼",
	"白衣少年",
	"雨淋浸透",
	"梦想成真",
	"相遇有缘",
	"南宫暮凌",
	"中年帅哥",
	"勿忘初心",
	"心意巧合",
	"凉山英雄",
	"倾心为你",
	"风清云淡",
	"世界之峰",
	"荖提树下",
	"美梦成真",
	"东方醒龙",
	"血涅残情",
	"特别的你",
	"荒岛少年",
	"爱你的人",
	"心中所在",
	"爱的剑神",
	"好喜欢你",
	"南柠北栀",
	"收微信号",
	"浩瀚海洋",
	"随心所欲",
	"开心一笑",
	"一笑奈何",
	"没事聊聊",
	"期待未来",
	"终伴我暖",
	"拒绝醒悟",
	"星光之耀",
	"林灿车行",
	"一介书生",
	"惊涛拍岸",
	"亡梦爱人"
];

// redis 中 group_rank 的最大缓存时间
const REDIS_GROUP_RANK_MAX_EXPIRE_TIME = "/bconf/member/activity/flybear_redis_group_rank_expire_max_time";
// redis 中，groupId 对应的黑名单的最大缓存时间
const REDIS_GROUP_BLACK_LIST = 24 * 60 * 60 * 15;
// redis 中，message 通知的最大缓存时间
const REDIS_MESSAGE_MAX_EXPIRE = 24 * 60 * 60 * 15;

// 微信公众号默认的标识
const WX_TYPE = 7;


// cookie 多长时间失效 (MS)
const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
// token_o 多长时间失效 (S)
const TOKEN_O_MAX_AGE = 24 * 60 * 60 * 9;
// token_g 的 最大过期时间 150分钟
const TOKEN_G_MAX_EXPIRE_TIME = "/bconf/member/activity/flybear_908_game_token_g_max_expire";

// beconf 游戏结束时间
const END_TIME = "/bconf/member/activity/flybear_908_game_end_time";


// salt
const CARD_COLLECT_SENDID_KEY = "78d3e9887f032d7e6f9a244ca5b0496b";
// 团队排行版 group_rank 接口，是否走redis缓存(默认是false, 若数据量大的话，需要改成true)
const IS_GROUP_RANK_GET_FROM_REDIS = false;

const JS = "alert('test')";

const BLACK_LIST = [
	"o2oB5v-flLGcu75g_ZKgJX1xaTCg",
	"o2oB5v7iFteEMteWso4wcixcK3Ak",
	"o2oB5v_WwkHhhWWQMlaa9kZAj0fc"
];

const PRIZES_LIST = {
	"1": {
		name: "一等奖",
		prize: "1000元现金",
	},
	"2": {
		name: "二等奖",
		prize: "800元现金"
	},
	"3": {
		name: "三等奖",
		prize: "600元现金"
	},
	"4": {
		name: "第四名",
		prize: "88元代金券*5"
	},
	"5": {
		name: "第五名",
		prize: "50元代金券*5"
	},
	"6": {
		name: "优秀奖",
		prize: "贝贝文化产品(充电宝/音响/背包)随机发放"
	}
};


module.exports = {
	OUT_OF_DATE,

	BASE_INVALID_REQUEST_METHOD,
	BASE_RE_ACTIVE_AUTHORIZATION,
	BASE_RE_SILENT_AUTHORIZATION,
	BASE_LACK_REQUEST_CODE_AND_TOKEN_O,
	BASE_TOKEN_O_DECODE_NO_OID,
	BASE_ADD_PLAYER_TABLE_BUT_NO_INSERT_ID,
	BASE_ADD_PLAYER_TABLE_BUT_FAIL,
	IN_BLACK_LIST,

	LACK_OID_AND_CODE,
	WX_TYPE,
	INVALID_CODE,
	INITIAL_TOTALL_PLAY_NUM,
	COOKIE_MAX_AGE,
	IN_COOKIE_NOT_IN_MYSQL,
	CARD_COLLECT_SENDID_KEY,

	GROUP_INFO_NEW_PLAYER_NO_OID,

	TOKEN_O_MAX_AGE,

	MAX_GROUP_NUM,
	MAX_GROUP_NAME_LENGTH,

	JOIN_INVALIDD_GROUP_ID,
	JOIN_NO_GROUP_ID,
	JOIN_BUT_GROUP_INVALID,
	JOIN_BUT_IN_OTHER_GROUP,
	JOIN_BUT_ALREADY_CAPTIN,
	JOIN_BUT_GROUP_FULL_PERSON,

	LACK_PARAM,
	DELETE_PLAYER_BUT_NOT_IN_ONE_GROUP,
	DELETE_PLAYER_BUT_NOT_CAPTIN,
	DELETE_PLAYER_BUT_NO_GID,
	DELETE_PLAYER_BUT_OUTPLAYER_IS_CAPTIN,
	DELETE_PLAYER_BUT_NOT_OUT_OID,
	DELETE_PLAYER_BUT_NOT_OID,

	LEAVE_GROUP_BUT_NOT_OID,
	LEAVE_GROUP_BUT_NOT_GROUPID,
	LEAVE_GROUP_BUT_IS_CAPTIN,
	LEAVE_GROUP_BUT_NOT_IN_GROUP,

	CHANGE_GROUP_NAME_BUT_NOT_OID,
	CHANGE_GROUP_NAME_BUT_NOT_CAPTIN,
	CHANGE_GROUP_NAME_BUT_NOT_GROUP_ID,
	CHANGE_GROUP_NAME_BUT_LACK_NAME,
	CHANGE_GROUP_NAME_BUT_NAME_LONG,

	PLAY_AGAIN_NO_OID,

	TOKEN_G_MAX_EXPIRE_TIME,
	END_TIME,
	SHARE_ADD_LEFT_NUM,
	REDIS_GROUP_RANK_MAX_EXPIRE_TIME,
	REDIS_MESSAGE_MAX_EXPIRE,

	UPDATE_SCORE_BUT_NO_TOKEN_G,
	UPDATE_SCORE_BUT_NO_INTERVAL,
	UPDATE_SCORE_BUT_TOKEN_DECODE_WRONG,
	UPDATE_SCORE_BUT_TOKEN_EXPIRE,
	UPDATE_SCORE_BUT_OID_WRONG,
	UPDATE_SCORE_BUT_NO_OID,
	UPDATE_SCORE_BUT_LEVEL_WRONG,
	UPDATE_SCORE_BUT_LACK_PARAMS,
	UPDATE_SCORE_BUT_JS_WRONG,
	UPDATE_SCORE_BUT_JSON_WRONG,
	UPDATE_SCORE_BUT_NO_LEFT_NUM,
	UPDATE_SCORE_BUT_BEARSIZE_WRONG,
	UPDATE_SCORE_BUT_TOKEN_MULTI_USE,
	UPDATE_SCORE_BUT_WRONG_DATA,
	UPDATE_SCORE_BUT_IN_BLACK_LIST,

	RANK_INVALID_PAGE_OR_PAGESIZE,

	HOME_PAGE_NO_OID,

	INIT_GAME_BUT_NO_LEFT_NUM,
	INIT_GAME_BUT_NOT_OID,

	SUBMIT_BUT_NOT_FINISH,
	SUBMIT_BUT_NOT_OID,
	SUBMIT_BUT_NOT_WINNER,
	SUBMIT_BUT_INVALID_INFO,
	SUBMIT_BUT_ALREADY_IN,

	GET_WINNER_INFO_BUT_NOT_WINNER,
	GET_WINNER_INFO_BUT_IS_ONLINE,

	JS,
	JSON_1,
	JSON_2,
	DEFAULT_WX_NICKNAME,
	DEFAULT_WX_NICKNAME_ARR,
	DEFAULT_WX_AVATAR,
	REDIS_GROUP_BLACK_LIST,
	IS_GROUP_RANK_GET_FROM_REDIS,

	BLACK_LIST,
	PRIZES_LIST,
};
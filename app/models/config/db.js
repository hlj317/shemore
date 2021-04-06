let dbConf = "";

const DEV = {
    host: "172.16.3.30",
    user: "root",
    password: "root",
    database: "beibei_wxmp",
    group_table: "flybear_test",
    group_table_field: ["group_name", "group_score"],
    account_table: "movie_login",
    account_table_field: ["username", "password"],
    movie_table: "movie_list",
    movie_table_field: ["doubanId", "title", "rate", "poster", "type"],
    fight_user_table: "fight_user",
    fight_user_table_field: ["uid", "username", "password", "nickname", "userpic", "openid", "gmt_create", "gmt_modified"],
    fight_property_table: "fight_property",
    fight_property_table_field: ["uid", "rank", "exp", "win_num", "lost_num", "iq", "power", "blood", "savvy", "speed", "will", "gmt_create", "gmt_modified"],
    fight_detail_table: "fight_detail",
    fight_detail_table_field: ["uid", "enemy_id", "enemy_name", "starter_fight", "win", "gmt_create", "gmt_modified"]

};

const PRO = {
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "hlj",
    account_table: "movie_login",
    account_table_field: ["username", "password"],
    movie_table: "movie_list",
    movie_table_field: ["doubanId", "title", "rate", "poster", "type"],
    fight_user_table: "fight_user",
    fight_user_table_field: ["uid", "username", "password", "nickname", "userpic", "openid", "gmt_create", "gmt_modified"],
    fight_property_table: "fight_property",
    fight_property_table_field: ["uid", "rank", "exp", "win_num", "lost_num", "iq", "power", "blood", "savvy", "speed", "will", "gmt_create", "gmt_modified"],
    fight_detail_table: "fight_detail",
    fight_detail_table_field: ["uid", "enemy_id", "enemy_name", "starter_fight", "win", "gmt_create", "gmt_modified"]

};

if (process.env.NODE_ENV === "dev") {
    dbConf = DEV;
} else {
    dbConf = PRO;
}

module.exports = dbConf;

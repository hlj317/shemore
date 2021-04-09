let home = async function (ctx, next) {
    await ctx.render("pc/home", {
        title: "个人简历介绍",
        description: "个人简历介绍",
        keyword: "个人简历介绍"
    });

    return next();
};

module.exports = {
    home
};

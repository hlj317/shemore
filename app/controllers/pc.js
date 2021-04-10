let home = async function (ctx, next) {
    await ctx.render("pc/home", {
        title: "动画小猪joke",
        description: "动画小猪joke",
        keyword: "动画小猪joke"
    });

    return next();
};

module.exports = {
    home
};

let hello = async function (ctx, next) {
    await ctx.render("demo/hello", {
        title: "黄力钧个人博客",
        description: "黄力钧个人博客",
        keyword: "黄力钧个人博客"
    });

    return next();
};

module.exports = {
    hello
};

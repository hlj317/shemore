let home = async function (ctx, next) {
    await ctx.render("pc/home", {
        title: "水梦露展示宣传",
        description: "水梦露展示宣传",
        keyword: "水梦露展示宣传"
    });

    return next();
};

module.exports = {
    home
};

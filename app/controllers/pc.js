let home = async function (ctx, next) {
    await ctx.render("pc/home", {
        title: "水梦露展示",
        description: "水梦露展示",
        keyword: "水梦露展示"
    });

    return next();
};

module.exports = {
    home
};

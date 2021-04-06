let home = async function (ctx, next) {
    await ctx.render("pc/home", {
        title: "水梦露展示页",
        description: "水梦露展示页",
        keyword: "水梦露展示页"
    });

    return next();
};

module.exports = {
    home
};

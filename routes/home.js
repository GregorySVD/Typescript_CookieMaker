
const express = require('express');
const {getCookiesSettings} = require("../utils/get-cookies-settings");

class HomeRouter {
    constructor() {
        this.router = express.Router();
        this.setUpRoutes();
    }

    setUpRoutes() {
        this.router.get('/', this.home);
    }

    home = (req, res) => {
        const {sum, addons, base, allBases, allAddons} = getCookiesSettings(req);

        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}

module.exports = {
    HomeRouter,
};

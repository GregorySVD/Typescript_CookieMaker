const express = require('express');
const {getCookiesSettings} = require("../utils/get-cookies-settings");


const orderRouter = express.Router();

orderRouter
    .get('/summary', (req, res) => {
        const {sum, addons, base, allAddons, allBases} = getCookiesSettings(req);
        res.render('order/summary', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    })

    .get('/thanks', (req, res) => {
        const {sum} = getCookiesSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieAddons')
            .render('order/thanks', {
                sum,
            });
    })

module.exports = {
    orderRouter,
}

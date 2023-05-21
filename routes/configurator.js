const express = require('express');
const {getAddonsFromReq} = require("../utils/get-addons-from-req");
const {COOKIE_ADDONS, COOKIE_BASES} = require("../data/cookies-data");
const {showErrorPage} = require("../show-error-page.js");
const configuratorRouter = express.Router();

configuratorRouter

    .get('/selected-base/:baseName', (req, res) => {
        const {baseName} = req.params;

        if (!COOKIE_BASES[baseName]) {
            return showErrorPage(res, `There is no such base as ${baseName}`);
        }
            res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    })
    .get('/add-addon/:addonName', (req, res) => {

        const {addonName} = req.params;
        //walidacja
        if (!COOKIE_ADDONS[addonName]) {
            return showErrorPage(res, `There is no such base as ${addonName}`);
        }

        const addons = getAddonsFromReq(req);

        if (addons.includes(addonName)) {
            return showErrorPage(res, `You already added ${addonName}. You can't add it again.`);
        }

        addons.push(addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });

    })
    .get('/delete-addon/:addonName', (req, res) => {
        const {addonName} = req.params;

        const oldAddons = getAddonsFromReq(req);
        if(!oldAddons.includes(addonName)) {
            return showErrorPage(res, `Cannot deleted something that is not already added to the cookie.
            ${addonName} not found in Your cookie`);
        }
        const addons = oldAddons.filter(addon => addon !== addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    });


module.exports = {
    configuratorRouter,
};

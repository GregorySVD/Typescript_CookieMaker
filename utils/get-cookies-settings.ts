// const {getAddonsFromReq} = require("./get-addons-from-req");
// const {COOKIE_BASES, COOKIE_ADDONS} = require("../data/cookies-data");
// const {handlebarsHelpers} = require("./handlerbars-helpers");
//
// function getCookiesSettings(req) {
//     const {cookieBase: base} = req.cookies;
//
//     const addons = getAddonsFromReq(req);
//     const allBases = Object.entries(COOKIE_BASES);
//     const allAddons = Object.entries(COOKIE_ADDONS);
//
//     const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
//         + addons.reduce((prev, curr) => {
//             return prev + handlebarsHelpers.findPrice(allAddons, curr)
//         }, 0);
//
//     return {
//         base,
//         addons,
//         sum,
//         allAddons,
//         allBases,
//     };
// }
//
// module.exports = {
//     getCookiesSettings,
// };

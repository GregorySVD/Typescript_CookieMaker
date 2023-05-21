//usefull utils in code (very usefull when used couple times in one project)

function getAddonsFromReq(req) {
    const {cookieAddons} = req.cookies;
    return cookieAddons ? JSON.parse(cookieAddons) : [];
}

module.exports = {
    getAddonsFromReq,
};

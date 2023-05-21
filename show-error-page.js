function showErrorPage(res, text) {
    return res.render('Error', {
        description: text,
    })
}
module.exports = {
    showErrorPage,
}

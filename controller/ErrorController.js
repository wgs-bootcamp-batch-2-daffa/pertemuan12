exports.Error404 = (req, res) => {
    res.status(404)
    res.render('error', { stat: 404 })
}

exports.Error500 = (req, res) => {
    res.status(500)
    res.render('error', { stat: 500 })
}
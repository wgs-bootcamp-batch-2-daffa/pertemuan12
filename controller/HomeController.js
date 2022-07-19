exports.HomePage = (req, res) => {
    title = 'Home Page'
    res.render('index', { title })
}
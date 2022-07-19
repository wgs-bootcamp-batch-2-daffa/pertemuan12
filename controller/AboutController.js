exports.AboutPage = (req, res) => {
    data = {
        title: 'About Page',
        name: 'M. Daffa R. A.',
        occupation: 'Founder Daffapedia'
    }
    res.render('about', data)
}
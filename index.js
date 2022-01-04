const express = require('express')
const expressHandlebars = require('express-handlebars')
// const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')


const app = express()
// Disable no-undef in ESLint
/* eslint-disable no-undef */
const port = process.env.PORT || 3030
/* eslint-enable no-undef */

// Handlebars views
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')


// Disable no-undef in ESLint
/* eslint-disable no-undef */
app.use(express.static(__dirname + '/public'))
/* eslint-enable no-undef */


app.get('/', handlers.home)
app.get('/about', handlers.about)
//Headers
app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})
// 404 Page
app.use(handlers.notFound)
// 500 Page
app.use(handlers.serverError)


if(require.main === module) {
    app.listen(port, () => console.log(
        `Express running on http://localhost:${port} ` +
        `press Ctrl+C for exit`
    ))
} else {
    module.exports = app
}

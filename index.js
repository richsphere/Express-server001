const express = require('express')
const expressHandlebars = require('express-handlebars')
// const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')


const app = express()
const port = process.env.PORT || 3030

// Handlebars views
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)
app.get('/about', handlers.about)
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

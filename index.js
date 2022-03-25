const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const path = require('path')
const charactersRoutes = require('./routes/Characters')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000


const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.json())
app.use(charactersRoutes)

app.use(express.static(path.join(__dirname, 'public')))

async function start () {
    try {
        await mongoose.connect('mongodb+srv://admin:123@cluster0.yly0w.mongodb.net/vk_game?retryWrites=true&w=majority', {
            useNewUrlParser:true
        })
        app.listen(PORT, () => {
            console.log ('server has been started')
        })
    } catch (e) {
        console.log (e)
    }
}

start()
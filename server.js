const express = require(`express`)
const routes = require(`./routes/AppRouter`)
const db = require(`./db`)
const logger = require(`morgan`)
//const session = require('express-session')

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(logger(`dev`))

app.use(express.static(`client`))
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true
// }));

app.use(`/api`, routes)

app.use(`*`, express.static(`client`))

app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`))
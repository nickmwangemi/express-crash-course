const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const logger = require('./middleware/logger')
const members = require('./Members')

const app = express()

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Initialize middleware
app.use(logger)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Homepage route
app.get('/', (req, res) =>
	res.render('index', {
		title: 'Member App',
		members: members,
	})
)

// Set static file folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/v1/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

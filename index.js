const express = require('express')
const path = require('path')

const logger = require('./middleware/logger')

const app = express()

// Initialize middleware
app.use(logger)

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static file folder
app.use(express.static(path.join(__dirname, 'public')))

// Members API Routes
app.use('/api/v1/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

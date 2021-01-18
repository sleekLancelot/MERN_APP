const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

const port = process.env.PORT || 5000;

//connect mongoDB
connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// app.get('/', (req, res) => res.json({ msg: 'What it do Babyyyy!' }))

if (process.env.NODE_ENV === 'production') {
    // set a static folder
    app.use(express.static('client/build'))

    // load this once the home page is hit
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => console.log(`we live on ${port}`));

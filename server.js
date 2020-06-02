const express = require('express');
const connectDB = require('./config/db');

const app = express();

const port = process.env.PORT || 5000;

//connect mongoDB
connectDB();

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.get('/', (req, res) => res.json({ msg: 'What it do Babyyyy!' }))

app.listen(port, () => console.log(`we live on ${port}`));
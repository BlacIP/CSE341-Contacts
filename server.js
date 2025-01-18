const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
require('dotenv').config();



app.use(express.json());
app.use('/', require('./routes')); 


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

mongodb.initDb((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            console.log('Database connected');
        });
    }
  });
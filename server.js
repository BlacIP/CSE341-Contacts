const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('./database/connect');
//const swaggerUi = require('swagger-ui-express');
//const swaggerFile = require('./swagger-output.json');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;




app.use(cors());
app.use(express.json());
app.use('/', require('./routes')); 
//app.use('/contacts', require('./routes/contacts'));
app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
  });


// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: 'Something went wrong!' });
//   });

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
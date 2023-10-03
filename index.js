//Entry point
const bodyParser = require('body-parser');
const mongodb = require('./database/database.js');
const express = require('express');

const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught Exception: ${err}` + `Origin: ${origin}`);
})
    

const port = process.env.PORT || 3000;


mongodb.initiateDb((error) => {
    if(error) {
        console.log(error.name);
        console.log(error.message);
    } else {
        app.listen(port, console.log(`Server is listening at the port ${port}`));
    }
 
})





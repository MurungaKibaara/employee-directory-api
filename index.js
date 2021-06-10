const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");
const verifyToken = require("./middlewares/auth.middleware");

require('dotenv').config()

const app = express();

const env = process.env.NODE_ENV || 'development';

if(env === 'test'){
    mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
} else {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
}

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// Cross Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Routes
app.use('/api', authRoutes);
app.use('/api', verifyToken, employeesRoutes);

// listen for requests
PORT = process.env.PORT || 4000

app.listen(PORT, function(){
    console.log('Ready to Go!');
});
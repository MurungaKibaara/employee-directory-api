const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require("./routes/auth");
const employeesRoutes = require("./routes/employees");
const verifyToken = require("./middlewares/auth.middleware");

require('dotenv').config()

const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', verifyToken, employeesRoutes);

// listen for requests
PORT = process.env.PORT || 4000

app.listen(PORT, function(){
    console.log('Ready to Go!');
});
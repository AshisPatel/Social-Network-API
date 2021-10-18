const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/social-network-api`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Line below to clear out database if it exists -- comment out if persistence of data is required. 
// mongoose.connection.dropDatabase();

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected to localhost:${PORT}! (^~^)b`))

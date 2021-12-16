const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// "mount" middleware 
// takes incoming POST data and converts it to key/ value pairs
app.use(express.urlencoded({ extended: true}));
// parse incoming JSON data
app.use(express.json());
// utilize public js,css and html files
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => {
    res.send('it works');
});









app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
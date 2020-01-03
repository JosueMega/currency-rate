const express = require('express');

const compute = require('./Banks/compute-rate')
let app = new express();

app.get('/CurrencyApi', async (req, res) => {

    let list = await compute.getRateList();

    res.send(list);
});
let port = process.env.PORT || 8080;
app.set('port', port);
app.listen(3000, function () {
    console.log('Example app listening on port 3001!');
});


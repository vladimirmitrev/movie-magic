const express = require('express');
const path = require('path');

const configExpress = (app) => {
    app.use(express.static(path.resolve('src/public')));

    return app;
};

module.exports = configExpress;
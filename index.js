//^ downloads the files
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const {HomeRouter} = require("./routes/home");
const {configuratorRouter} = require("./routes/configurator");
const {orderRouter} = require("./routes/order");
const {handlebarsHelpers} = require("./utils/handlerbars-helpers");
console.log("Running... for cookies!");

//run server


class CookieMakerApp {
    constructor() {
        this._configureApp();
        this._run();
        this._setRoutes();
    }
    _configureApp() {
        this.app = express();

        this.app.use(express.static('public'));
        this.app.use(cookieParser());
        this.app.use(express.json());

        this.app.engine('.hbs', hbs.engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');

    }

    _setRoutes() {
        this.app.use('/', new HomeRouter(this).router);
        this.app.use('/configurator', configuratorRouter);
        this.app.use('/order', orderRouter);

    }

    _run() {
        this.app.listen(3000, 'localhost', () => {
            console.log('Listeing on http://localhost:3000');
        });
    }

}

new CookieMakerApp();

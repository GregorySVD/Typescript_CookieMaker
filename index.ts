//^ downloads the files
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'express-handlebars';
import {HomeRouter} from "./routes/home";
import {configuratorRouter} from "./routes/configurator";
import {orderRouter} from "./routes/order";
import {handlebarsHelpers} from "./utils/handlerbars-helpers";
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

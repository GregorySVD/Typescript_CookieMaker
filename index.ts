//^ downloads the files
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
//import * as hbs from 'express-handlebars';
//import single module from express;
import {Request, Response, Application, json, static as expressStatic} from "express";
import {HomeRouter} from "./routes/home";
import {ConfiguratorRouter} from "./routes/configurator";
import {OrderRouter} from "./routes/order";
import {handlebarsHelpers} from "./utils/handlerbars-helpers";
import {engine} from "express-handlebars";
import {COOKIE_BASES, COOKIE_ADDONS} from "./data/cookies-data";
import {MyRouter} from "./types/my-router";
import {Entries} from "./types/entries";

console.log("Running... for cookies!");

//run server

export class CookieMakerApp {
    //type of express application
    private app: Application;
    public readonly data = {
        COOKIE_BASES,
        COOKIE_ADDONS,
    };
    private readonly routers = [HomeRouter, ConfiguratorRouter, OrderRouter]; //auto-generated routes
    constructor() {
        this._configureApp();
        this._run();
        this._setRoutes();
    };
    _configureApp(): void {
        this.app = express();

        this.app.use(expressStatic('public'));
        this.app.use(cookieParser());
        this.app.use(json());

        this.app.engine('.hbs', engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');

    };

    _setRoutes(): void {  //automatically set routes
        for (const router of this.routers) {
            const object: MyRouter = new router(this);
            this.app.use(object.urlPrefix, object.router);
        }
       //  this.app.use(HomeRouter.urlPrefix, new HomeRouter(this).router);
       //  this.app.use(ConfiguratorRouter.urlPrefix, new ConfiguratorRouter(this).router);
       // // this.app.use('/order', orderRouter);
    };

    _run(): void {
        this.app.listen(3000, 'localhost', () => {
            console.log('Listening on http://localhost:3000');
        });
    };

    showErrorPage(res: Response, description: string): void {
        res.render('error', {
            description,
        });
    };

    getAddonsFromReq(req: Request): string[] {
        const {cookieAddons} = req.cookies as { //interface without name
            cookieAddons: string, //interface
        };
        return cookieAddons ? JSON.parse(cookieAddons) : [];
    };

    getCookieSettings(req: Request): {
        addons: string[], //interface
        base: string | undefined,
        sum: number,
        allBases: Entries, //Record<string, number> new type only for object where key=string, value= number
        allAddons: Entries,

    } {
        const {cookieBase: base} = req.cookies as {
            cookieBase?: string, //interface without name
        }

        const addons = this.getAddonsFromReq(req);

        const allBases = Object(this.data.COOKIE_BASES);
        const allAddons = Object(this.data.COOKIE_ADDONS);

        const sum = (base ? handlebarsHelpers.findPrice(allBases, base) : 0)
            + addons.reduce((prev, curr) => (
                prev + handlebarsHelpers.findPrice(allAddons, curr)
            ), 0);

        return {
            addons,
            base,
            sum,
            allBases,
            allAddons,
        };
    }
}

new CookieMakerApp();

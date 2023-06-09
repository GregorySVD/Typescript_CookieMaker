import {Request, Response, Router} from "express";
import {CookieMakerApp} from "../index";
import {MyRouter} from "../types/my-router";
import {rest} from "../decorators/rest.decorator";

export class HomeRouter implements MyRouter{
    public readonly urlPrefix = '/';
    public readonly router: Router = Router();

    constructor(
        private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        console.log(Reflect.get(this, '_restApiCall'));
    }

    @rest('get', '/')
    private home = (req: Request, res: Response): void => {
        const {sum, addons, base, allBases, allAddons} = this.cmapp.getCookieSettings(req);

        res.render('home/index', {
            cookie: {
                base,
                addons,
            },
            allBases,
            allAddons,
            sum,
        });
    };
}

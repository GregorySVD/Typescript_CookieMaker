import {Router} from "express";
import{CookieMakerApp} from "../index";
//very important for (req, res) to work
import {Request, Response} from "express";
import {MyRouter} from "../types/my-router";

export class ConfiguratorRouter implements MyRouter {
    public readonly urlPrefix = '/configurator';
    public readonly router: Router = Router();

    constructor(
        private cmapp: CookieMakerApp) {
        this.setUpRoutes();
    }

    private setUpRoutes(): void {
        this.router.get('/base-selected/:baseName', this.selectBase);
        this.router.get('/add-addon/:addonName', this.addAddon);
        this.router.get('/delete-addon/:addonName', this.deleteAddon);
    }

    private selectBase = (req: Request, res: Response): void => {
        console.log('selectBase')
        const {baseName} = req.params;
        console.log(baseName)
        if (!(this.cmapp.data.COOKIE_BASES as Record<string,number>)[baseName]) {
            return this.cmapp.showErrorPage(res, `There is no such base as ${baseName}.`);
        }
        res
            .cookie('cookieBase', baseName)
            .render('configurator/added', {
                baseName: baseName,
            });
    };

    private addAddon = (req: Request, res: Response): void => {
        const {addonName} = req.params;

        if (!(this.cmapp.data.COOKIE_ADDONS as Record<string, number>)[addonName]) {
            return this.cmapp.showErrorPage(res, `There is no such addon as ${addonName}.`);
        }

        const addons = this.cmapp.getAddonsFromReq(req);

        if (addons.includes(addonName)) {
            return this.cmapp.showErrorPage(res, `${addonName} is already on your cookie. You cannot add it twice.`);
        }

        addons.push(addonName);
        console.log(addonName);
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });
    };

    private deleteAddon = (req: Request, res: Response): void => {
        const {addonName} = req.params;

        const oldAddons = this.cmapp.getAddonsFromReq(req);

        if (!oldAddons.includes(addonName)) {
            return this.cmapp.showErrorPage(res, `Cannot delete something that isn't already added to the cookie. ${addonName} not found on cookie.`);
        }

        const addons = oldAddons.filter(addon => addon !== addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    };
}

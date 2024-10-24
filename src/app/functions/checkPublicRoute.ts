
/**
 * @param asPath string
 * @returns boolean
 */

import { APP_ROUTES } from "../routes/routes";

export const checkPublicRoute = (asPath: string) => {
    const appPublicRoutes = Object.values(APP_ROUTES.public);

    return appPublicRoutes.includes(asPath);
}
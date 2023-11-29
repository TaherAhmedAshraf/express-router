/**
 * Recursive function that dynamically registers routes from files in a folder.
 * @param {string} prefix - The URL prefix for the routes.
 * @param {object} app - The express app object.
 * @param {string} folder - The folder containing the route files.
 * @param {Array} middlewares - An array of middlewares to apply to the routes.
 */
declare function dynamicRouter({ prefix, app, folder, middlewares, }: {
    prefix: string;
    app: {
        use: Function;
    };
    folder: string;
    middlewares: any[];
}): void;
export default dynamicRouter;

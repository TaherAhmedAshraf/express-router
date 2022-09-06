declare function dynamicRouter({ prefix, app, folder, middlewares, disableWarnings }: {
    prefix: string;
    app: {
        use: Function;
    };
    folder: string;
    middlewares: any;
    disableWarnings: boolean;
}): void;
export default dynamicRouter;

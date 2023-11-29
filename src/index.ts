import * as fs from "fs";
import * as path from "path";

const validExtensions = [".js", ".ts"];

/**
 * Recursive function that dynamically registers routes from files in a folder.
 * @param {string} prefix - The URL prefix for the routes.
 * @param {object} app - The express app object.
 * @param {string} folder - The folder containing the route files.
 * @param {Array} middlewares - An array of middlewares to apply to the routes.
 */
function dynamicRouter({
  prefix = "/",
  app,
  folder,
  middlewares = [] as any[],
}: {
  prefix: string;
  app: { use: Function };
  folder: string;
  middlewares: any[];
}) {
  fs.readdirSync(path.join(folder)).forEach((file) => {
    const filePath = path.join(folder, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively call the function for subdirectories
      dynamicRouter({
        prefix: `${prefix}${file}/`,
        app,
        folder: filePath,
        middlewares,
      });
    } else {
      if (!validExtensions.includes(path.extname(file))) {
        return;
      }

      const route = require(filePath);
      if (route?.path) {
        const routerPath = `${prefix}${route.path().replace("/", "")}`;
        app.use(routerPath, ...middlewares, route);
      } else {
        console.warn(`Warning: ${file} is not a valid express router`);
        console.warn(
          `Tips: if you want to ignore this warning, disableWarnings option in the config`
        );
      }
    }
  });
}

export default dynamicRouter;

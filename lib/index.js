"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var validExtensions = [".js", ".ts"];
/**
 * Recursive function that dynamically registers routes from files in a folder.
 * @param {string} prefix - The URL prefix for the routes.
 * @param {object} app - The express app object.
 * @param {string} folder - The folder containing the route files.
 * @param {Array} middlewares - An array of middlewares to apply to the routes.
 */
function dynamicRouter(_a) {
    var _b = _a.prefix, prefix = _b === void 0 ? "/" : _b, app = _a.app, folder = _a.folder, _c = _a.middlewares, middlewares = _c === void 0 ? [] : _c;
    fs.readdirSync(path.join(folder)).forEach(function (file) {
        var filePath = path.join(folder, file);
        var stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            // Recursively call the function for subdirectories
            dynamicRouter({
                prefix: "".concat(prefix).concat(file, "/"),
                app: app,
                folder: filePath,
                middlewares: middlewares,
            });
        }
        else {
            if (!validExtensions.includes(path.extname(file))) {
                return;
            }
            var route = require(filePath);
            if (route === null || route === void 0 ? void 0 : route.path) {
                var routerPath = "".concat(prefix).concat(route.path().replace("/", ""));
                app.use.apply(app, __spreadArray(__spreadArray([routerPath], middlewares, false), [route], false));
            }
            else {
                console.warn("Warning: ".concat(file, " is not a valid express router"));
                console.warn("Tips: if you want to ignore this warning, disableWarnings option in the config");
            }
        }
    });
}
exports.default = dynamicRouter;

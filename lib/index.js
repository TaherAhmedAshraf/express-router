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
var supportedExtensions = ['.js', '.ts'];
function dynamicRouter(_a) {
    var _b = _a.prefix, prefix = _b === void 0 ? '/' : _b, app = _a.app, folder = _a.folder, _c = _a.middlewares, middlewares = _c === void 0 ? [] : _c, _d = _a.disableWarnings, disableWarnings = _d === void 0 ? false : _d;
    fs.readdirSync(path.join(folder)).forEach(function (file) {
        // check if it is a directory
        if (fs.lstatSync(path.join(folder, file)).isDirectory()) {
            // if it is a directory, call the function again
            dynamicRouter({
                prefix: "".concat(prefix).concat(file, "/"),
                app: app,
                folder: path.join(folder, file),
                middlewares: middlewares,
                disableWarnings: disableWarnings
            });
        }
        else {
            if (!supportedExtensions.includes(path.extname(file)))
                return;
            var route = require(path.join(folder, file));
            if (route === null || route === void 0 ? void 0 : route.path) {
                var router_path = (route === null || route === void 0 ? void 0 : route.path()) ? "".concat(prefix).concat(route.path().replace('/', '')) : "".concat(prefix).concat(file.split('.')[0]);
                app.use.apply(app, __spreadArray(__spreadArray([router_path], middlewares, false), [route], false));
            }
            else {
                if (disableWarnings)
                    return;
                console.warn("Warning: ".concat(file, " is not a valid express router"));
                console.warn("Tips: if you want to ignore this warning, disableWarnings option in the config");
            }
        }
    });
}
;
exports.default = dynamicRouter;

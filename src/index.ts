import * as fs from 'fs';
import * as path from 'path';
const supportedExtensions = ['.js', '.ts'];

function dynamicRouter({prefix='/',app,folder,middlewares=[],disableWarnings=false}:{prefix:string,app:{use:Function},folder:string,middlewares:any,disableWarnings:boolean}){
        fs.readdirSync(path.join(folder)).forEach(file => {
      // check if it is a directory
      if(fs.lstatSync(path.join(folder, file)).isDirectory()) {
        // if it is a directory, call the function again
        dynamicRouter({
          prefix: `${prefix}${file}/`,
          app: app,
          folder: path.join(folder, file),
          middlewares: middlewares,
          disableWarnings: disableWarnings
        })
      }else{
        if(!supportedExtensions.includes(path.extname(file))) return
        const route = require(path.join(folder, file));
        if(route?.path) {
          const router_path = route?.path() ?  `${prefix}${route.path().replace('/','')}` : `${prefix}${file.split('.')[0]}`
          app.use(router_path, ...middlewares, route);
        }else{
          if(disableWarnings) return
            console.warn(`Warning: ${file} is not a valid express router`);
            console.warn(`Tips: if you want to ignore this warning, disableWarnings option in the config`);
        }
      }
})};

module.exports = dynamicRouter
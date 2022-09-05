const fs = require('fs');
const path = require('path');
const supportedExtensions = ['js', 'ts'];


function dynamicRouter(app, folder, ...middlewares) {
  fs.readdirSync(path.join(folder)).forEach(file => {
    if(!supportedExtensions.includes(path.extname(file))) return

    const route = require(path.join(folder, file));
})};

// dynamicRouter('', "/home/proashraf/Workstation/personal/npm-pkg/express-router/test/router")


module.exports = dynamicRouter;
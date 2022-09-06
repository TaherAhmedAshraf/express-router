
# Express Dynamic Routing

  

Make your express app dynamic with just a few lines of code!

**express-dynamic-routing automatically** reads all of the files and dynamically routes them.

  

Pass your route folder and it will automatically route all of the express routes that the folder has, if your file name is **test.js** it will be accessible at **/test**.

For example, inside the route folder, I have two route files-

1.  hello-world.js
2.  hello-express.js

So the ``hello-word.js`` file will be accessible at ``/hello-world`` & ``hello-express.js`` will be accessible at ``/hello-express``. 

URL = Prefix + filename.

If I set the prefix to ``/my-api/`` then it will be acessable at ``/my-api/hello-word`` & ``/my-api/hello-express``.

Let's create a folder "**auth**" inside the route directory and create a route ``login.js``, in that case route will be accessible at ``/auth/login``.

Here, "**auth**" is the name of the folder & "**login**" is the name of the route file. That means folders inside the route directory will also be read by it.  

**express-dynamic-routing** only reads **.js** & **.ts** express routes. For other files, it throws a warning. To avoid warnings, you can set ``disableWarning: true``.


```js
// /index.js
const express = require('express');
const app = express();
const erouter = require('express-dynamic-routing');
const path = require('path');
const dir_path = path.join(__dirname, 'router');

erouter({
	prefix:'/',
	app:app,
	folder:dir_path,
	middlewares:[],
	disableWarnings:false
})

app.listen(8000, () => console.log('Server started on port 8000'));
```

If you don't want to use the filename as route path, you can specify a path in your directory like this

```js
// /route/test.js
const  express  =  require('express');
const  router  =  express();

router.path = () => '/hello-world'; // specifying path

router.get('/', (req, res) => {
	res.send('Route 2!');
})

module.exports  = router;
```

After specifying the path, **express-dynamic-routing** will now use the path you specified, instead of using the filename.

I have a route `test.js` in my route folder and the prefix is '/'.
If I dont't specify the custom path my route URL will be `/test`. But if I specify the path, my route URL will be '/hello-world. This is how you can specify your own custom path.



| Property | Description |
| ----------- | ----------- |
| prefix | By default it is '/' but if you want you can change it to '/api/' or any thing you want |
| folder | It is a required field, here pass your route folder location |
| middlewares | you can pass any middlewares you want. By default is is [] but you can add middlewares like this [middleware1, middleware2]
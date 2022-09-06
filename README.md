
# Express Dynamic Router

  

Dynamic your express app with just few lines of codes!

express-dynamic-router automatically read all of the files and use dynamiclly routes them. If you pass your the folder called 'route' in your code it will automatically route all of the express route files in that folder and the route name/path will be the (prefix + name of the file). 

For example, inside route folder we have 2 route file-
1) hello-world.js
2) hello-express.js

so the route will be visible at '/hello-world'. if you pass prefix '/api/' than the route will be visible at '/api/hello-world'.

same for the hello-express.js

if the file is not a **.js/.ts** file or not a express route it will automatically ignore that file & show an warning. You can disable warning by passing `disableWarning:true`.

Again if you have a folder/directory inside you route folder than it will also route the files inside that folder directory. In that case route url will be like this-
prefix + directory_name + file_name

suppose we have a directory called "hello" inside our route folder, And iniside hello we have a route file name "status". So the route url will be - 
`/hello/status`

lets change the prefix to '/api/v1/' so the url will be - 
`/api/v1/hello/status`

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

If you want you can also pass a custom path name instead of using file name. In that case you can specify a path in your route file like this.

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

Here we have passed a path that will be uses instead of the file name.
I got a route file test.js in my route folder and the prefix is '/'.

If a havean't specified that path my route url would be `/test`. But after specifying the path now my route url is '/hello-world'. This is how you can specify your own custom path.


| Property | Description |
| ----------- | ----------- |
| prefix | By default it is '/' but if you want you can change it to '/api/' or any thing you want |
| folder | It is a required field, here pass your route folder location |
| middlewares | you can pass any middlewares you want. By default is is [] but you can add middlewares like this [middleware1, middleware2]
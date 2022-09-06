
# Express Dynamic Router

  

Dynamic your express app with just few lines of codes!


express-dynamic-router automatically read all of the files and dynamically routes them. Pass your route folder and it will automatically route all of the express routes in the folder, route path will be the (prefix + name of the file).

For example, inside route folder we have two route files-

1.  hello-world.js
2.  hello-express.js

So the path will be `/hello-world`. If you pass a custom prefix `/api/` than the route path will be `/api/hello-world`.

Same for the `hello-express.js`. The path will be `/api/hello-express`.

If the file is not a **.js/.ts** file or not a express route, it will automatically ignore that file & show an warning. You can disable that warning by passing `disableWarning:true.`

Again, if you have a folder inside your route folder, It will also route the files inside that folder directory. In that case path will be like this- `prefix + directory_name + file_name`

Suppose we have a directory "hello" inside our route folder, And inside hello we have a route file `status.js`. So the path will be - `/hello/status`.

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

You can also pass a custom path name instead of using file name. In that case a path in your route file like this-

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

Here we have specified a path, instead of using file_name it will  use the path_name we specified.

I have a route `test.js` in my route folder and the prefix is '/'.
If I havean't specified cusotom path, my route url would be `/test`. But after specifying the path my route url is '/hello-world'. This is how you can specify your own custom path.


| Property | Description |
| ----------- | ----------- |
| prefix | By default it is '/' but if you want you can change it to '/api/' or any thing you want |
| folder | It is a required field, here pass your route folder location |
| middlewares | you can pass any middlewares you want. By default is is [] but you can add middlewares like this [middleware1, middleware2]
# Express Dynamic Router

Dynamic your express app with just few lines of codes!

```
const  express  =  require('express');
const  app  =  express();
const  erouter  =  require('express-dynamic-routing');
const  path  =  require('path');
const  dir_path  =  path.join(__dirname, 'router');

erouter({
	prefix:'/',
	app:app,
	folder:dir_path,
	middlewares:[],
	disableWarnings:false
})

app.listen(8000, () =>  console.log('Server started on port 8000'));

```


| Property      | Description |
| ----------- | ----------- |
| prefix      | By default it is '/' but if you want you can change it to '/api/' or any thing you want       |
| folder      | It is a required field, here pass your route folder location        |
| middlewares | you can pass any middlewares you want. By default is is [] but you can add middlewares like this [middleware1, middleware2]   
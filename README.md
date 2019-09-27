# Laravel6 w/ Vue-CLI3 w/o Laravel-Mix

## Preparation

```shell
$ mkdir <project>
$ cd <project>
$ git init # only when necessary

$ laravel new laravel6
$ vue create --no-git vue-cli3

> Manually select features
  > Babel
  > Progressive Web App (PWA) Support
  > Router
    > Use history mode for router? Y
  > Vuex
  > CSS Pre-processors
    > Sass/SCSS (with dart-sass)
  > Linter / Formatter
    > ESLint with error prevention only
    > Lint on save
  > Unit Testing
    > Mocha + Chai
  
$ cd vue-cli3
$ yarn add --dev axios # only when necessary
$ mkdir templates
$ mv public/index.html templates
$ mv ../laravel6/public/{.,}* public
```

### vue-cli3/templates/index.html

```html
<!-- replace -->
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<!-- add -->
<meta name="csrf-token" content="{{ csrf_token() }}">
```

### vue-cli3/vue.config.js

```js
module.exports = {
  outputDir: '../laravel6/public',

  pages: {
    app: {
      entry: 'src/main.js',

      template: 'templates/index.html',

      // relative to outputDir
      filename: '../resources/views/app.blade.php',
    },
  },

  publicPath: '/',
};
```

### vue-cli3/package.json

```diff
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
-   "test:unit": "vue-cli-service test:unit"
+   "test:unit": "vue-cli-service test:unit",
+   "watch": "vue-cli-service build --watch --mode development",
+   "prod": "vue-cli-service build"
  },
```

### vue-cli3/src/bootstrap.js

`only when necessary`

```shell
$ cp ../laravel6/resources/js/bootstrap.js src
```

```diff
- window._ = require('lodash');
+ // window._ = require('lodash');
```

### vue-cli3/src/main.js

`only when necessary`

```diff
+ import './bootstrap.js';
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'
  import store from './store'
```

### laravel6/routes/web.php

```diff
- Route::get('/', function () {
-     return view('welcome');
- });
+ Route::view('/{any?}', 'app')->where('any', '^(?!api).*$');
```

## Development

Since all files in `vue-cli3/public` will be exported to `laravel6/public` automatically, you can put any static files (e.g. `foo.html`) in `vue-cli3/public`.

```shell
$ cd <path_to>/vue-cli3
$ yarn watch

Another terminal window
$ cd <path_to>/laravel6
$ php artisan serve
```

## Production

```shell
$ cd <path_to>/vue-cli3
$ yarn prod
```

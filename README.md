# Webpack starter kit for NG2

## Features
| Feature                   | Status               | Test |
|---------------------------|----------------------|------|
| Lazy Loading              | done                 | ✔️    |
| AoT                       | done (must test)     | ✔️    |
| Tree Shaking              | done (must test)     |       |
| Webpack 2                 | done                 | ✔️    |
| @Types                    | done                 | ✔️    |
| Uglify                    | done                 | ✔️    |
| TSlint                    | done (missing rules) | ✔️    |
| SASS                      | done                 | ✔️    |
| Create style structure    | done                 | ✔️    |
| Autoprefix                | done                 | ✔️ ️   |
| Mockdata                  | done                 | ✔️ ️ ️ ️ |
| Router                    | done                 | ✔️ ️ ️ ️ |
| webpack-md5-hash          | done                 | ✔️ ️ ️ ️ |
| Ngrx / MobX               | done                 | ✔️ ️ ️ ️ |
| Migrate WP to ES6         | done                 | ✔️ ️ ️ ️ |
| Bootstrap 3/4             | in progress          |      |
| Ng-UI 2                   | in progress          |      |
| Config Const              | done                 | ✔️ ️ ️ ️ |


## Get Started
* nvm install 6.9.1
* npm install

## NPM commands
* `build:prod` - create build for production
* `build:stage` - create build with stage endpoints
* `build:dev` - create build for dev endpoints
* `clean:dist` - remove dist folder
* `mockdata` - remove existent files and create new mockdata files using schema
* `server:dev` - start dev server
* `server:prod` - start server pointing to dist/
* `start` - run server:dev
* `tslint` - run typescript lint
* `rimraf` - remove folder 

TODO: implement json loader

# Webpack starter kit for NG2

## Features
| Feature                   | Status               | Test |
|---------------------------|----------------------|------|
| Lazy Loading              | in progress          |      |
| AoT                       | fail                 | ❌    |
| Tree Shaking              | done                 | ✔️    |
| Webpack 2                 | done                 | ✔️    |
| @Types                    | done                 | ✔️    |
| Uglify                    | done                 | ✔️    |
| TSlint                    | done (missing rules) | ✔️    |
| SASS                      | done                 | ✔️    |
| Create style structure    | done                 | ✔️    |
| Autoprefix                | done                 | ✔️ ️   |
| Mockdata                  | done                 | ✔️ ️ ️ ️ |
| Bootstrap 3/4             | in progress          |      |
| Ng-UI 2                   | in progress          |      |
| Router                    | in progress          |      |
| Ngrx / MobX               | in progress          |      |


AOT: @ngtools does not support RC.3 yet - As workaround run a local build from @ngtools project and copy and paste in the node module folder

## Get Started
* nvm install 6.9.1
* npm install

## NPM commands
* `build:prod` - create build for production
* `clean:dist` - remove dist folder
* `mockdata` - remove existent files and create new mockdata files using schema
* `server:dev` - start dev server
* `server:prod` - start server pointing to dist/
* `start` - run server:dev
* `tslint` - run typescript litn
* `rimraf` - remove folder 

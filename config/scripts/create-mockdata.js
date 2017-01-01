const fs          = require('fs');
const jsf         = require('json-schema-faker');
const chalk       = require('chalk');
const schema      = require('../schema-data/home.data');

const json = JSON.stringify(jsf(schema));
const path = './src/app/global/api/db.data.json';

/**
 * TODO: create script to get more and create more than one .json file
 */

fs.writeFile(path, json, function(err) {

  if (err) {
    return console.log(chalk.red(err));
  }

  console.log(chalk.green('Mock data generated'));

});

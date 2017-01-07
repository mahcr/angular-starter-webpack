const async       = require('async');
const helpers     = require('../scripts/helpers');
const chalk       = require('chalk');
const fs          = require('fs');
const jsf         = require('json-schema-faker');

/**
 * TODO: improve code, rename file to use data instead of .schema.
 */
const folder = helpers.root('', '/schema-data/');

// get filenames
fs.readdir(folder, (err, filenames) => {

  const path = helpers.root('../', 'src/app/global/api/');
  // write files
  async.each(filenames, (file) => {
    // get schema
    let schema = require(folder + file);
    // get mockdata
    let json   = JSON.stringify(jsf(schema));
    // create file with the same of the schema
    fs.writeFile(path + file, json, (err) => {

      if (err) {
        return console.log(chalk.red(err));
      }

      console.log(chalk.green('Mock data generated'));

    });

  });

});





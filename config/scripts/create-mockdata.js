'use strict';

import async   from 'async';
import { root } from '../scripts/helpers';
import chalk   from 'chalk';
import fs      from 'fs';
import jsf     from 'json-schema-faker';

const folder = root('', '/schema-data/');

// get filenames
fs.readdir(folder, (err, listFiles) => {

  const path = root('../', 'src/app/global/api/');
  // write files
  async.each(listFiles, (file) => {
    // get schema
    const schema = require(folder + file);
    // get mockdata
    const json = JSON.stringify(jsf(schema));
    // rename file and set path
    const fileName = `${ path + file.match(/[^.]*/i)[0] }.data.json` ;
    // create file with the same of the schema
    fs.writeFile(fileName, json, (err) => {

      if (err) {
        return console.log(chalk.red(err));
      }

      console.log(chalk.green(`Mock data generated - file: ${fileName}`));

    });

  });

});





'use strict';

const argv = require('yargs').argv;
const fs = require('fs');
const helpers = require('../scripts/helpers');
const env = argv.env || 'dev';
// path where config files are
const src = 'env/';
const dest = '../src/app/global/';

// copy config file
fs.createReadStream(helpers.root(`${ src + env }.config.ts`)).pipe(fs.createWriteStream(helpers.root(`${ dest }config.ts`)));

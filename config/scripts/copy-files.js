'use strict';

import { argv } from 'yargs';
import fs from 'fs';
import helpers from'../scripts/helpers';

// path where config files are
const src = 'env/';
const dest = '../src/app/global/';
const env = argv.env || 'dev';

// copy config file
fs.createReadStream(helpers.root(`${ src + env }.config.ts`)).pipe(fs.createWriteStream(helpers.root(`${ dest }config.ts`)));

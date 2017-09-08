'use strict';

import { argv } from 'yargs';
import fs from 'fs';
import { root } from'../scripts/helpers';

// path where config files are
const src = 'env/';
const dest = '../src/app/global/';
const env = argv.env || 'dev';

// copy config file
fs.createReadStream(root(`${ src + env }.config.ts`)).pipe(fs.createWriteStream(root(`${ dest }config.ts`)));

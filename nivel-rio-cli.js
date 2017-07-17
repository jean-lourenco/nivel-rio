#!/usr/bin/env node
'use strict';

let meow = require('meow');
let nivelRioLib = require('./nivel-rio-lib');

const cli = meow(`
    Usage
        $ nivel-rio    
`);

nivelRioLib
    .getLastestRiverLevel()
    .then((x) => console.log(`${x.date} - ${x.level} meters`));

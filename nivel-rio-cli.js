#!/usr/bin/env node
'use strict';

const meow = require('meow');
const nivelRioLib = require('./nivel-rio-lib');
const chalk = require('chalk');

const cli = meow(`
    Usage
        $ nivel-rio    
`);

nivelRioLib
    .getAllRiverLevelInfo()
    .then((x) => console.log(`
        ${x[0].date.format("YYYY-MM-DD HH:mm")} - ${x[0].level} meters (${getLevelDifference(x[3].level, x[0].level)})
    `));


function getLevelDifference(originalLevel, actualLevel) {
    var difference = (actualLevel - originalLevel).toFixed(2);

    return difference > 0 ? chalk.red(`+${difference}`) : chalk.green(difference);
}

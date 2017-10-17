#!/usr/bin/env node
'use strict';

const meow = require('meow');
const chalk = require('chalk');
const nivelRio = require('nivel-rio-lib');

const cli = meow(`
    Utilização
        $ nivel-rio

    Opções
        --recente, -r    lista as 10 medições mais recentes por hora

    Exemplos
        $ nivel-rio

            2017-08-08 18:00 - 1.29 metros (-0.08)

        $ nivel-rio -r

            2017-08-08 19:00 - 1.07 metros (-0.22)
            2017-08-08 18:00 - 1.29 metros (-0.08)
            ...
            2017-08-08 11:00 - 0.43 metros (-0.06)
            2017-08-08 10:00 - 0.49 metros (-0.11)

`, {
    alias: {
        r: 'recente'
    }
});

const flags = cli.flags;

if (flags['recente']) {
    nivelRio
        .getAllRiverLevelInfo()
        .then((x) => showMeasurementPerHour(x, 10));
} else {
    nivelRio
        .getAllRiverLevelInfo()
        .then((x) => showMeasurementPerHour(x, 1));
}

function getLevelDifference(originalLevel, actualLevel) {
    var difference = (actualLevel - originalLevel).toFixed(2);

    return difference > 0 ? chalk.red(`+${difference}`) : chalk.green(difference);
}

function showMeasurementPerHour(measurements, quantity) {
    let riverIndex = 0;
    console.log('');

    while (0 < quantity--) {
        console.log(`${measurements[riverIndex].date.format("YYYY-MM-DD HH:mm")} - ${measurements[riverIndex].level} metros (${getLevelDifference(measurements[riverIndex + 4].level, measurements[riverIndex].level)})`);

        riverIndex += 4;
    }

    console.log('');
}

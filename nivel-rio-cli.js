#!/usr/bin/env node
'use strict';

const meow = require('meow');
const nivelRio = require('nivel-rio-lib');
const main = require('./main.js');
const spin = require('./spin.js');

const cli = meow(`
    Utilização
        $ nivel-rio

    Opções
        --recente, -r    lista as 10 medições mais recentes por hora
        --cidade, c      cidade do nível do rio

    Exemplos
        $ nivel-rio

            2017-08-08 18:00 - 1.29 metros (-0.08)

        $ nivel-rio -r

            2017-08-08 19:00 - 1.07 metros (-0.22)
            2017-08-08 18:00 - 1.29 metros (-0.08)
            ...
            2017-08-08 11:00 - 0.43 metros (-0.06)
            2017-08-08 10:00 - 0.49 metros (-0.11)

    Cidades Disponíveis
        blumenau (padrão)
        apiuna
        beneditonovo
        brusque
        ibirama
        ituporanga
        riodooeste
        riodoscedros
        taio
        timbo
        vidalramos
`, {
    alias: {
        r: 'recente',
        c: 'cidade'
    }
});

const flags = cli.flags;
const spinner = spin.startNewSpinner();
const cidade = flags['cidade'] || undefined;

if (flags['recente']) {
    nivelRio
        .getAllRiverLevelInfo(cidade)
        .then((x) => {
            spinner.stop(true);
            main.showMeasurementPerHour(x, 10);
        });
} else {
    nivelRio
        .getAllRiverLevelInfo(cidade)
        .then((x) => {
            spinner.stop(true);
            main.showMeasurementPerHour(x, 1);
        });
}

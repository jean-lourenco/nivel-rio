'use strict';

let http = require('http');
let moment = require('moment');

const ceopsBlumenau = 'http://ceops.furb.br/restrito/SisCeops/controllers/controller_pg.php?action=tabela_dados&&cd_estacao=7331';

function RiverLevel(ceopsDto) {
    this.station = ceopsDto.cd_estacao;
    this.city = ceopsDto.ds_cidade;
    this.date = moment(ceopsDto.data, 'DD/MM/YYYY HH:mm');
    this.level = ceopsDto.vlr_nivel;
    this.precipitation = ceopsDto.precipitacao;
}

function* transformCEOPSDto(dto) {
    for (var i = 0; i < dto.length; i++) {
        yield new RiverLevel(dto[i]);
    }
}

function getAllRiverLevelInfo() {
    return new Promise((resolve, reject) => {
        http
            .get(ceopsBlumenau, (response) => {
                let rawData = '';

                response.on('data', (chunk) => {
                    rawData += chunk;
                })

                response.on('end', () => {
                    const rawDto = JSON.parse(rawData);
                    const transfomedDto = Array.from(transformCEOPSDto(rawDto)); 

                    resolve(transfomedDto);
                });
            })
            .on('error', function(e) {
                reject('Request error: CEOPS endpoint probably offline.')
            });
    });
}

exports.getAllRiverLevelInfo = getAllRiverLevelInfo;

const chalk = require('chalk');

function getLevelDifference(originalLevel, actualLevel) {
    var difference = (actualLevel - originalLevel).toFixed(2);

    return difference > 0 ? chalk.red(`+${difference}`) : chalk.green(difference);
}

function showMeasurementPerHour(measurements, quantity) {
    let riverIndex = 0;
    console.log('');

    while (0 < quantity--) {
        const dateHour = measurements[riverIndex].date.format("YYYY-MM-DD HH:mm");
        const actualLevel = measurements[riverIndex].level;
        const diff = getLevelDifference(measurements[riverIndex + 4].level, actualLevel);

        console.log(`${dateHour} - ${actualLevel} metros (${diff})`);

        riverIndex += 4;
    }

    console.log('');
}

exports.showMeasurementPerHour = showMeasurementPerHour;

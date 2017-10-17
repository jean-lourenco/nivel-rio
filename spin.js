const Spinner = require('cli-spinner').Spinner;

function startNewSpinner() {
    const spinner = new Spinner("Carregando...");

    spinner.setSpinnerString(0);
    spinner.start();

    return spinner;
}

exports.startNewSpinner = startNewSpinner;

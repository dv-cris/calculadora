(function (win, doc) {
    'use strict';
    const teclasVal = doc.querySelectorAll('[data-valor]');
    const teclasOp = doc.querySelectorAll('[data-operacao]');
    const teclaRes = doc.querySelector('#t61');
    const teclaPorc = doc.querySelector('#t37');
    const displayCalc = doc.querySelector('#display-calc');
    const displayForm = doc.querySelector('#display-form');
    const displayRes = doc.querySelector('#display-res');
    const tCE = doc.querySelector('#tce');
    const tC = doc.querySelector('#tc');
    const tBS = doc.querySelector('#t8');
    const teclaMemo = doc.querySelector('#tmemo');
    const teclaMemoPlus = doc.querySelector('#tmemoplus');
    const teclaMemoSub = doc.querySelector('#tmemosub');
    const teclaCopiar = doc.querySelector('#tcopy')
    let memoria = [];
    let nMemoria = null;
    let operador = true;
    let operadorAtual = null;
    let decimal = false;
    let resultado = false;
    teclasVal.forEach(function (tecla) {
        tecla.addEventListener('click', function (event) {
            const valor = tecla.getAttribute('data-valor');
            if (resultado) tCE.click();
            if (valor == '.') {
                if (!decimal) {
                    decimal = true;
                    if (displayCalc.innerHTML.length == 0) displayCalc.innerHTML = 0;
                    displayCalc.innerHTML += valor;
                }
            } else {
                displayCalc.innerHTML += valor;
            }
            operador = false;
        });
    });

    teclasOp.forEach(function (tecla) {
        tecla.addEventListener('click', function (event) {
            const operacao = tecla.getAttribute('data-operacao');
            if (resultado) tCE.click();
            if (!operador) {
                displayForm.innerHTML += `${displayCalc.innerHTML}${operacao}`;
                if (operadorAtual) { displayRes.innerHTML = calcular(operadorAtual); } else { displayRes.innerHTML = displayCalc.innerHTML }
                operadorAtual = operacao
                displayCalc.innerHTML = '';
                operador = true;
                decimal = false;
            } else if (displayForm.innerHTML.length > 0 && operador) {
                if (operadorAtual == '^^') displayForm.innerHTML = `${displayForm.innerHTML.slice(0, -2)}${operacao}`;
                else displayForm.innerHTML = `${displayForm.innerHTML.slice(0, -1)}${operacao}`;
                operadorAtual = operacao
            }
        });
    });
    teclaPorc.addEventListener('click', function (event) {
        switch (operadorAtual) {
            case '-':
            case '+':
                displayCalc.innerHTML = parseFloat(displayRes.innerHTML) * (parseFloat(displayCalc.innerHTML || 0) / 100);
                break;
            case '/':
            case '*':
            case '^':
            case '^^':
                displayCalc.innerHTML = parseFloat(displayCalc.innerHTML || 0) / 100;
                break;
            default:
                displayCalc.innerHTML = 0
                break;
        }
    });

    //Teclas de funções
    tCE.addEventListener('click', function (event) {
        displayCalc.innerHTML = '';
        displayForm.innerHTML = '';
        displayRes.innerHTML = '';
        operador = true;
        decimal = false
        operadorAtual = null;
        resultado = false;
    });
    tC.addEventListener('click', function (event) {
        displayCalc.innerHTML = '';
        operador = true;
        decimal = false;
    });

    tBS.addEventListener('click', function (event) {
        displayCalc.innerHTML = displayCalc.innerHTML.slice(0, -1);
        if (displayCalc.innerHTML == '') { operador = true; }
        if (displayCalc.innerHTML.includes('.')) decimal = true;
    });
    teclaRes.addEventListener('click', function (event) {
        if (operadorAtual) {
            if ((operadorAtual == '^^' || operadorAtual == '^') && parseFloat(displayCalc.innerHTML) == 0) displayRes.innerHTML = calcular('+')
            else {
                displayRes.innerHTML = calcular(operadorAtual);
                if (operadorAtual != '^^') displayForm.innerHTML += `${displayCalc.innerHTML}`;
                displayCalc.innerHTML = '';
                operadorAtual = null;
            }
        }
        if (operadorAtual == '^^') displayForm.innerHTML = `${displayForm.innerHTML.slice(0, -2)}`;
        else if (operadorAtual) displayForm.innerHTML = `${displayForm.innerHTML.slice(0, -1)}`;

        operador = true;
        decimal = false;
        resultado = true;
        operadorAtual = null;
    });

    teclaMemoPlus.addEventListener('click', function (event) {
        if (displayRes.innerHTML.length > 0) {
            memoria.push(parseFloat(displayRes.innerHTML));
            nMemoria = 0;
        }
        if (memoria.length == 0) nMemoria = null;
        displayCalc.innerHTML = '';
        displayForm.innerHTML = '';
        displayRes.innerHTML = '';
        operador = false;
        decimal = false
        operadorAtual = null;
        resultado = false;

    });


    teclaMemoSub.addEventListener('click', function (event) {
        if (nMemoria == 0) memoria.splice(nMemoria, 1); else memoria.splice(nMemoria - 1, 1);
        if (memoria.length - 1 > memoria) nMemoria--;
        if (memoria.length == 0) nMemoria = null;
    });
    teclaMemo.addEventListener('click', function (event) {
        if (nMemoria != null) {
            displayCalc.innerHTML = memoria[nMemoria];
            if (memoria.length - 1 > nMemoria) nMemoria++;
            else nMemoria = 0;
            operador = false;
        }
    });

    teclaCopiar.addEventListener('click', function (event) {
        navigator.clipboard.writeText(displayRes.innerHTML);
    });


    function calcular(operacao) {
        const valorPrimario = parseFloat(displayRes.innerHTML || 0);
        const valorSegundario = parseFloat(displayCalc.innerHTML || 0);
        switch (operacao) {
            case '+':
                return valorPrimario + valorSegundario;
            case '-':
                return valorPrimario - valorSegundario;
            case '/':
                return valorPrimario / valorSegundario;
            case '*':
                return valorPrimario * valorSegundario;
            case '^':
                return valorPrimario ** valorSegundario;
            case '^^':
                displayForm.innerHTML = `${displayForm.innerHTML.slice(0, -1)}(1 / ${valorSegundario})`;
                return (valorPrimario ** (1 / valorSegundario)).toFixed(3);
            default:
                return 'Error'
        }
    }
}(window, document))
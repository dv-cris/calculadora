(function (win, doc) {
    'use strict'
    const teclasval = doc.querySelectorAll('[data-valor]');
    const teclasop = doc.querySelectorAll('[data-operacao]');
    const tce = doc.querySelector('#tce');
    const tc = doc.querySelector('#tc');
    const tbs = doc.querySelector('#tbs');
    const tigual = doc.querySelector('#tigual');
    const ttroca = doc.querySelector('#ttroca');
    const displaycalc = doc.querySelector('#display-calc');
    const displayform = doc.querySelector('#display-form');
    const displayres = doc.querySelector('#display-res');


    teclasval.forEach(function (t) {
        t.addEventListener('click', function (event) {
            const valor = event.target.getAttribute('data-valor');
            const display = objcalc();
            if ((display.ultimo != '%' && display.tamanho > 0) || (valor != '%' && display.tamanho == 0)) displaycalc.innerHTML += valor;
        });
    });

    teclasop.forEach(function (t) {
        t.addEventListener('click', function (event) {
            const operacao = event.target.getAttribute('data-operacao');
            if (displayform.innerHTML.length > 0 && displaycalc.innerHTML.charAt(0) == '-')
                displayform.innerHTML += `(${displaycalc.innerHTML})${operacao}`;
            else if (displaycalc.innerHTML.length > 0)
                displayform.innerHTML += `${displaycalc.innerHTML}${operacao}`;

            displaycalc.innerHTML = ""
        });
    });
    tbs.addEventListener('click', function (event) { displaycalc.innerHTML = displaycalc.innerHTML.slice(0, -1); });
    tce.addEventListener('click', function (event) {
        displaycalc.innerHTML = "";
        displayform.innerHTML = "";
        displayres.innerHTML = "";
    });
    tc.addEventListener('click', function (event) {
        displaycalc.innerHTML = "";
        displayres.innerHTML = "";
    });
    ttroca.addEventListener('click', function (event) {
        const str = displaycalc.innerHTML;
        let valor = "";
        for (let key = 0; key < str.length; key++) {
            if (str.charAt(key) == '.' || str.charAt(key) == '-' || !isNaN(str.charAt(key))) valor += str.charAt(key)
        }
        if (valor) displaycalc.innerHTML = parseFloat(valor) * (-1);
    });
    tigual.addEventListener('click', function (event) {
        const calculo = displayform.innerHTML;
        calcular(calculo)
    });

    function calcular(str) {
    }

    function objcalc() {
        const obj = {
            primeiro: displaycalc.innerHTML.slice(0),
            ultimo: displaycalc.innerHTML.slice(-1),
            tamanho: displaycalc.innerHTML.length
        }
        return obj
    }

})(window, document)
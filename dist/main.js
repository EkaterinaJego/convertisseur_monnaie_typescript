"use strict";
const yuan = {
    name: "yuan",
    code: "YUA",
    symbol: "&yen;",
    change: 0.15
};
const dollar = {
    name: 'dollar',
    code: "DOL",
    symbol: "$",
    change: 1
};
const pound = {
    name: "livre pound",
    code: "LIV",
    symbol: "£",
    change: 1.39
};
const euro = {
    name: 'euro',
    code: " EUR",
    symbol: "€",
    change: 1.2
};
const tabOfDevises = [dollar, euro, yuan, pound];
const deviseInitSelect = document.querySelector("#dev_init");
deviseInitSelect.innerHTML = generateListOfDevises(tabOfDevises);
let deviseInitValue = deviseInitSelect.value; // code de la devise 
deviseInitSelect.addEventListener("change", () => {
    // deviseInitValue récupère la valeur de la devise choisie
    deviseInitValue = deviseInitSelect.value;
    showResult();
});
const deviseFinalSelect = document.querySelector("#dev_final");
deviseFinalSelect.innerHTML = generateListOfDevises(tabOfDevises);
let deviseFinalValue = deviseFinalSelect.value;
deviseFinalSelect.addEventListener("change", () => {
    // deviseFinalValue récupère la valeur de la devise choisie
    deviseFinalValue = deviseFinalSelect.value;
    showResult();
});
let amount = 0;
// pour récupérer la saisie dans le champ "Montant" on cible amountInput comme HTMLInputElement et on ajoute addEventListener qui réagit à l'événement key up cad quand le button a été relaché
const amountInput = document.querySelector("#amount");
amountInput.addEventListener("keyup", () => {
    amount = +amountInput.value;
    showResult();
});
let divResult = document.querySelector("#result");
// fonction showResult pour afficher le résultat du calcul
function showResult() {
    divResult.innerHTML = "Résultat :" + calculResult(amount, deviseInitValue, deviseFinalValue);
}
;
//  pour montrer la liste des devises :
function generateListOfDevises(in_dev) {
    let listDevisesText = "";
    for (let devise of in_dev) {
        listDevisesText += `<option value="${devise.code}">${devise.name} - ${devise.symbol}</option>`;
    }
    return listDevisesText;
}
// fonction getDevise pour récupérer la devise de son code en 3 lettres
function getDevise(codeDevise, in_devises) {
    for (let devise of in_devises) {
        if (codeDevise === devise.code) {
            return devise;
        }
    }
    return null;
}
// fonction calculResult qui prend en compte deux devises et le montant saisie et retourne le résultat du calcul
function calculResult(in_amount, in_devInitValue, in_devFinalValue) {
    let devInitObj = getDevise(in_devInitValue, tabOfDevises);
    let devFinalObj = getDevise(in_devFinalValue, tabOfDevises);
    let devInit;
    if (devInitObj) {
        devInit = devInitObj;
    }
    else
        throw { message: "La devise initiale n'est pas correcte" };
    let devFinal;
    if (devFinalObj) {
        devFinal = devFinalObj;
    }
    else
        throw { message: "La devise finale n'est pas correcte" };
    return (amount * devInit.change) / devFinal.change;
}
//# sourceMappingURL=main.js.map
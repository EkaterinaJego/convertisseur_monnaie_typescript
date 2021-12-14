type DeviseType = {
    name : string;
    code : string;
    symbol : string;
    change : number
}

const yuan: DeviseType = {
    name : "yuan",
    code :  "YUA",
    symbol : "&yen;",
    change : 0.15
}

const dollar: DeviseType = {
    name : 'dollar',
    code : "DOL",
    symbol : "$",
    change : 1
}

const pound : DeviseType = {
    name : "livre pound",
    code : "LIV",
    symbol : "£",
    change : 1.39
}

const euro : DeviseType = {
    name : 'euro',
    code :" EUR",
    symbol : "€",
    change : 1.2
}

const tabOfDevises : DeviseType[] = [dollar, euro, yuan, pound];



const deviseInitSelect = document.querySelector("#dev_init")! as HTMLSelectElement;
deviseInitSelect.innerHTML = generateListOfDevises(tabOfDevises);
let deviseInitValue = deviseInitSelect.value; // code de la devise 
deviseInitSelect.addEventListener("change", ()=>{
    // deviseInitValue récupère la valeur de la devise choisie
    deviseInitValue = deviseInitSelect.value;
    showResult();
      
});


const deviseFinalSelect = document.querySelector("#dev_final")! as HTMLSelectElement;
deviseFinalSelect.innerHTML = generateListOfDevises(tabOfDevises);
let  deviseFinalValue = deviseFinalSelect.value;
deviseFinalSelect.addEventListener("change", ()=>{
    // deviseFinalValue récupère la valeur de la devise choisie
    deviseFinalValue = deviseFinalSelect.value;
   showResult();
     
});


let amount : number  = 0; 

// pour récupérer la saisie dans le champ "Montant" on cible amountInput comme HTMLInputElement et on ajoute addEventListener qui réagit à l'événement key up cad quand le button a été relaché

const amountInput = document.querySelector("#amount")! as HTMLInputElement;
amountInput.addEventListener("keyup", ()=> {
amount = +amountInput.value;
showResult();
});


let divResult = document.querySelector("#result")! as HTMLDivElement;


// fonction showResult pour afficher le résultat du calcul

function showResult() {
    divResult.innerHTML = "Résultat :"+ calculResult(amount, deviseInitValue, deviseFinalValue);
    };
    



//  pour montrer la liste des devises :

function generateListOfDevises(in_dev: DeviseType[]) : string {
    let listDevisesText = "";
    for(let devise of in_dev){
        listDevisesText  += `<option value="${devise.code}">${devise.name} - ${devise.symbol}</option>`;
    } 
    return listDevisesText;
}


// fonction getDevise pour récupérer la devise de son code en 3 lettres

function getDevise(codeDevise : string,in_devises : DeviseType[]) : DeviseType | null {  
    for (let devise of in_devises){
        if (codeDevise === devise.code){
            return devise
        } 
    } return null;
}


// fonction calculResult qui prend en compte deux devises et le montant saisie et retourne le résultat du calcul

function calculResult(in_amount : number, in_devInitValue : string, in_devFinalValue : string ) : number{
    let devInitObj : unknown = getDevise(in_devInitValue, tabOfDevises);
    let devFinalObj : unknown = getDevise(in_devFinalValue, tabOfDevises);

    let devInit : DeviseType;
    if (devInitObj){
        devInit = devInitObj as DeviseType;
    } else throw {message : "La devise initiale n'est pas correcte"}
    
    
    let devFinal : DeviseType;
    if (devFinalObj){
        devFinal = devFinalObj as DeviseType}
        else throw {message : "La devise finale n'est pas correcte"};

    return (amount * devInit.change) / devFinal.change;
}


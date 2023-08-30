
//dom variables
let nameInput = document.getElementById('name-input');
let cardNumberInput = document.getElementById('card-number-input');
let monthInput = document.getElementById('month-input');
let yearInput = document.getElementById('year-input');
let cvcInput = document.getElementById('cvc-input');
let submit = document.getElementById("submit-btn");
let form = document.querySelector('form');
let rightSection = document.getElementById('right');
let thankYou = document.getElementById('thank-you');

//errors
let blankName = document.getElementById('name-blank');
let blankNumber = document.getElementById('number-blank');
let invalidNumber = document.getElementById('card-number-error');
let blankCVC = document.getElementById('cvc-blank');
let blankDates = document.getElementById('dates-blank');
let invalidDates = document.getElementById('dates-format-error');
let invalidCVC = document.getElementById('cvc-format-error');
let blankErrorsArray = [blankName, blankNumber, blankCVC, blankDates, invalidNumber,invalidDates, invalidCVC];
let inputsArray = [nameInput, cardNumberInput, monthInput, yearInput, cvcInput];

//card variables
let cardNumber = document.getElementById('card-number');
let holderName = document.getElementById('holder-name');
let expDate = document.getElementById('exp-date');
let cvcNum = document.getElementById('cvc');



function checkBlankFields(){
    //Clear some errors
    let blankErrors = true;
    if(nameInput.value == ""){
        nameInput.classList.add("has-error");
        blankName.style.display = 'block';
        blankErrors = false;
    }
    if(cardNumberInput.value == ""){
        cardNumberInput.classList.add("has-error");
        blankNumber.style.display = 'block';
        blankErrors = false;
    }
    if(monthInput.value == "" || yearInput.value == ""){

        monthInput.value =="" ? monthInput.classList.add("has-error"): yearInput.classList.add("has-error");
        yearInput.value =="" ? yearInput.classList.add("has-error"): monthInput.classList.add("has-error");

        blankDates.style.display = 'block';
        blankErrors = false;
    }
    if(cvcInput.value == ""){
        cvcInput.classList.add("has-error");
        blankCVC.style.display = 'block';
        blankErrors = false;
    }

    return blankErrors;

}

function checkNumbers(){
    let invalidErrors = true;
    if(isNaN(cardNumberInput.value) ){
        cardNumberInput.classList.add("has-error");
        invalidNumber.style.display = 'block';
        console.log('it is not a number');
        invalidErrors = false;
    }else {
        console.log('it is a number. go on with life');

    }
    if(isNaN(monthInput.value) || isNaN(yearInput.value)){
        isNaN(monthInput.value)  ? monthInput.classList.add("has-error"): yearInput.classList.add("has-error");
        isNaN(yearInput.value) ? yearInput.classList.add("has-error"): monthInput.classList.add("has-error");
        invalidDates.style.display = 'block';
        console.log('it is not a number');
        invalidErrors = false;
    }
    if(isNaN(cvcInput.value)){
        cvcInput.classList.add("has-error");
        invalidCVC.style.display = 'block';
        console.log('it is not a number');
        invalidErrors = false;
    }

    return invalidErrors;
}

function updateCards(){
    let blankErrors = true;
    if(nameInput.value.trim() != ""){
       holderName.innerText = nameInput.value;
    }else {
        holderName.innerText = 'Jane Appleseed';
    }
    if(cardNumberInput.value != ""){
        let numbersFormated = cardNumberInput.value.match(/.{1,4}/g);
        cardNumber.innerText = numbersFormated.join(' ');
        

    }else{
        cardNumber.innerText = '0000 0000 0000 0000'
    }
    
    if(monthInput.value != "" || yearInput.value != ""){
        if(monthInput.value != "" && yearInput.value != ""){
            expDate.innerText = `${monthInput.value}/${yearInput.value}`
        }else if(monthInput.value != "" && yearInput.value == ""){
            expDate.innerText = `${monthInput.value}/00`;
        }else if(monthInput.value == "" && yearInput.value != ""){
            expDate.innerText = `00/${yearInput.value}`;
        }
    }else {
        expDate.innerText = '00/00';
    }
    if(cvcInput.value != ""){
       cvcNum.innerText = cvcInput.value;
    }else {
        cvcNum.innerText = '000';
    }

    return blankErrors;
}

form.onkeyup = function(){
    updateCards();
}

function updatePage(){
    rightSection.innerHTML = `<div id="thank-you">
    <img src="images/icon-complete.svg" alt="">
    <h2>THANK YOU!</h2>
    <p>We've added your card details</p>
    <div id="continue-btn">
      Continue
    </div>
  </div>`;


}


submit.onclick = function(){
    
    for(let error of blankErrorsArray){
        error.style.display = "none";
    }
    for(let input of inputsArray){
        input.classList.remove('has-error')
    }

checkBlankFields();

   
    if(checkBlankFields()){
        checkNumbers();
        if(checkNumbers()){
            updatePage();
            let continueBtn = document.getElementById('continue-btn');


            continueBtn.onclick = function(){

                location.reload();
            }
        }

    }
    
}



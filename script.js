const inputDay= document.querySelector('#day');
const labelDay= document.querySelector('.day-label');

const inputMonth= document.querySelector('#month');
const labelMonth= document.querySelector('.month-label');

const inputYear= document.querySelector('#year');
const labelYear= document.querySelector('.year-label');

const enterButton= document.querySelector('.button');

const numberYear= document.querySelector('.number-year');
const numberDay= document.querySelector('.number-day');
const numberMonth= document.querySelector('.number-month');

const now= new Date();

const year= now.getFullYear();


//INPUTS VALIDATIONS
inputDay.addEventListener('input', ()=>{
    inputNumberValidation(inputDay);
    switch(parseInt(inputMonth.value)){
        case 2:
            if((parseInt(inputMonth.value) == 2) && (parseInt(inputDay.value) > 28)){
                showError(inputDay, labelDay);
                showError(inputMonth, labelMonth);
                break;
            }else{
                hideError(inputDay, labelDay, 'DAY');
                hideError(inputMonth, labelMonth, 'MONTH');
                break;
            }
        case (4 || 6 || 9 || 11):
            if(parseInt(inputDay.value) > 30){
                showError(inputDay, labelDay);
                showError(inputMonth, labelMonth);
                break;
            }else{
                hideError(inputDay, labelDay, 'DAY');
                hideError(inputMonth, labelMonth, 'MONTH');
                break;
            }
        default:
            if((parseInt(inputDay.value) > 31) || (inputDay.value == '00')){
                showError(inputDay, labelDay);
                break;
            }else{
                hideError(inputDay, labelDay, 'DAY');
                break;
            }
    }
});

inputMonth.addEventListener('input', ()=>{
    inputNumberValidation(inputMonth);
    switch(parseInt(inputMonth.value)){
        case 2:
            if(parseInt(inputDay.value) > 28){
                showError(inputDay, labelDay);
                showError(inputMonth, labelMonth);
                break;
            }else{
                hideError(inputDay, labelDay, 'DAY');
                hideError(inputMonth, labelMonth, 'MONTH');
                break;
            }
        case (4 || 6 || 9 || 11):
            if(parseInt(inputDay.value) > 30){
                showError(inputDay, labelDay);
                showError(inputMonth, labelMonth);
                break;
            }else{
                hideError(inputDay, labelDay, 'DAY');
                hideError(inputMonth, labelMonth, 'MONTH');
                break;
            }
        default:
            if((parseInt(inputMonth.value) > 12) || (inputMonth.value == '00')){
                showError(inputMonth, labelMonth);
                break;
            }else{
                hideError(inputMonth, labelMonth, 'MONTH');
                break;
            }
    }
});

inputYear.addEventListener('input', ()=>{
    inputNumberValidation(inputYear);

    if((parseInt(inputYear.value) > year) || inputYear.value == '0000'){
        showError(inputYear, labelYear);
    }else{
        hideError(inputYear, labelYear, 'YEAR');
    }
});

//AGE CALCULATION
enterButton.addEventListener('click', ()=>{

    verifyIsFilled(inputYear, labelYear, 'YEAR');
    verifyIsFilled(inputDay, labelDay, 'DAY');
    verifyIsFilled(inputMonth, labelMonth, 'MONTH');


    if(inputYear.value.length < 4){
        showError(inputYear, labelYear);
    }
    else if(inputDay.classList.contains('input-error') || inputMonth.classList.contains('input-error') || inputYear.classList.contains('input-error')){
        wrongData();
    }else{
        calculateAge();
    }
});


//FUNCTIONS
function inputNumberValidation(input){
    let regExpLeter = /\D/g;

    input.value= input.value.replace(/[/s]g/, '').trim();

    if(regExpLeter.test(input.value)){
        input.value= input.value.replace(/\D/g, '').trim();
    }
}
function verifyIsFilled(input, label, labelValue){
    if(input.classList.contains('input-error') === false){
        if(input.value == ''){
            showError(input, label);
        }else{
            hideError(input, label, labelValue);
        }
    }
}
function showError(input, label){
    input.classList.add('input-error');
    label.classList.add('label-error');
    label.innerText= 'Wrong';
}
function hideError(input, label, labelValue){
    input.classList.remove('input-error');
    label.classList.remove('label-error');
    label.innerText= labelValue;
}
function calculateAge(){
    let birthday= new Date(`${inputYear.value}/${inputMonth.value}/${inputDay.value}`);
    
    let years= year - birthday.getFullYear();
    let months= now.getMonth() - birthday.getMonth();
    let days= now.getDate() - birthday.getDate();

    if(months <= 0){
        months= months + 12;
        years--;
        if(days < 0){
            months--;
            days= days + 31;
        }
    }
    const yearsP= document.querySelector('.years-p');
    const monthsP= document.querySelector('.months-p');
    const daysP= document.querySelector('.days-p');

    switch(true){
        case(days == 1):
            drawNumbers(years, months, days);
            daysP.innerText= 'day';
        case(months == 1):
            drawNumbers(years, months, days);
            monthsP.innerText= 'month';
        case(years == 1):
            drawNumbers(years, months, days);
            yearsP.innerText= 'year';
        default: 
            drawNumbers(years, months, days);
            break;
    }    
}
function drawNumbers(years, months, days){
    numberYear.innerText= years;
    numberMonth.innerText= months;
    numberDay.innerText= days;
}
function wrongData(){
    numberYear.innerText= '--';
    numberMonth.innerText= '--';
    numberDay.innerText= '--';
}
const password_length = document.querySelector(".value_length");
const slider_indicator = document.querySelector(".slide_range");

let passwordLength = 10;
let password = "";
let checkCount = 0;

handleSlider();

function handleSlider(){

    slider_indicator.value = passwordLength;
    password_length.innerText= passwordLength;

    // to measure the background color
    // const min = slider_indicator.min;
    // const max = slider_indicator.max;

    // slider_indicator.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";

}

const provideVal = ()=>{

    passwordLength = slider_indicator.value;
    password_length.innerText= passwordLength;
}


// generate the random number
const getRndInteger = (min,max)=>{

    return (Math.floor((Math.random()*(max-min)))+min);
}

// generate a uppercase character
const getUpperCase = () =>{

    return String.fromCharCode(getRndInteger(65,91));
}

// generate a lowercase character
const getLowerCase = () =>{

    return String.fromCharCode(getRndInteger(97,123));
}

// generate a number character
const getNumber = () =>{

    return getRndInteger(0,10);
}

// store the symbols in the string
const symbolsChar = "~`!@'<,>./?:}{][\|-+()*&^$%#=";

// generate a symbol character
const getSymbol = () =>{

    let position = getRndInteger(0,symbolsChar.length);

    return symbolsChar[position];
}

const strengthIndicator = document.querySelector("[data_indicator]");

const setIndicator =(color)=>{

    strengthIndicator.style.backgroundColor = color;
    strengthIndicator.style.boxShadow = `1px 1px 5px 5px ${color}`;

}

const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const strengthColor = ()=>{

    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(upperCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCheck.checked) hasNumber = true;
    if(symbolCheck.checked) hasSymbol = true;

    if(hasLower && hasUpper && (hasNumber||hasSymbol) && passwordLength>=7){

        setIndicator("#03fca0");
    }
    else if((hasLower || hasUpper) && (hasSymbol || hasNumber ) && passwordLength>=4){
        setIndicator("#f2fc69");
    }
    else{
        setIndicator("#ff7033");
    }

}

// copy content
const icon_copy = document.querySelector(".clip_button");
const display_value = document.querySelector(".display_password");
const copyMsg = document.querySelector(".data_copy_msg");

async function copyContent(){

    try {

        await navigator.clipboard.writeText(display_value.value);
        copyMsg.innerHTML = "copied";
    } catch (error) {
        
        copyMsg.innerHTML = "failed";
    }

    console.log("task is done");

    copyMsg.classList.add("active");

    setTimeout(function(){

        copyMsg.classList.remove("active");
    },2000);

}

icon_copy.addEventListener('click',()=>{

    if(display_value.value){
        copyContent();
    }
})


// set the checkbox count;

function handlechange(){

    checkCount = 0;

    allCheckBox.forEach((check)=>{

        if(check.checked){
            checkCount++;
        }
    })

    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }

}

allCheckBox.forEach((checked)=>{

    checked.addEventListener('change',handlechange);
})

const generate_btn = document.querySelector(".generateButton");


const shufflePassword = (points)=>{

    for (let i = points.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));

        // fint the index from 0 to i thn swap the position of i and j
        let k = points[i];
        points[i] = points[j];
        points[j] = k;
    }
    let str = "";
    points.forEach((el) => (str += el));
    return str;
}


generate_btn.addEventListener('click',()=>{

    console.log("Starting the Journey");
    if(checkCount == 0){
        console.log("ending the Journey");
        return;
    }

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // set the compulsory cases first then solve the remaining

    console.log("Starting the Journey");
    password = "";
    // setting up of compulsory value storing the function in the array and then calling it randomly
    let funcArr = [];

    if(upperCaseCheck.checked){
        funcArr.push(getUpperCase);
    }

    if(lowerCaseCheck.checked){
        funcArr.push(getLowerCase);
    }

    if(numberCheck.checked){
        funcArr.push(getNumber);
    }

    if(symbolCheck.checked){
        funcArr.push(getSymbol);
    }

    for(let i=0; i<funcArr.length; i++){

        password += funcArr[i]();
    }

    console.log("COmpulsory adddition done");
    // remaining part of the length
    for(let i=0; i<passwordLength-funcArr.length; i++){

        let randInd = getRndInteger(0,funcArr.length);
        password += funcArr[randInd]();
    }

    console.log("Remaining adddition done");

    password = shufflePassword(Array.from(password))

    display_value.value = password;
    console.log("UI adddition done");

    strengthColor();
    console.log("checking  adddition done");

});





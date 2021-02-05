const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }
    addData(newUser);
}


// add new obj to data arr
function addData(obj){
    data.push(obj);
    updateDOM();
}

// update DOM
function updateDOM(providedData = data){
    // clear main div
    main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

    providedData.forEach(item=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//format number as money
function formatMoney(money){
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

// double everyones money
function doubleMoney(){
    data = data.map(ele=>{
        return {...ele,money: 2*ele.money}
    });
    updateDOM();
}

// sort users by richest
function sortByRichest(){
    data.sort((a,b)=>b.money-a.money);
    updateDOM();
}

//show only millionaires
function showMillionaires(){
    data = data.filter(user=>user.money>1000000);
    updateDOM();
}

// calculate total wealth
function calculateWealth(){
    const wealth = data.reduce((acc,user)=> (acc += user.money),0);
    const total = document.createElement('div');
    total.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(total);
    
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
sortBtn.addEventListener('click',sortByRichest);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);
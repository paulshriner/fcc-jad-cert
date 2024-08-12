// Face values for denominations
const amounts = [
    ["PENNY", 0.01], 
    ["NICKEL", 0.05], 
    ["DIME", 0.10], 
    ["QUARTER", 0.25], 
    ["ONE", 1.00], 
    ["FIVE", 5.00], 
    ["TEN", 10.00], 
    ["TWENTY", 20.00], 
    ["ONE HUNDRED", 100.00]    
]

// Store elements from the page
const cash = document.getElementById("cash");
const total = document.getElementById("total");
const cidPenny = document.getElementById("cid-penny");
const cidNickel = document.getElementById("cid-nickel");
const cidDime = document.getElementById("cid-dime");
const cidQuarter = document.getElementById("cid-quarter");
const cidOne = document.getElementById("cid-one");
const cidFive = document.getElementById("cid-five");
const cidTen = document.getElementById("cid-ten");
const cidTwenty = document.getElementById("cid-twenty");
const cidOneHundred = document.getElementById("cid-onehundred");
const changeDue = document.getElementById("change-due");
const submitButton = document.getElementById("purchase-btn");

// Price and cid, can change these for testing
let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

// Updates cid values on the page
const updateCid = () => {
    for (let i = 0; i < cid.length; ++i) {
        switch (cid[i][0]) {
            case "PENNY":
                cidPenny.textContent = `Pennies: $${cid[i][1]}`;
                break;
            case "NICKEL":
                cidNickel.textContent = `Nickels: $${cid[i][1]}`;
                break;
            case "DIME":
                cidDime.textContent = `Dimes: $${cid[i][1]}`;
                break;
            case "QUARTER":
                cidQuarter.textContent = `Quarters: $${cid[i][1]}`;
                break;
            case "ONE":
                cidOne.textContent = `Ones: $${cid[i][1]}`;
                break;
            case "FIVE":
                cidFive.textContent = `Fives: $${cid[i][1]}`;
                break;
            case "TEN":
                cidTen.textContent = `Tens: $${cid[i][1]}`;
                break;
            case "TWENTY":
                cidTwenty.textContent = `Twenties: $${cid[i][1]}`;
                break;
            case "ONE HUNDRED":
                cidOneHundred.textContent = `Hundreds: $${cid[i][1]}`;
                break;
        }
    }
};

const calculateChange = () => {
    // Result to store in change-due
    const result = [
        ["Status", ""],
        ["PENNY", 0.00], 
        ["NICKEL", 0.00], 
        ["DIME", 0.00], 
        ["QUARTER", 0.00], 
        ["ONE", 0.00], 
        ["FIVE", 0.00], 
        ["TEN", 0.00], 
        ["TWENTY", 0.00], 
        ["ONE HUNDRED", 0.00]
    ];
    
    // Check if customer has enough change
    if (isNaN(cash.valueAsNumber)) {
        alert("You must enter a number");
    } else if (cash.valueAsNumber < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    } else if (cash.valueAsNumber === price) {
        changeDue.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
        return;
    }

    // Calculate change due
    let change = cash.valueAsNumber - price;

    // Find change values
    for (let i = cid.length - 1; i >= 0; --i) {
        while (change >= amounts[i][1] && cid[i][1] >= amounts[i][1]) {
            // Solution to percision error
            // Source: https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
            cid[i][1] = Math.round((cid[i][1] - amounts[i][1]) * 100) / 100;
            result[i + 1][1] = Math.round((result[i + 1][1] + amounts[i][1]) * 100) / 100;
            change = Math.round((change - amounts[i][1]) * 100) / 100;
        }
    }

    // Update status of cid
    if (change !== 0) {
        result[0][1] = "INSUFFICIENT_FUNDS"
    } else {
        for (let i = 0; i < cid.length; ++i) {
            if (cid[i][1] !== 0) {
                result[0][1] = "OPEN";
                break;
            }
            result[0][1] = "CLOSED";
        }
    }

    // Update change due content on page
    changeDue.innerHTML = `<p>${result[0][0]}: ${result[0][1]}</p>`;
    if (result[0][1] !== "INSUFFICIENT_FUNDS") {
        for (let i = result.length - 1; i >= 0; --i) {
            if (amounts[i - 1][1] <= cash.valueAsNumber - price && result[i][1] !== 0.00) {
                changeDue.innerHTML += `<p>${result[i][0]}: $${result[i][1]}</p>`
            }
        }
    }

    updateCid();
}

//Event Handlers
submitButton.addEventListener("click", calculateChange);
cash.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        calculateChange();
    }
});

// Initial values when page first loads
total.textContent = `Total: $${price}`;
updateCid();

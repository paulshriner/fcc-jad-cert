// This solution is heavily based on my solution to the older fcc Roman Numeral Converter project here: https://www.freecodecamp.org/certification/fcc30aca8b2-d2c4-4009-a397-2e6d1ecbde3b/javascript-algorithms-and-data-structures

const convertButton = document.getElementById("convert-btn");
const input = document.getElementById("number");
const output = document.getElementById("output");

// For convenience, make object of numbers and roman letter equivs
const numList = {
    1000: "M", 
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
};

const isRomanNumeral = () => {
    // Thanks https://stackoverflow.com/questions/11563638/how-do-i-get-the-value-of-text-input-field-using-javascript for help with getting string value from input
    const userInput = parseInt(document.getElementById("number").value);

    // Early returns
    if (isNaN(userInput)) {
        output.innerText = `Please enter a valid number`;
        return;
    } else if (userInput <= 0) {
        output.innerText = `Please enter a number greater than or equal to 1`;
        return;
    } else if (userInput >= 4000) {
        output.innerText = `Please enter a number less than or equal to 3999`;
        return;
    }

    // Holds result
    let result = "";

    // Start at biggest num in numList, once counter is greater than or equal, update result and counter, then restart. Loop is done when counter is 0
    let counter = userInput;
    while (counter > 0) {
        for (let i = Object.keys(numList).length - 1; i >= 0; --i) {
            if (counter >= Object.keys(numList)[i]) {
                result += numList[Object.keys(numList)[i]];
                counter -= Object.keys(numList)[i];
                break;
            }
        }
    }

    output.innerText = `${result}`;
}

convertButton.addEventListener("click", isRomanNumeral);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        isRomanNumeral();
    }
});

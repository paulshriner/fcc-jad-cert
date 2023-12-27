// This solution is heavily based on my solution to the older fcc Palidrome Checker project here: https://www.freecodecamp.org/certification/fcc30aca8b2-d2c4-4009-a397-2e6d1ecbde3b/javascript-algorithms-and-data-structures

const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

// Returns a string with only alphanumeric characters
const cleanInput = (str) => {
    const regex = /[A-Za-z0-9]/;
    return str.split("").filter(value => value.match(regex)).join("").toLowerCase();
};

const isPalindrome = () => {
    // Thanks https://stackoverflow.com/questions/11563638/how-do-i-get-the-value-of-text-input-field-using-javascript for help with getting string value from input
    const userInput = document.getElementById("text-input").value;

    const cleanedInput = cleanInput(userInput);

    if (cleanedInput === "") {
        alert("Please input a value");
        return;
    }

    for (let i = 0; i < cleanedInput.length; ++i) {
        if ((i <= cleanedInput.length - 1 - i) && cleanedInput.length - 1 - i >= 0) {
            if (cleanedInput[i] != cleanedInput[cleanedInput.length - 1 - i]) {
                // Thanks https://sabe.io/blog/javascript-change-background-color for help with changing background color
                document.body.style.background = "#FF7276";
                result.innerText = `${userInput} is not a palindrome`;
                return;
            }            
        }
    }

    document.body.style.background = "#90ee90";
    result.innerText = `${userInput} is a palindrome`;
}

checkButton.addEventListener("click", isPalindrome);

// Store elements in variables for later use
const checkButton = document.getElementById("check-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const input = document.getElementById("user-input");

// Regular expression for U.S. phone numbers
// Thanks https://stackoverflow.com/questions/4999064/regex-for-string-contains for help with checking if anything comes before or end of string
const phoneRegex = /^(?:1|1\s)?(?:\d{3}|\(\d{3}\))(?:-|\s)?(?:\d{3})(?:-|\s)?(?:\d{4})$/;

const isValidNumber = () => {
    // Get user input in string
    const userInput = input.value;

    // Check for no input
    if (userInput === "") {
        document.body.style.background = "#FFFFFF";
        alert("Please provide a phone number");
        return;
    }

    // Test phone number aginst regex
    if (phoneRegex.test(userInput)) {
        document.body.style.background = "#90ee90";
        result.innerHTML += `<p>Valid US number: ${userInput}</p>`;
    } else {
        document.body.style.background = "#FF7276";
        result.innerHTML += `<p>Invalid US number: ${userInput}</p>`;
    }

    // Clear input
    input.value = "";

    return;
}

// Event listeners
checkButton.addEventListener("click", isValidNumber);
clearButton.addEventListener("click", () => {
    result.textContent = "";
    document.body.style.background = "#FFFFFF";
});
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        isValidNumber();
    }
});

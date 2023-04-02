"use strict";

const iconRotate = document.querySelector(".icon-rotate");
const password = document.querySelector(".password");
const copyBtn = document.querySelector(".btn-copy");
const passwordStrength = document.querySelector(".btn-strong");
const subSignBtn = document.querySelector(".sub-sign");
const addSignBtn = document.querySelector(".add-sign");
const passwordLength = document.querySelector(".character-used");

const slider = document.querySelector(".slider");

const upperCaseCheck = document.querySelector("#uppercase");
console.log(upperCaseCheck);
const lowerCaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const specialSignCheck = document.querySelector("#special-signs");
const checkmarks = document.querySelectorAll(".checkmark");

let root = document.querySelector(":root");
let rootStyles = getComputedStyle(root);
let veryWeakColor = rootStyles.getPropertyValue("--very-weak-color");
let goodColor = rootStyles.getPropertyValue("--good-color");
let strongColor = rootStyles.getPropertyValue("--strong-color");
let veryStrongColor = rootStyles.getPropertyValue("--very-strong-color");

let passwordLengthValue = 1;

iconRotate.addEventListener("click", () => {
    iconRotate.classList.add("rotate");
    changeGeneratedPassword();
    setTimeout(() => {
        iconRotate.style.transition = "none";
        iconRotate.classList.remove("rotate");
    }, 250);
    iconRotate.style.transition = "all 0.3s ease-out";
});

const checkPasswordLength = (val) => {
    if (val >= 12) {
        passwordStrength.textContent = "very strong";
        passwordStrength.style.backgroundColor = veryStrongColor;
    }
    if (val < 12) {
        passwordStrength.textContent = "strong";
        passwordStrength.style.backgroundColor = strongColor;
    }
    if (val < 10) {
        passwordStrength.textContent = "good";
        passwordStrength.style.backgroundColor = goodColor;
    }
    if (val < 8) {
        passwordStrength.textContent = "weak";
        passwordStrength.style.backgroundColor = veryWeakColor;
    }
    if (val < 5) {
        passwordStrength.textContent = "very weak";
        passwordStrength.style.backgroundColor = veryWeakColor;
    }
};

subSignBtn.addEventListener("click", (e) => {
    e.preventDefault();
    passwordLengthValue--;
    if (passwordLengthValue === 0) passwordLengthValue = 1;
    checkPasswordLength(passwordLengthValue);
    passwordLength.textContent = passwordLengthValue;
    slider.value = passwordLengthValue;
    changeGeneratedPassword();
});

addSignBtn.addEventListener("click", (e) => {
    e.preventDefault();

    passwordLengthValue++;
    if (passwordLengthValue === 21) passwordLengthValue = 30;
    checkPasswordLength(passwordLengthValue);

    passwordLength.textContent = passwordLengthValue;
    slider.value = passwordLengthValue;
    changeGeneratedPassword();
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(password.textContent);
    copyBtn.innerHTML = "COPIED";
    setTimeout(() => {
        copyBtn.innerHTML = "COPY";
    }, 2000);
});

slider.addEventListener("input", () => {
    passwordLengthValue = slider.value;
    checkPasswordLength(passwordLengthValue);
    passwordLength.textContent = passwordLengthValue;
    changeGeneratedPassword();
});

let charsUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let charsLowerCase = "abcdefghijklmnopqrstuvwxyz";
let charsNumbers = "0123456789";
let charsSpecialSigns = "!@#$%^&*()";
let generatedPassword = "";
let signs = "";

function changeGeneratedPassword() {
    generatedPassword = "";
    if (upperCaseCheck.checked) {
        if (signs.search(charsUpperCase) !== -1) {
            return;
        }
        signs += charsUpperCase;
    }

    if (lowerCaseCheck.checked) {
        if (signs.search(charsLowerCase) !== -1) {
            return;
        }
        signs += charsLowerCase;
    }
    if (numbersCheck.checked) {
        if (signs.search(charsNumbers) !== -1) {
            return;
        }
        signs += charsNumbers;
    }
    if (specialSignCheck.checked) {
        if (signs.search(charsSpecialSigns) !== -1) {
            return;
        }
        signs += charsSpecialSigns;
    }

    if (signs === "") {
        password.textContent = "Please choose at least 1 option";
        return;
    }

    console.log(signs);
    for (let i = 1; i <= passwordLengthValue; i++) {
        let randomIndex = Math.floor(Math.random() * signs.length);
        generatedPassword += signs[randomIndex];
    }
    password.textContent = generatedPassword;
    signs = "";
}

checkmarks.forEach((checkmark) =>
    checkmark.addEventListener("change", changeGeneratedPassword)
);

window.addEventListener("load", changeGeneratedPassword);

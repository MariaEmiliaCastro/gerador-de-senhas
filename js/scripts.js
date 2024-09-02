const passwordLengthSelector = document.querySelector("#password-length");
const passwordLengthTextInput = document.querySelector(
  ".password-generator__length-text"
);
const refreshPasswordButton = document.querySelector("#refresh-password");
const passwordOutput = document.querySelector("#password-output");
const copyPasswordButtons = document.querySelectorAll(
  ".password-generator__copy-button"
);
const passwordCheckbox = document.querySelectorAll(
  ".password-generator__option-checkbox"
);
const passwordStrength = document.querySelector(
  ".password-generator__strength"
);

const passwordParameters = [];

const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomUpperCaseLetter = () => {
  return String.fromCharCode(generateRandomNumber(65, 90));
};

const generateRandomLowerCaseLetter = () => {
  return String.fromCharCode(generateRandomNumber(97, 122));
};

const generateRandomNumberChar = () => {
  return String.fromCharCode(generateRandomNumber(48, 57));
};

const generateRandomSymbol = () => {
  const symbols = "!@#$%^&*(){}[]=<>/,.|~?-";
  return symbols[generateRandomNumber(0, symbols.length - 1)];
};

const generateRandomPassword = (length, selectedParameters) => {
  const parameters =
    selectedParameters.length === 0
      ? [generateRandomLowerCaseLetter]
      : selectedParameters;

  let password = "";

  for (let i = 0; i < length; i++) {
    console.log("i", i);
    const randomFunctionIndex = generateRandomNumber(0, parameters.length - 1);

    password += parameters[randomFunctionIndex]();
  }

  return password;
};

const copyValueToClipboard = (value) => {
  navigator.clipboard.writeText(value);
};

const setPasswordLength = (event) => {
  const tempPasswordLengthTextInput = event.target.value;
  passwordLengthTextInput.value = tempPasswordLengthTextInput;

  const progress =
    (tempPasswordLengthTextInput / passwordLengthSelector.max) * 100;
  passwordLengthSelector.style.background = `linear-gradient(to right, #fff ${progress}%, #2c1746 ${progress}%)`;
};

const setPasswordStrength = () => {
  passwordStrength.classList.remove(
    "password-generator__strength--weak",
    "password-generator__strength--medium",
    "password-generator__strength--strong"
  );

  const selectedCheckboxes = Array.from(passwordCheckbox).filter(
    (checkbox) => checkbox.checked
  );
  const selectedIds = selectedCheckboxes.map((checkbox) => checkbox.id);

  if (selectedIds.length === 4) {
    passwordStrength.classList.add("password-generator__strength--strong");
    return;
  }

  const mediumStrength =
    selectedIds.length === 3 &&
    selectedIds.includes("RandomUpperCaseLetter") &&
    selectedIds.includes("RandomLowerCaseLetter");

  if (mediumStrength) {
    passwordStrength.classList.add("password-generator__strength--medium");
    return;
  }

  passwordStrength.classList.add("password-generator__strength--weak");
};

addEventListener("DOMContentLoaded", () => {
  passwordCheckbox.forEach((checkbox) => {
    checkbox.checked = true;
    passwordParameters.push(eval(`generate${checkbox.id}`));
  });

  setPasswordStrength();
  const passwordLength = passwordLengthSelector.value;

  const progress = (passwordLength / passwordLengthSelector.max) * 100;
  passwordLengthSelector.style.background = `linear-gradient(to right, #fff ${progress}%, #2c1746 ${progress}%)`;

  const password = generateRandomPassword(passwordLength, passwordParameters);

  passwordOutput.innerHTML = password;
});

passwordCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (event) => {
    if (event.target.checked) {
      passwordParameters.push(eval(`generate${event.target.id}`));
      setPasswordStrength();
      return;
    }

    const index = passwordParameters.indexOf(
      eval(`generate${event.target.id}`)
    );
    passwordParameters.splice(index, 1);

    setPasswordStrength();
  });
});

passwordLengthSelector.addEventListener("input", (event) => {
  setPasswordLength(event);
});

passwordLengthTextInput.addEventListener("input", (event) => {
  setPasswordLength(event);
});

refreshPasswordButton.addEventListener("click", () => {
  const passwordLength = passwordLengthSelector.value;
  const password = generateRandomPassword(passwordLength, passwordParameters);

  passwordOutput.innerHTML = password;
});

copyPasswordButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const password = passwordOutput.innerHTML;
    copyValueToClipboard(password);
  });
});

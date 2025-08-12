const form = document.querySelector("form");
const eField = form.querySelector(".email"),
      eInput = eField.querySelector("input");
const pField = form.querySelector(".password"),
      pInput = pField.querySelector("input");
const cpField = form.querySelector(".confirm-password"),
      cpInput = cpField.querySelector("input");

form.onsubmit = (e) => {
  e.preventDefault();

  // Validate fields
  (eInput.value === "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value === "") ? pField.classList.add("shake", "error") : checkPass();
  (cpInput.value === "") ? cpField.classList.add("shake", "error") : checkConfirm();

  setTimeout(() => {
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    cpField.classList.remove("shake");
  }, 500);

  // Live validation
  eInput.onkeyup = () => checkEmail();
  pInput.onkeyup = () => checkPass();
  cpInput.onkeyup = () => checkConfirm();

  // If no errors, proceed (e.g., redirect or submit)
  if (!eField.classList.contains("error") &&
      !pField.classList.contains("error") &&
      !cpField.classList.contains("error")) {
    window.location.href = form.getAttribute("action");
  }
};

function checkEmail() {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!eInput.value.match(pattern)) {
    eField.classList.add("error");
    eField.classList.remove("valid");
    let errorTxt = eField.querySelector(".error-txt");
    errorTxt.innerText = eInput.value !== "" ? "Enter a valid email address" : "Email can't be blank";
  } else {
    eField.classList.remove("error");
    eField.classList.add("valid");
  }
}

function checkPass() {
  if (pInput.value === "") {
    pField.classList.add("error");
    pField.classList.remove("valid");
  } else {
    pField.classList.remove("error");
    pField.classList.add("valid");
  }

  // Re-check confirm password if needed
  if (cpInput.value !== "") checkConfirm();
}

function checkConfirm() {
  if (cpInput.value === "") {
    cpField.classList.add("error");
    cpField.classList.remove("valid");
    cpField.querySelector(".error-txt").innerText = "Confirm Password can't be blank";
  } else if (cpInput.value !== pInput.value) {
    cpField.classList.add("error");
    cpField.classList.remove("valid");
    cpField.querySelector(".error-txt").innerText = "Passwords do not match";
  } else {
    cpField.classList.remove("error");
    cpField.classList.add("valid");
  }
}

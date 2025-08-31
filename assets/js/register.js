const form = document.querySelector("form");
const nField = form.querySelector(".name"),
      nInput = nField.querySelector("input");
const eField = form.querySelector(".email"),
      eInput = eField.querySelector("input");
const pField = form.querySelector(".password"),
      pInput = pField.querySelector("input");
const cpField = form.querySelector(".confirm-password"),
      cpInput = cpField.querySelector("input");


let token = localStorage.getItem("authToken");
// if there is already a token, go to dashboard
if(token){
  window.location.replace("./");
}


async function registerApp() {
  form.onsubmit = async (e) => {   // make this async
    e.preventDefault();

    // Validate fields
    (nInput.value === "") ? nField.classList.add("shake", "error") : checkName();
    (eInput.value === "") ? eField.classList.add("shake", "error") : checkEmail();
    (pInput.value === "") ? pField.classList.add("shake", "error") : checkPass();
    (cpInput.value === "") ? cpField.classList.add("shake", "error") : checkConfirm();

    setTimeout(() => {
      nField.classList.remove("shake");
      eField.classList.remove("shake");
      pField.classList.remove("shake");
      cpField.classList.remove("shake");
    }, 500);

    // Live validation
    nInput.onkeyup = () => checkName();
    eInput.onkeyup = () => checkEmail();
    pInput.onkeyup = () => checkPass();
    cpInput.onkeyup = () => checkConfirm();

    // If no errors, proceed
    if (!nField.classList.contains("error") &&
        !eField.classList.contains("error") &&
        !pField.classList.contains("error") &&
        !cpField.classList.contains("error")) {

      const registerJSON = {
        name: nInput.value,
        email: eInput.value,
        password: pInput.value,
        password_confirmation: cpInput.value
      };

      await register(registerJSON);
    }
  };
}


function checkName(){
  if (nInput.value === ""){
    nField.classList.add("error");
    nField.classList.remove("valid");
  } else {
    nField.classList.remove("error");
    nField.classList.add("valid");
  }
}

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


async function register(data){
  console.log("register . . .")
  
  document.getElementById('submit-button').innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;

  const response = await authRegister(data);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    return;
  }

  document.getElementById('registration-form').style.display = 'none';
  document.getElementById('registration-result-success').style.display = 'block';

  /*
  //const regEndpoint = "https://api.microbess.id/api/v1/register";
  const regEndpoint = "http://192.168.1.27:8000/api/v1/register";
  console.log("Register . . .");

  fetch(regEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(regData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(result => {
    console.log("Success:", result);

    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('registration-result-success').style.display = 'block';
  })
  .catch(error => {
    console.error("Error:", error);
  });
  */
}
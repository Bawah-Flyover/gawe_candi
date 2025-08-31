const form = document.querySelector("form");
const eField = form.querySelector(".email"),
      eInput = eField.querySelector("input");
const pField = form.querySelector(".password"),
      pInput = pField.querySelector("input");

const token = localStorage.getItem("authToken");

// if there is already a token, go to dashboard
if(token){
  window.location.replace("./");
}

async function loginApp() {
  form.onsubmit = async (e) => {   // ⬅ make this async
    e.preventDefault(); // preventing form from submitting

    // if email and password are blank then add shake class, else call check functions
    (eInput.value === "") ? eField.classList.add("shake", "error") : checkEmail();
    (pInput.value === "") ? pField.classList.add("shake", "error") : checkPass();

    setTimeout(() => { // remove shake class after 500ms
      eField.classList.remove("shake");
      pField.classList.remove("shake");
    }, 500);

    // call validations on keyup
    eInput.onkeyup = () => checkEmail();
    pInput.onkeyup = () => checkPass();

    // inner functions
    function checkEmail() {
      let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!eInput.value.match(pattern)) {
        eField.classList.add("error");
        eField.classList.remove("valid");
        let errorTxt = eField.querySelector(".error-txt");
        (eInput.value !== "") 
          ? errorTxt.innerText = "Enter a valid email address" 
          : errorTxt.innerText = "Email can't be blank";
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
    }

    // if no errors → proceed to login
    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
      const loginJSON = {
        email: eInput.value,
        password: pInput.value,
      };

      try {
        await login(loginJSON);  // now works fine
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  }
}


async function login(data){
  console.log("login . . .")
  document.getElementById('submit-button').innerHTML = `
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  
  const response = await authLogin(data);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    return;
  }

  const result = await response.json()

  if (result.token) {
    // Save both
    localStorage.setItem("authToken", result.token);

    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-result-success').style.display = 'block';

    window.location.href ="./index.html";
  }
}

import { api } from './apis/api.js'
import { Storage } from './utils/storage.js'

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  const credentials = {
    email, 
    password
  }

   // {
  //   "email": "miller@gmail.com",
  //   "password": "asdasd"
  // }

  const result = await api.auth.login(credentials);

  if (result.accessToken && result.user) {
    Storage.set('token', result.accessToken);
    Storage.set('user', result.user);
    window.location.assign("home.html");  
  } else {
    alert('Something Wrong')
  }
  
  

  console.log(credentials);
}

function createLoginLayout() {
  const container = document.createElement("div");
  container.setAttribute("class", "container-root");

  const header = document.createElement("header");
  header.setAttribute("class", "header");

  const link = document.createElement("a");
  link.setAttribute("href", "home.html");
  link.innerText = "Home";

  const formWrapper = document.createElement("form");
  formWrapper.setAttribute("class", "form-wrapper");

  const loginContainer = document.createElement("div");
  loginContainer.setAttribute("class", "form-container");

  const form = document.createElement("form");

  const inputEmail = document.createElement("input");
  inputEmail.setAttribute('id', "email")
  inputEmail.setAttribute("type", "text");
  inputEmail.setAttribute("placeholder", "Email");

  const inputPassword = document.createElement("input");
  inputPassword.setAttribute('id', "password")
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('placeholder', 'Password');

  const buttonLogin = document.createElement("button");
  buttonLogin.setAttribute("type", "submit" );
  buttonLogin.innerText = "Login";

  buttonLogin.addEventListener("click", handleLogin)

  header.appendChild(link);

  form.appendChild(inputEmail);
  form.appendChild(inputPassword);
  form.appendChild(buttonLogin);

  loginContainer.appendChild(form);

  formWrapper.appendChild(loginContainer);

  container.appendChild(header);
  container.appendChild(formWrapper);

  document.body.appendChild(container);
}

createLoginLayout();
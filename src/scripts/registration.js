import { api } from './apis/api.js'

function createRegistrationLayout() {
  const submitButton = UI.createElement("button", { type: "submit" }, "Submit")

  const handelSubmit = async (event) => {
    event.preventDefault()

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const username = document.getElementById('username').value.trim();


    const user = {
      firstName,
      lastName,
      email, 
      password,
      username
    }
  

    console.log(user);
    const result = await api.auth.register(user);
    console.log(result);

    if (result.id) {
      window.location.assign("login.html");  
    } else {
      alert("Something wrong please check your data")
    }
    
  }

  submitButton.addEventListener('click', handelSubmit) 

  const container = UI.createElement("div", { class: "container-root" }, [
    UI.createElement('header', { class: "header" },  [
      UI.createElement("a", { href: "home.html" }, "Home"),
      UI.createElement("a", { href: "index.html" }, "Log In")
    ]),
    UI.createElement("form", {class: "form-wrapper"}, [
      UI.createElement('div', { class: "form-container" }, [
        UI.createElement("input", { id: 'firstName', placeholder: "First Name" } ),
        UI.createElement("input", { id: 'lastName', placeholder: "Last Name" } ),
        UI.createElement("input", { id: 'username', placeholder: "Username" } ),
        UI.createElement("input", { id: 'email', placeholder: "Email" } ),
        UI.createElement("input", { id: 'password', placeholder: "Password" } ),
        UI.createElement("div", { class: "form-footer" }, [
          submitButton
        ])
      ]),
    ])
  ]);

  UI.render(container, document.body);
}

createRegistrationLayout();
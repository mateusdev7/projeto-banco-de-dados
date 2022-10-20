const id = document.getElementById("id");
const name = document.getElementById("nameUser");
const email = document.getElementById("email");
const descriptionAccess = document.getElementById("descriptionAccess");
const phone = document.getElementById("phone");
const zipCode = document.getElementById("zipCode");
const numberHome = document.getElementById("numberHome");
const complement = document.getElementById("complement");
const professionName = document.getElementById('professionName');
const form = document.querySelector(".form-inclusao-usuario");
const responseCreateUser = document.querySelector(".responseCreateUser");
const inputs = document.querySelectorAll('input');

function sendJSON(e) {
  e.preventDefault();

  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/insert";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retorno = JSON.parse(this.responseText);
      // TODO - Imprimir mensagem de retorno na tela
      responseCreateUser.textContent = retorno.description;
      setInterval(() => {
        responseCreateUser.textContent = ""
      }, 2000)
    }
  };
  
  const zipInt = parseInt(zipCode.value);
  const numberInt = parseInt(numberHome.value);
  // Converting JSON data to string
  var data = JSON.stringify({
    id: 0,
    name: nameUser.value,
    email: email.value,
    descriptionAccess: descriptionAccess.value,
    phone: phone.value,
    zipCode: zipInt,
    numberHome: numberInt,
    complement: complement.value,
    professionName: professionName.value
  });

  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  })
}

form.addEventListener("submit", sendJSON);

const name = document.getElementById("nameUser");
const email = document.getElementById("email");
const descriptionAccess = document.getElementById("descriptionAccess");
const cpf = document.getElementById("cpf");
const form = document.querySelector(".form-inclusao-usuario");
const responseCreateUser = document.querySelector(".responseCreateUser");
const inputs = document.querySelectorAll('input');
const table = document.querySelector('table');

function createUserInTable(id, name, cpf) {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.textContent = id
  const tdName = document.createElement('td');
  tdName.textContent = name
  const tdCpf = document.createElement('td');
  tdCpf.textContent = cpf
  tr.appendChild(tdId);
  tr.appendChild(tdName)
  tr.appendChild(tdCpf)
  table.appendChild(tr)
  return tr
}

function getDataUsers() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/search";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length !== 0) {
        myArr.forEach((item) => {
          const name = item.name
          const arrName = name.split(" ");
          for (let i = 0; i < arrName.length; i++) {
            arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1);
          }
          let nameFormat = arrName.join(" ");
          let cpf = item.cpf;
          cpf = cpf.replace(/[^\d]/g, "");
          cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
          createUserInTable(item.id, nameFormat, cpf)
        })
      } else {
        alert("Não possuem usuários cadastrados")
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
getDataUsers();



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
      if (Object.keys(retorno).length !== 0) {
        responseCreateUser.textContent = "Usuário inserido com sucesso";
        setTimeout(() => {
          responseCreateUser.textContent = null;
          location.reload(true);
        }, 2000)
      } else {
        responseCreateUser.textContent = "Não foi possível inserir o usuário";
      }
    }
  };
  
  // Converting JSON data to string
  const data = JSON.stringify({
    id: 0,
    name: nameUser.value,
    email: email.value,
    descriptionAccess: descriptionAccess.value,
    cpf: cpf.value,
  });

  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  })
}

form.addEventListener("submit", sendJSON);

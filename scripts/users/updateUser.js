const id = document.getElementById("id");
const nameField = document.getElementById("name");
const email = document.getElementById("email");
const descriptionAccess = document.getElementById("descriptionAccess");
const cpf = document.getElementById("cpf");
const inputs = document.querySelectorAll("input");

const formPesquisarUsuario = document.querySelector(".form-pesquisar-usuario");
const formAtualizarUsuario = document.querySelector(".form-atualizar-usuario");

const responseUpdateUser = document.querySelector(".responseUpdateUser");
const table = document.querySelector('table');

function createUserInTable(id, name, email) {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.textContent = id
  const tdName = document.createElement('td');
  tdName.textContent = name
  const tdEmail = document.createElement('td');
  tdEmail.textContent = email
  tr.appendChild(tdId);
  tr.appendChild(tdName)
  tr.appendChild(tdEmail)
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
          const str = item.name
          const arr = str.split(" ");
          for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
          }
          const str2 = arr.join(" ");
          createUserInTable(item.id, str2, (item.email).toLowerCase())
        })
      } else {
        alert("Não possuem usuários cadastrados para serem atualizados")
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
getDataUsers();

function picUser(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5000/pic";
  const idInt = parseInt(id.value);
  const dataPic = JSON.stringify({
    id: idInt,
    name: "",
    email: "",
    descriptionAccess: "",
    cpf: "",
  });

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        alert("Dados não encontrados")
      } else {
        showDataUser(myArr);
        nameField.disabled = false;
        email.disabled = false;
        descriptionAccess.disabled = false;
        cpf.disabled = false;
        id.disabled = true;
      }
    }
  };
  xhr.send(dataPic);
}

function showDataUser(myArr) {
  id.value = myArr["id"];
  nameField.value = myArr["name"];
  email.value = myArr["email"];
  descriptionAccess.value = myArr["descriptionAccess"];
  cpf.value = myArr["cpf"];
}

formPesquisarUsuario.addEventListener("submit", picUser);

function updateUser(e) {
  e.preventDefault();
  let urlUpdate = "http://127.0.0.1:5000/update";
  let xhrUpdate = new XMLHttpRequest();
  const idInt = parseInt(id.value);
  const data = JSON.stringify({
    id: idInt,
    name: nameField.value,
    email: email.value,
    descriptionAccess: descriptionAccess.value,
    cpf: cpf.value,
  });

  xhrUpdate.open("POST", urlUpdate, true);
  xhrUpdate.setRequestHeader("Content-Type", "application/json");
  xhrUpdate.onreadystatechange = function () {
    if (xhrUpdate.readyState === 4 && xhrUpdate.status === 200) {
      const myArr = JSON.parse(this.responseText)
      if (myArr["id"] !== '' && myArr["name"] !== '') {
        responseUpdateUser.textContent = "Usuário atualizado com sucesso";
        setTimeout(() => {
          responseUpdateUser.textContent = "";
          location.reload(true); 
        }, 2000);
      } else {
        responseUpdateUser.textContent = "Não foi possivel alterar o usuário"
      }
      // if(myArr.length !== 0) {
      //   console.log('Array maior do que 0')
      //   responseUpdateUser.textContent = "Usuário atualizado com sucesso";
      //   setTimeout(() => {
      //     responseUpdateUser.textContent = "";
      //     location.reload(true); 
      //   }, 2000);
      // } else {
      //   console.log('Array menor do que 0')
      //   responseUpdateUser.textContent = "Não foi possivel alterar o usuário"
      // }
    }
  };
  xhrUpdate.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
};

formAtualizarUsuario.addEventListener("submit", updateUser);

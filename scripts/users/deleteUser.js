const cpf = document.getElementById("cpf");
const inputs = document.querySelectorAll("input");
const firstDelete = document.querySelector('.firstDelete');
const confirmDelete = document.querySelector('.confirmDelete');
const cancelDelete = document.querySelector('.cancelDelete');
const dataResult = document.querySelector('[data-result]');
const formDeletarUsuario = document.querySelector('.form-deletar-usuario')
const table = document.querySelector('table');

confirmDelete.style.display = "none";
cancelDelete.style.display = "none";

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

function deleteUser(e) {
  e.preventDefault();

  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/delete";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retorno = JSON.parse(this.responseText);
      if (retorno.length === 0) {
        alert("Usuário inexistente")
        location.reload(true); 
      } else {
        alert("Usuário deletado com sucesso")
        location.reload(true); 
      }
    }
  };

  // Converting JSON data to string
  const data = JSON.stringify({
    id: 0,
    name: "",
    email: "",
    descriptionAccess: "",
    cpf: cpf.value,
  });
  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
}

function showSecondButton(e) {
  e.preventDefault();
  if (cpf.value !== "") {
    confirmDelete.style.display = "block";
    cancelDelete.style.display = "block";
  }
}

function hideButton(e) {
  e.preventDefault();
  if (e.target === confirmDelete) {
    confirmDelete.style.display = "none";
    cancelDelete.style.display = "none";
  }
}

firstDelete.addEventListener("click", showSecondButton)
confirmDelete.addEventListener("click", deleteUser);

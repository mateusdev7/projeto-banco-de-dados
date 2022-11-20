const professionSelect = document.querySelector('.professionSelect');
const table = document.querySelector('.tableUser')
const formRelacaoProfissaoUser = document.querySelector('.form-relacao-profissao-user')
const cpfUser = document.getElementById('cpf');
const inputs = document.querySelectorAll('.input');

function createOptionProfession(profession) {
  const option = document.createElement('option');
  option.value = profession.toLowerCase()
  option.textContent = profession
  professionSelect.appendChild(option)
  return option
}

function getDataProfession() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5001/search";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length !== 0) {
        myArr.forEach((item) => {
          const nameProfession = item.description
          const arrName = nameProfession.split(" ");
          for (let i = 0; i < arrName.length; i++) {
            arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1);
          }
          let nameProfessionFormat = arrName.join(" ");
          createOptionProfession(nameProfessionFormat)
        })
      } else {
        alert("Não possuem profissões cadastrados")
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
getDataProfession();

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
  let url = "http://127.0.0.1:5002/insert";
  console.log("Entrou no send JSON")
  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retornoResult = JSON.parse(this.responseText);
      if (retornoResult.length !== 0) {
        alert("Relação criada com sucesso")
      } else {
        alert("Não foi possível criar a relação")
      }
    }
  };

  const data = JSON.stringify({
    id: 0,
    cpf: cpfUser.value,
    description: professionSelect.options[professionSelect.selectedIndex].textContent,
  });

  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
}

formRelacaoProfissaoUser.addEventListener('submit', sendJSON);





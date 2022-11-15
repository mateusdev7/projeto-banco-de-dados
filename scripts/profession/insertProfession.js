const description = document.getElementById("description");
const responseCreateProfession = document.querySelector(
  ".responseCreateProfession"
);
const form = document.querySelector(".form-inclusao-profissao");
const inputs = document.querySelectorAll("input");
const table = document.querySelector('table');

function createProfessionInTable(id, profession) {
  const tr = document.createElement('tr');
  const tdId = document.createElement('td');
  tdId.textContent = id
  const tdNameProfession = document.createElement('td');
  tdNameProfession.textContent = profession
  tr.appendChild(tdId);
  tr.appendChild(tdNameProfession)
  table.appendChild(tr)
  return tr
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
          createProfessionInTable(item.id, nameProfessionFormat)
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

function sendJSON(e) {
  e.preventDefault();

  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5001/insert";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retorno = JSON.parse(this.responseText);
      if (retorno.length !== 0) {
        responseCreateProfession.textContent = "Profissão criada com sucesso!";
        setTimeout(() => {
          responseCreateProfession.textContent = ""
          location.reload();
        }, 2000)
      } else {
        responseCreateProfession.textContent = "Não foi possível inserir essa profissão";
      }
    }
  };

  var data = JSON.stringify({
    id: 0,
    description: (description.value).toLowerCase(),
  });

  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
}

form.addEventListener("submit", sendJSON);

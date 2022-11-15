const id = document.getElementById("id");
const description = document.getElementById("description");
const responseUpdateProfession = document.querySelector(".responseUpdateProfession");
const formPesquisarProfissao = document.querySelector(".form-pesquisar-profissao");
const formAtualizarProfissao = document.querySelector(".form-atualizar-profissao");
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

function picProfession(e) {
  e.preventDefault()
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5001/search";
  const idInt = parseInt(id.value)
  const dataPic = JSON.stringify({
    id: idInt,
    description: ""
  });

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        alert("Dados não encontrados")
      } else {
        showDataProfession(myArr)
        description.disabled = false;
      }
    }
  };
  xhr.send(dataPic);
}

function showDataProfession(myArr) {
  id.value = myArr[0].id;
  description.value = myArr[0].description;
};

formPesquisarProfissao.addEventListener("submit", picProfession)

function updateProfession(e) {
    e.preventDefault()
    let urlUpdate = "http://127.0.0.1:5001/update";
    let xhrUpdate = new XMLHttpRequest();
    const idInt = parseInt(id.value);
    const data = JSON.stringify({
      id: idInt,
      description: description.value,
    });

    xhrUpdate.open("POST", urlUpdate, true);
    xhrUpdate.setRequestHeader("Content-Type", "application/json");
    xhrUpdate.onreadystatechange = function () {
      if (xhrUpdate.readyState === 4 && xhrUpdate.status === 200) {
        const myArr = JSON.parse(this.responseText);
        if (myArr.length > 0) {
            responseUpdateProfession.textContent = "Profissão atualizada com sucesso"
            setTimeout(() => {
            responseUpdateProfession.textContent = "";
            location.reload(true); 
          }, 2000);
        } else {
            responseUpdateProfession.textContent = "Não foi possível alterar a profissão"
        }
      }
    };
    xhrUpdate.send(data);
    inputs.forEach((input) => {
      input.value = "";
    });
};

formAtualizarProfissao.addEventListener("submit", updateProfession);

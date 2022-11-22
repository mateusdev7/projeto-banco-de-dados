const tableUserProfessionSumarizacaoUm = document.querySelector('.tableUserProfessionSumarizacaoUm');
const tableUserProfessionSumarizacaoDois = document.querySelector('.tableUserProfessionSumarizacaoDois');

function createRelationInTableQuantityProfession(quantity, profession) {
  const tr = document.createElement('tr');
  const tdQuantity = document.createElement('td');
  tdQuantity.textContent = quantity;
  const tdProfession = document.createElement('td');
  tdProfession.textContent = profession;
  tr.appendChild(tdQuantity);
  tr.appendChild(tdProfession)
  tableUserProfessionSumarizacaoUm.appendChild(tr)
  return tr
}

function createRelationInTableCpfProfession(cpf, profession) {
  const tr = document.createElement('tr');
  const tdCpf = document.createElement('td');
  tdCpf.textContent = cpf;
  const tdProfession = document.createElement('td');
  tdProfession.textContent = profession;
  tr.appendChild(tdCpf);
  tr.appendChild(tdProfession)
  tableUserProfessionSumarizacaoDois.appendChild(tr)
  return tr
}

function getDataRelationQuantityProfession() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5002/searchQuantityProfession";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length !== 0) {
        myArr.forEach((item) => {
          createRelationInTableQuantityProfession(item.quant, item.description)
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
getDataRelationQuantityProfession();

function getDataRelationUserProfession() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5002/searchCpfProfession";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length !== 0) {
        myArr.forEach((item) => {
          createRelationInTableCpfProfession(item.cpf, item.description)
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
getDataRelationUserProfession()
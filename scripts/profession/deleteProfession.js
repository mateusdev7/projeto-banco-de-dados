const id = document.getElementById("id");
const inputs = document.querySelectorAll('input');
const firstDelete = document.querySelector('.firstDelete');
const confirmDelete = document.querySelector('.confirmDelete');
const cancelDelete = document.querySelector('.cancelDelete');
const formDeletarProfissao = document.querySelector(".form-deletar-profissao")
confirmDelete.style.display = "none";
cancelDelete.style.display = "none";
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


function deleteProfession(e) {
  e.preventDefault();
  
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5001/delete";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  const idInt = parseInt(id.value);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retorno = JSON.parse(this.responseText);
      if (retorno.length === 0) {
        alert("Profissão inexistente")
      } else {
        alert("Profissão deletada com sucesso!")
        location.reload(true)
      }
    }
  };

  // Converting JSON data to string
  const data = JSON.stringify({
    id: idInt,
    description: "",
  });
  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  })
}

function showSecondButton(e) {
  e.preventDefault();
  if (id.value !== "") {
    confirmDelete.style.display = "block";
    cancelDelete.style.display = "block";
  }
}

function hideButton() {
  e.preventDefault();
  if (e.target === confirmDelete) {
    confirmDelete.style.display = "none";
    cancelDelete.style.display = "none";
  }
}

firstDelete.addEventListener('click', showSecondButton)
confirmDelete.addEventListener("click", deleteProfession);

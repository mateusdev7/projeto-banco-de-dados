const id = document.getElementById("id");
const responseDeleteProfession = document.querySelector(".responseDeleteProfession");
const inputs = document.querySelectorAll('input');
const firstDelete = document.querySelector('.firstDelete');
const confirmDelete = document.querySelector('.confirmDelete');
const cancelDelete = document.querySelector('.cancelDelete');
const dataResult = document.querySelector('[data-result]');
const formDeletarProfissao = document.querySelector(".form-deletar-profissao")
confirmDelete.style.display = "none";
cancelDelete.style.display = "none";

function createText(content) {
  const p = document.createElement('p');
  p.className = "data-result";
  p.innerText = `Id: ${content}`;
  formDeletarProfissao.appendChild(p);
}

function getDataProfession() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5001/search";

  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = await JSON.parse(this.responseText);
      myArr.forEach((item) => {
        createText(`${item.id} - ${item.description}`)
      })
    }
  };
  // open a connection
  xhr.open("GET", url, true);
  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
getDataProfession();

function picProfession(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5001/pic";
  const idInt = parseInt(id.value);
  const dataPic = JSON.stringify({
    id: idInt,
    description: "",
  });
  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        responseDeleteProfession.textContent = "Registro Indisponível";
        close();
      } else {
        confirmDelete.style.display = "block";
        cancelDelete.style.display = "block";
      }
      setInterval(() => {
        responseDeleteProfession.textContent = ""
      }, 2000)
    }
  };
  xhr.send(dataPic);
}


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
      responseDeleteProfession.textContent = retorno.description;
      setInterval(() => {
        responseDeleteProfession.textContent = ""
      }, 2000)
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({
    id: idInt,
    description: "",
  });
  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  })
}

function hideButton() {
  confirmDelete.style.display = "none";
  cancelDelete.style.display = "none";
}

firstDelete.addEventListener('click', picProfession)
confirmDelete.addEventListener("click", deleteProfession);

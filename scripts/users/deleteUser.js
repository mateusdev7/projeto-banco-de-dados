const id = document.getElementById("id");
const inputs = document.querySelectorAll("input");
const firstDelete = document.querySelector('.firstDelete');
const confirmDelete = document.querySelector('.confirmDelete');
const cancelDelete = document.querySelector('.cancelDelete');
const dataResult = document.querySelector('[data-result]');
const formDeletarUsuario = document.querySelector('.form-deletar-usuario')
confirmDelete.style.display = "none";
cancelDelete.style.display = "none";

function createInfoUsers(id) {
  const text = document.createElement('p');
  text.className = "data-result";
  text.textContent = `ID: ${id}`;
  formDeletarUsuario.appendChild(text);
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
          createInfoUsers(`${item.id} - ${str2}`)
        })
      } else {
        alert("Não possuem usuários cadastrados para serem deletados")
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
  const idInt = parseInt(id.value);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const retorno = JSON.parse(this.responseText);
      if (retorno.length === 0) {
        alert("Usuário inexistente")
      } else {
        alert("Usuário deletado com sucesso")
        location.reload(true); 
      }
    }
  };

  // Converting JSON data to string
  const data = JSON.stringify({
    id: idInt,
    name: "",
    email: "",
    descriptionAccess: "",
    cpf: "",
  });
  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
}

function showSecondButton(e) {
  e.preventDefault();
  if (id.value !== "") {
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

const id = document.getElementById("id");
const responseDeleteUser = document.querySelector(".responseDeleteUser");
const inputs = document.querySelectorAll("input");
const firstDelete = document.querySelector('.firstDelete');
const confirmDelete = document.querySelector('.confirmDelete');
const cancelDelete = document.querySelector('.cancelDelete');
const dataResult = document.querySelector('[data-result]');
const formDeletarUsuario = document.querySelector('.form-deletar-usuario')
confirmDelete.style.display = "none";
cancelDelete.style.display = "none";

function createText(content) {
  const p = document.createElement('p');
  p.className = "data-result";
  p.innerText = `Id: ${content}`;
  formDeletarUsuario.appendChild(p);
}

function getDataUsers() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/search";

  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = await JSON.parse(this.responseText);
      console.log(myArr)
      myArr.forEach((item) => {
        createText(`${item.id} - ${item.name} - ${item.professionName}`)
      })
    }
  };
  // open a connection
  xhr.open("GET", url, true);
  // Set the request header i.e. which type of content you are sending
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
        responseDeleteUser.textContent = "Usuário inexistente"
      } else {
        responseDeleteUser.textContent = retorno.description;
      }
    }
  };

  // Converting JSON data to string
  const data = JSON.stringify({
    id: idInt,
    name: "",
    email: "",
    descriptionAccess: "",
    phone: "",
    zipCode: 0,
    numberHome: 0,
    complement: "",
    professionName: ""
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

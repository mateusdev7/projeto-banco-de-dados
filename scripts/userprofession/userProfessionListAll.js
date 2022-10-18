const id = document.getElementById("id");
const description = document.getElementById("description");
const yearsExperience = document.getElementById("yearsExperience");
const responseUpdateProfession = document.querySelector(".responseUpdateProfession");
const formPesquisarProfissao = document.querySelector(".form-pesquisar-profissao");
const formAtualizarProfissao = document.querySelector(".form-atualizar-profissao");
const botao = document.querySelector("[data-botao]");
const resposta = document.querySelector("[data-resposta]");

function listUserProfession() {
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5002/search";

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        alert("Não existem registros na tabela");
      } else {
        showUserProfession(myArr)
      }
    }
  };
  xhr.send();
}

let objectUserProfession = [];
let objectUser = [];


function showUserProfession(myArr) {
  myArr.forEach((data) => {
    const idUser = data.idUser;
    const nameUser = picUser(idUser);
    const idProf = data.idProfession;
    const nameProfession = picProfession(idProf);
  })

}

async function picProfession (idProfession) {
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5001/pic";
  const dataPic = JSON.stringify({
    id: parseInt(idProfession),
    description: "",
    yearsExperience: 0,
  });

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        close();
      } else {
        objectUserProfession = {
          description : myArr[0].description,
          id : myArr[0].id
        } 
        console.log(objectUserProfession);
      }
    }
  };
  xhr.send(dataPic);
}


function picUser(idUser) {
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5000/pic";
  const dataUser = JSON.stringify({
    id: idUser,
    name: "",
    email: "",
    descriptionAccess: "",
    phone: "",
    zipCode: 0,
    number: 0,
    complement: ""
  });

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        close();
      } else {
        objectUser = {
          name : myArr[0].name,
          id : myArr[0].id
        }
        console.log(objectUser);
      }
    }
  };
  xhr.send(dataUser);
}

botao.addEventListener("click", listUserProfession)
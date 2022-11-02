const id = document.getElementById("id");
const name = document.getElementById("name");
const email = document.getElementById("email");
const descriptionAccess = document.getElementById("descriptionAccess");
const phone = document.getElementById("phone");
const zipCode = document.getElementById("zipCode");
const numberHome = document.getElementById("numberHome");
const complement = document.getElementById("complement");

const formPesquisarUsuario = document.querySelector(".form-pesquisar-usuario");
const formAtualizarUsuario = document.querySelector(".form-atualizar-usuario");

const responseUpdateUser = document.querySelector(".responseUpdateUser");

function picUser(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5000/pic";
  const idInt = parseInt(id.value);
  const dataPic = JSON.stringify({
    id: idInt,
    name: "",
    email: "",
    descriptionAccess: "",
    phone: "",
    zipCode: "",
    numberHome: "",
    complement: "",
  });

  xhr.open("POST", urlPic, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length === 0) {
        close();
      } else {
        showDataUser(myArr);
        name.disabled = false;
        email.disabled = false;
        descriptionAccess.disabled = false;
        phone.disabled = false;
        zipCode.disabled = false;
        numberHome.disabled = false;
        complement.disabled = false;
      }
    }
  };
  xhr.send(dataPic);
}

function showDataUser(myArr) {
  id.value = myArr[0].id;
  name.value = myArr[0].name;
  email.value = myArr[0].email;
  descriptionAccess.value = myArr[0].descriptionAccess;
  phone.value = myArr[0].phone;
  zipCode.value = myArr[0].zipCode;
  numberHome.value = myArr[0].numberHome;
  complement.value = myArr[0].complement;
}

formPesquisarUsuario.addEventListener("submit", picUser);

let urlUpdate = "http://127.0.0.1:5000/update";
function updateUser() {
  const idInt = parseInt(id.value);
  const numberInt = parseInt(numberHome.value);
  const zipInt = parseInt(zipCode.value);
  let xhrUpdate = new XMLHttpRequest();
  const data = JSON.stringify({
    id: idInt,
    name: name.value,
    email: email.value,
    descriptionAccess: descriptionAccess.value,
    phone: phone.value,
    zipCode: zipInt,
    numberHome: numberInt,
    complement: complement.value,
  });

  xhrUpdate.open("POST", urlUpdate, true);
  xhrUpdate.setRequestHeader("Content-Type", "application/json");
  xhrUpdate.onreadystatechange = function (e) {
    if (xhrUpdate.readyState === 4 && xhrUpdate.status === 200) {
      e.preventDefault();
      const retorno = JSON.parse(this.responseText);
      responseUpdateUser.textContent = retorno.description;
      setInterval(() => {
        responseUpdateUser.textContent = "";
      }, 2000);
    }
  };
  xhrUpdate.send(data);
};

formAtualizarUsuario.addEventListener("submit", updateUser);

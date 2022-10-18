const id = document.getElementById("id");
const description = document.getElementById("description");
const yearsExperience = document.getElementById("yearsExperience");
const responseUpdateProfession = document.querySelector(".responseUpdateProfession");
const formPesquisarProfissao = document.querySelector(".form-pesquisar-profissao");
const formAtualizarProfissao = document.querySelector(".form-atualizar-profissao");

function picProfession(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let urlPic = "http://127.0.0.1:5001/pic";
  const idInt = parseInt(id.value);
  const dataPic = JSON.stringify({
    id: idInt,
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
        showDataProfession(myArr);
        description.disabled = false;
        yearsExperience.disabled = false;
      }
    }
  };
  xhr.send(dataPic);
}
function showDataProfession(myArr) {
  id.value = myArr[0].id;
  description.value = myArr[0].description;
  yearsExperience.value = myArr[0].yearsExperience;
};

formPesquisarProfissao.addEventListener("submit", picProfession)

let urlUpdate = "http://127.0.0.1:5001/update";
function updateProfession() {
    const idInt = parseInt(id.value);
    const yearsInt = parseInt(yearsExperience.value);
    let xhrUpdate = new XMLHttpRequest();
    const data = JSON.stringify({
      id: idInt,
      description: description.value,
      yearsExperience: yearsInt,
    });
    xhrUpdate.open("POST", urlUpdate, true);
    xhrUpdate.setRequestHeader("Content-Type", "application/json");
    xhrUpdate.onreadystatechange = function () {
      if (xhrUpdate.readyState === 4 && xhrUpdate.status === 200) {
        responseUpdateProfession.textContent = "Modificou";
      }
    };
    xhrUpdate.send(data);
};

formAtualizarProfissao.addEventListener("submit", updateProfession);

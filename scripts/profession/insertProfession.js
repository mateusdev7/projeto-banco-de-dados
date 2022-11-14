const description = document.getElementById("description");
const responseCreateProfession = document.querySelector(
  ".responseCreateProfession"
);
const inputs = document.querySelectorAll("input");
const form = document.querySelector(".form-inclusao-profissao");

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

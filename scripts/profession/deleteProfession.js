const id = document.getElementById("id");
const responseDeleteProfession = document.querySelector(".responseDeleteProfession");
const inputs = document.querySelectorAll('input');
const form = document.querySelector('.form-deletar-profissao');

function sendJSON(e) {
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
      // TODO - Imprimir mensagem de retorno na tela
      responseDeleteProfession.textContent = retorno.description;
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({
    id: idInt,
    description: "",
    yearsExperience: 0,
  });
  // Sending data with the request
  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  })
}

form.addEventListener("submit", sendJSON);

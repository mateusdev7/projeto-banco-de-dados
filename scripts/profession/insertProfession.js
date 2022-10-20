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
      responseCreateProfession.textContent = retorno.description;
      setInterval(() => {
        responseCreateProfession.textContent = ""
      }, 2000)
    }
  };

  var data = JSON.stringify({
    id: 0,
    description: description.value,
  });

  xhr.send(data);
  inputs.forEach((input) => {
    input.value = "";
  });
}

form.addEventListener("submit", sendJSON);

const quantidadeUsuarios = document.querySelector('[data-usuarios="info"]');
quantidadeUsuarios.textContent = 0;

function sendJSON() {
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5000/search";

  xhr.onreadystatechange = async function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var myArr = await JSON.parse(this.responseText);
      quantidadeUsuarios.textContent = myArr.length;
    }
  };
  // open a connection
  xhr.open("GET", url, true);
  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
sendJSON();

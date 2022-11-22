function getDataUsers() {
  let xhr = new XMLHttpRequest();
  let url = "http://127.0.0.1:5002/search";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const myArr = JSON.parse(this.responseText);
      if (myArr.length !== 0) {
        myArr.forEach((item) => {
          console.log(item);
        })
      } else {
        alert("Não possuem usuários cadastrados")
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
getDataUsers();
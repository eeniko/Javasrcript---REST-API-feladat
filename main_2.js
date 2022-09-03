window.onload = () => {
  getUserData(1);
};

const uri = "https://reqres.in/api/users";

const FetchJsonRequest = (httpMethod, uri, params = null, ...callbacks) => {
  let requestParams = { method: httpMethod };
  if (httpMethod === "GET") {
    if (params !== null) {
      uri = uri + "?";

      for (let p in params) {
        let key = p;
        let value = null;

        if (params[p] instanceof Array) {
          value = params[p].join(",");
        } else {
          value = params[p];
        }

        uri += `${key}=${value}&`;
      }
      uri = uri.slice(0, -1);
    }
  } else {
    requestParams.body = JSON.stringify(params);
    requestParams.header = {
      "Content-type": "application/json; charset=UTF-8",
    };
  }

  fetch(uri, requestParams)
    .then((response) => {
      if (response.status === 204) return response.status;
      else return response.json();
    })
    .then((data) => {
      for (let callback of callbacks) {
        callback(data);
      }
    })
    .catch((error) => {
      console.log(error);
          });
};

function getUserData(pageNumber) {
  let perPages = document.getElementById("perpages").value;
  console.log(perPages);
  FetchJsonRequest(
    "GET",
    uri,
    { page: pageNumber, per_page: perPages },
    (result) => {
      console.log(result);
      fillUsersTable(result, "usersTable");
      createPageButtons(result.total_pages);
    }
  );
}

function fillUsersTable(data) {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  data.data &&
    data.data.forEach((itemData) => {
      let row = createAnyElement("tr");
      let id = createAnyElement("td");
      id.innerHTML = itemData.id;
      let email = createAnyElement("td");
      email.innerHTML = itemData.email;
      let name = createAnyElement("td", {
        onclick: "showUserCard(" + itemData.id + ")",
        style: "color:blue; text-decoration: underline",
      });
      name.innerHTML = itemData.first_name + " " + itemData.last_name;
      let avatartd = createAnyElement("td");
      let avatar = createAnyElement("img");
      avatar.src = itemData.avatar;
      avatartd.appendChild(avatar);
      let buttons = createAnyElement("td");
      let btn = createAnyElement("button", {
        onclick: "delUserById(" + itemData.id + ")",
        class: "btn btn-danger",
      });
      btn.innerHTML = "Delete user data";
      buttons.appendChild(btn);
      row.appendChild(id);
      row.appendChild(email);
      row.appendChild(name);
      row.appendChild(avatartd);
      row.appendChild(buttons);
      tbody.appendChild(row);
    });
}

function createPageButtons(pageCount) {
  let div = document.getElementById("pagebuttonsDiv");
  div.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    let button = createAnyElement("button", {
      value: i,
      onclick: "getUserData(" + i + ")",
      class: "btn btn-link",
    });
    button.innerHTML = i;
    div.appendChild(button);
  }
}

function sendNewUserData() {
  let email = document.getElementById("newEmail").value;
  let fist_name = document.getElementById("firstName").value;
  let last_name = document.getElementById("lastName").value;
  if (email != "" && fist_name != "" && last_name != "") {
    FetchJsonRequest(
      "POST",
      uri,
      { email: email, fist_name: fist_name, last_name: last_name },
      (result) => {
        console.log(result);
        alert(
          `New user is created at: ${result.createdAt},  id: ${result.id}`
        );
      }
    );
    document.getElementById("newEmail").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    getUserData(1);
  } else alert("Please fill in all fields");
}

function delUserById(id) {
  console.log(id);
  FetchJsonRequest("DELETE", `${uri}/${id}`, null, (result) => {
    if (result === 204) {
      alert(`${id}` + ": deletion of user data is successful.");
      getUserData(1);
    } else {
      alert("user data deletion failed");
      console.log(result);
    }
  });
}
function delUser() {
  let id = document.getElementById("idField").value;
  delUserById(id);
  getUserData(1);
  document.getElementById("idField").value = "";
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
  document.getElementById("avatarImage").src = "";
  document.getElementById("email").value = "";
  document.getElementById("userCardDiv").style.display = "none";
}


function showUserCard(id) {
  FetchJsonRequest("GET", uri, { id: id }, (result) => {
    let data = result.data;
    let email = document.getElementById("email");
    email.value = data.email;
    let idField = document.getElementById("idField");
    idField.value = data.id;
    let fName = document.getElementById("fName");
    fName.value = data.first_name;
    let lName = document.getElementById("lName");
    lName.value = data.last_name;
    let avatar = document.getElementById("avatarImage");
    avatar.src = data.avatar;
    document.getElementById("userCardDiv").style.display = "block";
    console.log(result);
  });
}

function refreshUser() {
  let id = document.getElementById("idField").value;
  console.log(id);
  let fName = document.getElementById("fName").value;
  let lName = document.getElementById("lName").value;
  let email = document.getElementById("email").value;
  FetchJsonRequest(
    "PUT",
    `${uri}/${id}`,
    { id: id, first_name: fName, last_name: lName, email: email },
    (result) => {
      alert(id + ": user data update is successful: " + result.updatedAt);
    }
  );
  getUserData(1);C
  document.getElementById("userCardDiv").style.display = "none";
}

function closeModal () {
  document.getElementById("userCardDiv").style.display = "none";
}

function createAnyElement(name, attributes) {
  let element = document.createElement(name);
  for (let k in attributes) {
    element.setAttribute(k, attributes[k]);
  }
  return element;
}

// Pasimti duomenys
var add = document.getElementById('todo-form')
var card = document.getElementById('todos')
var card1 = document.getElementById('dones')
var forms = document.querySelectorAll('.needs-validation')
var button = document.querySelector('.move-todo')
var button1 = document.querySelector('.move-toback')
var myModal = document.getElementById('exampleModal')
var editInput = document.getElementById("todo-input2");
var h4;
// var duomenys = [
//   {
//     todo: "Pirmas",
//     done: true,
//   },
//   {
//     todo: "Antras",
//     done: false,
//   },
//   {
//     todo: "Trecias",
//     done: true,
//   }
// ];
// duomenys = JSON.stringify(duomenys);
// localStorage.setItem('Sarasas', duomenys)

var duomenys = localStorage.getItem("Sarasas");
duomenys = JSON.parse(duomenys);

console.log(duomenys)

duomenys.forEach(todo => {
    if (todo.done === false) {
      var cardnew = `<div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item">
      <h4 class="mb-3 input-name mano"> ${todo.todo}</h4>
  
      <button class="btn btn-danger delete" type="button">Delete</button>
      <button class="btn btn-success move-todo" type="button">Move to Done</button>
      <button class="btn btn-warning edit" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></div>`
      card.innerHTML += cardnew
    } else {
      var cardnew = `<div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item">
      <h4 class="mb-3 input-name mano"> ${todo.todo}</h4>
      <button class="btn btn-danger delete" type="button">Delete</button>
      <button class="btn btn-success move-todo" type="button">Move to Back</button>
      <button class="btn btn-warning edit" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></div>`
      card1.innerHTML += cardnew
    }
  });




forms[0].addEventListener('submit', function (e) {
  e.preventDefault()
  var duomenys = localStorage.getItem("Sarasas");
  duomenys = JSON.parse(duomenys);
  var list = document.getElementById("todo-input").value
  if (list.length > 0) {
    var div = document.createElement("div");
    div.classList.add("border", "border-1", "shadow-sm", "p-3", "mb-3", "bg-body", "rounded", "todo-item");
    var text = document.createElement('h4');
    text.classList.add("mb-3", "input-name", "mano");
    text.innerHTML = list
    var delet = document.createElement('button');
    delet.classList.add("btn", "btn-danger", "delete");
    delet.setAttribute('type', 'button');
    delet.innerHTML = "Delete"
    var move = document.createElement('button');
    move.classList.add("btn", "btn-success", "move-todo");
    move.setAttribute('type', 'button');
    move.innerHTML = "Move to Done"
    var edit = document.createElement('button');
    edit.classList.add("btn", "btn-warning", "edit");
    edit.setAttribute('type', 'button');
    edit.setAttribute('data-bs-toggle', 'modal');
    edit.setAttribute('data-bs-target', '#exampleModal');
    edit.innerHTML = "Edit"
    div.appendChild(text)
    div.appendChild(delet)
    div.appendChild(move)
    div.appendChild(edit)
    card.appendChild(div);
    duomenys.push({ todo: list, done: false })
    duomenys = JSON.stringify(duomenys);
    localStorage.setItem('Sarasas', duomenys);
    forms[0].reset()
    document.getElementById("todo-input").classList.remove('is-invalid')

  } else {
    document.getElementById("todo-input").classList.add('is-invalid')
  }
});


document.addEventListener('click', function (e) {
  if (e.target.matches('.delete')) {
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);
    h4 = e.target.closest(".todo-item").querySelector("h4");
    var h4text = h4.innerText;
    var todo = h4text;
    duomenys = duomenys.filter(todoold => {
      return todoold.todo != todo
    });
    duomenys = JSON.stringify(duomenys);
    localStorage.setItem('Sarasas', duomenys);
    e.target.closest(".todo-item").remove();
  }
  else if (e.target.matches('.move-todo')) {
    var cardAll = e.target.closest('.todo-item');
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);
    if (e.target.innerText == 'Move to Done') {
      e.target.innerText = 'Move to Back';
      card1.appendChild(cardAll);
      h4 = e.target.closest(".todo-item").querySelector("h4");
      var h4text = h4.innerText;
      duomenys = duomenys.map(item => item.todo == h4text? {
        ...item, done: !item.done
      } : item );
      duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
    } else {
      e.target.innerText = 'Move to Done';
      card.appendChild(cardAll);
      h4 = e.target.closest(".todo-item").querySelector("h4");
      var h4text = h4.innerText;
      duomenys = duomenys.map(item => item.todo == h4text? {
        ...item, done: !item.done
      } : item );
      duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
    }
  }
  if (e.target.matches('.edit')) {
    h4 = e.target.closest(".todo-item").querySelector("h4");
    var h4text = h4.innerText;
    editInput.value = h4text;
  }
  if (e.target.matches('.save')) {
    var newname =  editInput.value
    var h4text = h4.innerText
    var duomenys = localStorage.getItem("Sarasas");
    duomenys = JSON.parse(duomenys);

    duomenys = duomenys.map(item => item.todo == h4text? {
      ...item, todo: newname
    } : item );
    h4.innerText = newname
    duomenys = JSON.stringify(duomenys);
      localStorage.setItem('Sarasas', duomenys);
  }
  
});








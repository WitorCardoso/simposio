$(document).ready(function(){
  readTask();
});


function readTask() {
  let usersRef = firebase.database().ref('Users/')
  usersRef.on('child_added', function (data) {
    var taskValue = data.val();
    document.getElementById('cardSection').innerHTML += `
      <div class= "card mb-3 col-lg-12" id="card-pai">
        <div class="card-body">
          <label>Email</label><h5 class="card-title">'${taskValue.email}'</h5>
          <label>Uid</label><p class="card-text">' ${taskValue.uid} '</p>
          <label>Título</label><p class = "card-title">'${taskValue.titulo}'</p>
          <label>Resumo</label><p class = "card-title">'${taskValue.resumo}'</p>
          <label>Nome do participante</label><p class = "card-title">'${taskValue.nome_user}'</p>
          <label>Mesa do usuário</label><p class = "card-title">'${taskValue.mesa}'</p>
          <label>Situação</label><p class = "card-text"> ${taskValue.approved}</p>
          <button type = "submit" style="color:white;" class = "btn btn-warning" onclick = "updateTask('${taskValue.id}', '${taskValue.email}','${taskValue.uid}', '${taskValue.approved}','${taskValue.resumo}','${taskValue.nome_user}')">Edit task</button>
          <button class="btn btn-danger" type = "submit" onclick="deleteTask('${taskValue.uid}')">Delete task</button>
        </div>
      </div>`
  });
}

function updateTask(id, email, uid, resumo, data, titulo, nome_user) {
  document.getElementById("cardSection").innerHTML = `<form class="border p-4 mb-4" id="form">
          <div class="form-group">
            <label>Task</label>
            <input type="text" class="form-control" id="task" placeholder="Enter">
          </div>

          <div class="form-group">
            <label>Descrição</label>
            <input type="text" class="form-control" id="description" placeholder="Descrição">
          </div>
          <button style="display: none; id="button1" class="btn btn-primary">ADD task</button>
          <button type = "submit" style="display: inline-block;" id="button2" class="btn btn-danger">Reprovado</button>
          <button style="display: inline-block;" id="button3" class="btn btn-dark">Cancel</button>
          <button style="display: inline-block;" id="button4" class="btn btn-success">Aprovado</button>
        </form>`

  document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
  })
  document.getElementById("button3").addEventListener("click", (e) => {
    reset()
  })
  document.getElementById("button2").addEventListener("click", (e) => {
    reprovado(uid, document.getElementById("task").value, document.getElementById("description").value)
  })
  document.getElementById("button4").addEventListener("click", (e) => {
    aprovado(uid, document.getElementById("task").value, document.getElementById("description").value)
  })
  document.getElementById("task").value = email;
  document.getElementById("description").value = uid;
}

function reprovado(id, email, uid, approved,resumo, nome_user) {
  var taskUpdated = {
    uid: uid,
    approved: 'Reprovado',
    email: email,
    id: id
  }
  let db = firebase.database().ref("Users/" + uid);
  db.set(taskUpdated);

  document.getElementById("cardSection").innerHTML = '';
  readTask();
}
function aprovado(id, email, uid, approved,resumo, titulo, nome_user) {
  var taskUpdated = {
    uid: uid,
    approved: 'Aprovado',
    email: email,
    id: id
  }
  let db = firebase.database().ref("Users/" + uid);
  db.set(taskUpdated)
  document.getElementById("cardSection").innerHTML = '';
  readTask();
}
var user;
function deleteTask(uid, email, local_user) {
  var task = firebase.database().ref("Users/" + uid);
  task.remove();
  document.getElementById("cardSection").innerHTML = '';
  readTask();

}
function reset(){
 window.location.reload()
}

var input = document.getElementById('download')
var ref = firebase.storage();

input.onchange = function(url, filename, event) {

   var Arquivos = event.target.files[0];

   ref.child('Arquivos').then(snapshot =>{
    console.log('snapshot', snapshot);
    ref.child('Arquivos').getDownloadURL().then(url =>{
      console.log('string', url)
    })
   })
}










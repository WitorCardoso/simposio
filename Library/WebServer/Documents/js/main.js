 /*PARTE DE DEIXAR BONITO*/
  document.querySelector(".button-profile").addEventListener("click", function(event) {
   event.preventDefault();
   event.stopPropagation();
   document.querySelector('.menu-dropdown').classList.remove('hidden');
   document.querySelector('.button-profile').classList.add('text-black');
    document.querySelector('#welcomeText').classList.add('text-black');
});

document.getElementsByTagName('body')[0].addEventListener('click', function(event){
  if(!event.target.classList.contains('.button-profile')){
    document.querySelector('.menu-dropdown').classList.add('hidden');
    document.querySelector('.button-profile').classList.remove('text-black');
    document.querySelector('#welcomeText').classList.remove('text-black');
  }
});

//definindo as classes
var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;
function FriendlyChat() {
}

/* verifica se o usário está logado*/
$(document).ready(function () {
  hiddenWelcomeContainer();
  document.getElementById("upload").addEventListener('change', handleFileSelect, false);

/* function de submeter o trab*/
  $(".submeter").click(function (event) {
    var valorIput = document.getElementById('imgDesc')
    var valorIput2 =document.getElementById('imgTitle')
    var valorIput3 = document.getElementById('imgNome')
    var selec = document.getElementById('select1')
    var selec2 = document.getElementById('select2')
    var selec3 = document.getElementById('select3')
    firebase.database().ref('Users/' + user.uid).set({  
      name: user.displayName,
      uid: user.uid,
      nome_user:valorIput3.value,
      titulo: valorIput2.value,
      resumo: valorIput.value,
      foto: user.photoURL,
      mesa: getRadioValor('genero'),
      email: user.email,
      approved: 'Em observação'
    });
    $(".submeter")[0].before(swal("Trabalho enviado com sucesso!", "Aguarde sua aprovação!", "success"));
    $(".submeter").hide();
  });
  /* function de voltar para a tela do usuáio, quando ele for ver a sua situação*/
$('.volt').click(function(){
   $("#login").hide();
  $(".encapsulado").show();
  $("#welcomeText").html(user.email || user.displayName);
  $('#topNav').hide();
  $('.card').hide();
})

/*function do usuário ver a sua situação*/
$('.situa').click(function(){
   $("#login").hide();
  $(".encapsulado").hide();
  $("#welcomeText").html(user.email || user.displayName);
  $('#topNav').hide();
  $('.card').show();
})

  /*LOGOOF DO USUARIO*/
  $('.logoff').click(function () {
   firebase.auth().signOut().then(function() {
  // Redirect to google sign out.
  window.location.assign('index.html');
}).catch(function(error) {
  // Error occurred.
});
  })

  /*Foto do usuario*/
  firebase.auth().onAuthStateChanged(function (local_user) {
    if (local_user) {
      user = local_user
      $('.PhotoUser').append("<img src = '" + user.photoURL + "' />")
      showWelcomeContainer();
    } else {
      // No user is signed in.
    }
  });
});

/*function de login pelo google*/
function signIn() {
  firebase.auth().signInWithPopup(provider).then(function (result, user) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;
    showWelcomeContainer();

    // ...


  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

};

/* aqui submete o arquivo para o storage do firebase*/

$('.submeter').click(function(imgElement) {  
  var metadata = {
    contentType: 'image',
    customMetadata: {
    title: $("#imgTitle").val(),
    caption: $("#imgDesc").val(),
    uploadedBy: user.uid,
    },
    
  };
  
  var currentUser = firebase.auth.currentUser;
  var uploadTask = firebase.storage().ref('Arquivos/'+user.email+ '/' + selectedFile.name).put(selectedFile, metadata);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function (snapshot) {
    console.log(snapshot);
    

    // Observe state change events such as progress, pause, and resume
    // See below for more detail
  }, function (error) {
    // Handle unsuccessful uploads
  }, function () {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    $(".upload-group")[0].before(swal("Trabalho enviado com sucesso!", "Aguarde sua aprovação!", "success"));
    $(".upload-group").hide();

  });
   
});


/*Mostra o que o usuario publicou*/
  firebase.auth().onAuthStateChanged(function (local_user) {
    if (local_user) {
   user = local_user
   let task = firebase.database().ref('Users/' + user.uid)
   task.on('value', function (data) {
    var taskValue = data.val();
    document.getElementById('cardSection').innerHTML += `
     <div class="widget">
  <label>Seu Email</label><h2>'${taskValue.email}'</h2>
  <div class="row">
    <div class="left">
    <label>Sua Situação</label>  <p for="card">'${taskValue.approved}':</p>
    </div><div class="right">
    </div>
  </div>
  <br/><br/><br/>
  </div>

       `
   })
      showWelcomeContainer();
    } else {
      // No user is signed in.
    }
  });


function showWelcomeContainer() {
  $("#login").hide();
  $("#welcome").show();
  $("#welcomeText").html(user.email || user.displayName);
  $('#topNav').hide();
   $('.card').hide()

};

function hiddenWelcomeContainer() {
  $("#welcome").hide();
  $("#login").show();
  $("#topNav").show();
   $('.card').hide()
}

function handleFileSelect(event) {
  $(".upload-group").show();
  selectedFile = event.target.files[0];
};


/* ARQUIVO DE AJUDA PARA O USUÁRIO*/

var download = document.getElementById('resumo')
  var storage = firebase.storage();


var arquRef = storage.ref('ajuda/SETEC 2019 - IFMS DOURADOS - ORIENTAÇÕES PARA O ENVIO DE RESUMOS.docx')

download.addEventListener('click', function(){
  arquRef.getDownloadURL().then(function(url,uri, name){
    console.log(url)
  function downloadURI(url,uri, name){
  var link = document.createElement("a");
  link.download = name;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;

  }  

  downloadURI("https://firebasestorage.googleapis.com/v0/b/teste-firebase-909aa.appspot.com/o/ajuda%2FSETEC%202019%20-%20IFMS%20DOURADOS%20-%20ORIENTAC%CC%A7O%CC%83ES%20PARA%20O%20ENVIO%20DE%20RESUMOS.docx?alt=media&token=2f4f02e2-fb85-406a-a41d-2b0924c43728", "");

  })
})


var download = document.getElementById('completo')
  var storage = firebase.storage();


var arquRef = storage.ref('ajuda/SETEC 2019 – IFMS DOURADOS - ORIENTAÇÕES PARA TRABALHO COMPLETO.docx')

download.addEventListener('click', function(){
  arquRef.getDownloadURL().then(function(url,uri, name){
    console.log(url)
  function downloadURI(url,uri, name){
  var link = document.createElement("a");
  link.download = name;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;

  }  

  downloadURI("https://firebasestorage.googleapis.com/v0/b/teste-firebase-909aa.appspot.com/o/ajuda%2FSETEC%202019%20%E2%80%93%20IFMS%20DOURADOS%20-%20ORIENTAC%CC%A7O%CC%83ES%20PARA%20TRABALHO%20COMPLETO.docx?alt=media&token=f7cbb1d1-705a-455e-8f18-fdf74aff5ca4", "");

  })
})
//////


/* Modal da bancada*/
function bancada(){
  document.getElementById('modal').innerHTML = 
 `<div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Selecione a mesa que deseja</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <input id="Masculino" type="radio" name = "genero" value = "Mesa 1" class="input-radio radio-btn"><label for ="Masculino">Mesa 1</label>
       <input id="Feminino" type="radio" name = "genero" value = "Mesa 2"><label for ="Masculino">Mesa 2</label>
       <input id="Feminino" type="radio" name = "genero" value = "Mesa 3"><label for ="Masculino">Mesa 3</label>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Ok</button>
      </div>
    </div>
  </div>
</div>  `
}
/* Aqui pega o valor do radio que o usuário clicar*/
function getRadioValor (name){
var rads = document.getElementsByName(name);
   
  for(var i = 0; i < rads.length; i++){
   if(rads[i].checked){
    return rads[i].value;
   }
   
  }
   
  return null;
}
////fiiimmm script

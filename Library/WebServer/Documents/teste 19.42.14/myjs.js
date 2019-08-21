var provider = new firebase.auth.GoogleAuthProvider();
var user;
var selectedFile;


$( document ).ready(function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if(firebase.auth().currentUser){
			user = firebase.auth().currentUser;
			showWelcomeContainer(user);
		} else{
			$("#welcome").hide();
			$(".upload-group").hide();
		}
	});

	document.getElementById("upload").addEventListener('change', handleFileSelect, false);

	$(".signIn").on('click', signIn);

	/*$('.logoff').on('click', function(){
		firebase.auth().signOut().then(function(){
			$("#welcome").hide();
			$(".upload-group").hide();
		})
	})*/
	// $(".dropdown").on("hide.bs.dropdown", function(event){
  //   var text = $(event.relatedTarget).text(); // Get the text of the element
  //   $("#dogDrop").html(text+'<span class="caret"></span>');
  //   firebase.database().ref('Users/' + user.uid).set({
  //   	name: user.displayName,
  //   	email: user.email,
  //   	favDog: text
  // 	});
	// });
});


/*testando outro logOut*/
var mainApp = {};

(function(){
	var firebase = app_firebase;

	var uid = null;

	firebase.auth().onAuthStateChanged(function(user){

		if (user) {
			uid = user.uid;
		}else{
			uid = null;
			window.location.replace("index.html")
		}
	});

	function logOut(){
		firebase.auth().signOut();
	}
	mainApp.logOut = logOut;
})();






function signIn() {
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		user = result.user;
		showWelcomeContainer(user);
		// TODO: Carregar as imagens aqui
	}).catch(function(error) {
		console.log(error)
		// Handle Errors here.
	});
};

function showWelcomeContainer(user) {
	$("#login").hide();
	$("#welcome").show();
	$("#welcomeText").html("Hello, " + (user.displayName || user.email));
};

function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};

function confirmUpload() {
	var metadata = {
		contentType: 'image',
		customMetadata: {
			'dogType': 'Lab',
			'uploadedBy': user.uid,
			'title': $("#imgTitle").val(),
			'caption': $("#imgDesc").val(),
			'approved': false,
		},
	};
	var uploadTask = firebase.storage().ref().child('dogImages/' + selectedFile.name).put(selectedFile, metadata);
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed', function(snapshot){
  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail
	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
  		$(".upload-group")[0].before("Success!");
  		$(".upload-group").hide();

	});
}

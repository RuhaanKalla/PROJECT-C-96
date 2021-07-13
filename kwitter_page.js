var firebaseConfig = {
  apiKey: "AIzaSyBnZSoE_yokDvBKoIv60b8E9n2GZZiOXMM",
  authDomain: "lets-web-chat-app.firebaseapp.com",
  databaseURL: "https://lets-web-chat-app-default-rtdb.firebaseio.com",
  projectId: "lets-web-chat-app",
  storageBucket: "lets-web-chat-app.appspot.com",
  messagingSenderId: "437390431468",
  appId: "1:437390431468:web:c8596095e74c2ebae241c9"
};
// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  console.log(user_name);
  document.getElementById("user_name").innerHTML = "Welcome : " + user_name + "!";

  function addroom(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({purpose : "add user"});
    localStorage.setItem("room_name",room_name);
    window.location = "kwitter_room.html";
  }

  function getData() {firebase.database().ref("/").on('value',
  function(snapshot) {document.getElementById("output").innerHTML =
  "";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
  Room_names = childKey;
  //Start code
  row = "<div class='room_name' id="+Room_names+"onclick='redirectToRoomname(this.id)'>#" + Room_names + "</div><hr>";
  document.getElementById("output").innerHTML += row;      
  });});}

getData();

function redirectToRoomname(name){
console.log(name);
localStorage.setItem("room_name",name);
window.location = "kwitter_room.html";
}

function logout(){
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}